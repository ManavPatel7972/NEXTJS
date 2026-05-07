"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUpSchema } from "@/schemas/signUpSchema";

const SignUpPage = () => {
  const router = useRouter();

  //! form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //!  handle form input changes
  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ! username nique check (debounced)
  useEffect(() => {

    const checkUsernameUnique = async () => {
      if (!formData.username) return;

      setIsCheckingUsername(true);
      setUsernameMessage("");

      try {
        const res = await fetch(
          `/api/check-username-unique?username=${formData.username}`,
          {
            method: "POST",
          },
        );

        const data = await res.json();
        console.log("Data = ", data);

        setUsernameMessage(data.message);
      } catch (error) {
        setUsernameMessage("Error checking username");
      } finally {
        setIsCheckingUsername(false);
      }
    };

    const timer = setTimeout(checkUsernameUnique, 600);
    return () => clearTimeout(timer);
  }, [formData.username]);

  // ================= VALIDATION FORM =================

  const validateForm = () => {
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0].message;

      toast.error(firstError, {
        description: "Please check your input",
      });

      return false;
    }

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Data = ", data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message, {
        description: "Verification code sent to your email",
      });

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setUsernameMessage("");

      router.replace(
        `/verify-code?username=${encodeURIComponent(formData.username)}`,
      );
    } catch (error) {
      toast.error("Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  //! --------------
  return (
    <main className="flex w-full min-h-screen overflow-hidden font-sans bg-white text-black">
      {/* LEFT SIDE (UNCHANGED UI) */}
      <section className="hidden lg:flex w-1/2 bg-black text-white p-16 flex-col justify-between relative">
        <div>
          <div className="flex items-center gap-2 mb-20">
            <div className="size-8 bg-white flex items-center justify-center text-black">
              <EyeOff size={20} />
            </div>

            <h2 className="text-xl font-bold uppercase">Secret Message</h2>
          </div>

          <div className="max-w-md">
            <h1 className="text-6xl font-bold leading-tight mb-8 uppercase">
              Speak your truth,
              <br />
              stay hidden.
            </h1>

            <p className="text-lg text-white/60">Connect without footprints.</p>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-24">
        <div className="w-full">
          {/* Heading */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold uppercase tracking-tighter">
              Create Identity
            </h1>
            <p className="text-sm text-black/60">
              Join the network anonymously.
            </p>
          </div>

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* USERNAME */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest">
                Username
              </label>

              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Choose a secret alias"
                className="w-full h-10 border-b border-black bg-transparent focus:outline-none text-sm"
              />

              {isCheckingUsername && (
                <Loader2 size={16} className="animate-spin mt-2" />
              )}

              {!isCheckingUsername && usernameMessage && (
                <p
                  className={`text-sm mt-1 ${
                    usernameMessage === "Username is available"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {usernameMessage}
                </p>
              )}

              <p className="text-[9px] text-black/40 mt-1 uppercase">
                This will be your visible identity
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest">
                Email
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="address@provider.com"
                className="w-full h-10 border-b border-black bg-transparent focus:outline-none text-sm"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  className="w-full h-10 border-b border-black pr-10 bg-transparent focus:outline-none text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-neutral-800 transition flex items-center justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Secret Account"
              )}
            </button>
          </form>

          {/* LOGIN */}
          <p className="mt-12 text-center text-[10px] uppercase font-bold">
            Already part of the network?
            <Link href="/sign-in" className="underline ml-1">
              Access account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;

//! ----------------------------------------------------------------------------------

// "use client";
// import React, { useState, useEffect } from "react";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import Link from "next/link";
// import * as z from "zod";
// import { useRouter } from "next/router";
// import { ApiResponse } from "@/types/ApiResponse";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// const SignUpPage = () => {
//   const [username, setUsername] = useState("");
//   const [usernameMessage, setUsernameMessage] = useState("");
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   return (
//     <main className="flex w-full min-h-screen overflow-hidden font-sans bg-white text-black">
//       {/* LEFT SIDE */}
//       <section className="hidden lg:flex w-1/2 bg-black text-white p-16 flex-col justify-between relative">
//         <div className="relative z-10">
//           <div className="flex items-center gap-2 mb-20">
//             <div className="size-8 bg-white flex items-center justify-center text-black">
//               <EyeOff size={20} />
//             </div>

//             <h2 className="text-xl font-bold tracking-tighter uppercase">
//               Secret Message
//             </h2>
//           </div>

//           <div className="max-w-md">
//             <h1 className="text-6xl font-bold leading-tight mb-8 tracking-tighter uppercase">
//               Speak your truth,
//               <br />
//               stay hidden.
//             </h1>

//             <p className="text-lg text-white/60 font-light leading-relaxed">
//               Connect without footprints. An encrypted, anonymous space for the
//               thoughts you can't share anywhere else.
//             </p>
//           </div>
//         </div>

//         {/* Background Design */}
//         <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
//           <div className="w-full h-full abstract-line"></div>
//           <div className="absolute border rounded-full opacity-30"></div>
//         </div>

//         <div className="relative z-10 flex justify-between text-[10px] uppercase tracking-widest text-white/40">
//           <p>© 2025 ENCRYPTED ARCHIVE</p>

//           <div className="flex gap-6">
//             <a href="#">Security</a>
//             <a href="#">Protocol</a>
//           </div>
//         </div>
//       </section>

//       {/* RIGHT SIDE */}
//       <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-24">
//         <div className="w-full ">
//           {/* Heading */}
//           <div className="mb-12">
//             <h1 className="text-3xl font-bold uppercase tracking-tighter">
//               Create Identity
//             </h1>
//             <p className="text-sm text-black/60">
//               Join the network anonymously.
//             </p>
//           </div>

//           {/* FORM */}
//           <form className="space-y-8">
//             {/* Username */}
//             <div>
//               <label className="text-[10px] font-bold uppercase tracking-widest">
//                 Username
//               </label>

//               <input
//                 name="username"
//                 onClick={(e) => {
//                   setUsername(e.target.value);
//                 }}
//                 type="text"
//                 placeholder="Choose a secret alias"
//                 className="w-full h-10 border-b border-black bg-transparent focus:outline-none text-sm"
//               />

//               {isCheckingUsername && <Loader2 className="animate-spin" />}
//               {!isCheckingUsername && usernameMessage && (
//                 <p
//                   className={`text-sm ${
//                     usernameMessage === "Username is unique"
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {usernameMessage}
//                 </p>
//               )}

//               <p className="text-[9px] text-black/40 mt-1 uppercase">
//                 This will be your visible identity
//               </p>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-[10px] font-bold uppercase tracking-widest">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 placeholder="address@provider.com"
//                 className="w-full h-10 border-b border-black bg-transparent focus:outline-none text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-[10px] font-bold uppercase tracking-widest">
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   type="password"
//                   placeholder="Minimum 6 characters"
//                   className="w-full h-10 border-b border-black bg-transparent pr-10 focus:outline-none text-sm"
//                 />

//                 <button type="button" className="absolute right-0 bottom-2">
//                   <Eye size={18} />
//                 </button>
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full h-14 bg-black text-white font-bold text-sm uppercase tracking-widest hover:bg-neutral-800 transition"
//             >
//               Create Secret Account
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-8">
//             <div className="border-t border-black/10"></div>
//             <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-4 text-[10px] text-black/40 uppercase">
//               Authentication tier 2
//             </span>
//           </div>

//           {/* Google Button */}

//           <button className="w-full h-12 border border-black hover:bg-black/5 text-[10px] font-bold uppercase tracking-widest">
//             Sign up with Google
//           </button>

//           <p className="mt-12 text-center text-[10px] uppercase font-bold">
//             Already part of the network?
//             <Link href="/sign-in" className="underline ml-1">
//               Access account
//             </Link>
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default SignUpPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// const SignUpPage = () => {
//   const router = useRouter();

//   // ---------------- STATE ----------------
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [usernameMessage, setUsernameMessage] = useState("");

//   // ---------------- HANDLE INPUT ----------------
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ---------------- USERNAME CHECK ----------------
//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       if (!formData.username) return;

//       setIsCheckingUsername(true);
//       setUsernameMessage("");

//       try {
//         const res = await fetch(
//           `/api/check-username-unique?username=${formData.username}`,
//           {
//             method: "POST",
//           }
//         );

//         const data = await res.json();

//         setUsernameMessage(data.message);
//       } catch (error) {
//         setUsernameMessage("Error checking username");
//       } finally {
//         setIsCheckingUsername(false);
//       }
//     };

//     const timer = setTimeout(checkUsernameUnique, 600);
//     return () => clearTimeout(timer);
//   }, [formData.username]);

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/sign-up", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         toast.error(data.message);
//         return;
//       }

//       toast.success(data.message);

//       // redirect verify page
//       router.replace(
//         `/verify-code?username=${encodeURIComponent(
//           formData.username
//         )}`
//       );
//     } catch (error) {
//       toast.error("Signup failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // =====================================================
//   return (
//     <main className="flex w-full min-h-screen bg-white text-black">

//       {/* RIGHT SIDE ONLY MODIFIED LOGIC */}
//       <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-24">
//         <div className="w-full">

//           <div className="mb-12">
//             <h1 className="text-3xl font-bold uppercase">
//               Create Identity
//             </h1>
//           </div>

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-8">

//             {/* USERNAME */}
//             <div>
//               <label className="text-[10px] font-bold uppercase">
//                 Username
//               </label>

//               <input
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Choose a secret alias"
//                 className="w-full h-10 border-b border-black bg-transparent"
//               />

//               {isCheckingUsername && (
//                 <Loader2 className="animate-spin mt-2" size={16} />
//               )}

//               {!isCheckingUsername && usernameMessage && (
//                 <p className="text-xs mt-1">
//                   {usernameMessage}
//                 </p>
//               )}
//             </div>

//             {/* EMAIL */}
//             <div>
//               <label className="text-[10px] font-bold uppercase">
//                 Email
//               </label>

//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 placeholder="address@provider.com"
//                 className="w-full h-10 border-b border-black bg-transparent"
//               />
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="text-[10px] font-bold uppercase">
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Minimum 6 characters"
//                   className="w-full h-10 border-b border-black pr-10"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                   className="absolute right-0 bottom-2"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} />
//                   ) : (
//                     <Eye size={18} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full h-14 bg-black text-white uppercase"
//             >
//               {isSubmitting ? (
//                 <Loader2 className="animate-spin mx-auto" />
//               ) : (
//                 "Create Secret Account"
//               )}
//             </button>
//           </form>

//           <p className="mt-12 text-center text-[10px] uppercase font-bold">
//             Already part of the network?
//             <Link href="/sign-in" className="underline ml-1">
//               Access account
//             </Link>
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default SignUpPage;
