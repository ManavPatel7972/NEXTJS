// "use client";

// import React, { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";

// const VerifyCodePage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const username = searchParams.get("username") || "";

//   const [code, setCode] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ================= VERIFY CODE =================
//   const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!code) {
//       toast.error("Enter verification code");
//       return;
//     }

//     const loadingToast = toast.loading("Verifying identity...");

//     setIsSubmitting(true);

//     try {
//       const res = await fetch("/api/verify-code", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           code,
//         }),
//       });

//       const data = await res.json();

//       toast.dismiss(loadingToast);

//       if (!res.ok) {
//         toast.error(data.message);
//         return;
//       }

//       toast.success("Verification Successful ✅", {
//         description: "Your account is now active",
//       });

//       router.replace("/sign-in");
//     } catch (error) {
//       toast.dismiss(loadingToast);
//       toast.error("Verification failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // =====================================================
//   return (
//     <main className="flex min-h-screen bg-white text-black">
//       {/* LEFT SIDE */}
//       <section className="hidden lg:flex w-1/2 bg-black text-white p-16 flex-col justify-center">
//         <h1 className="text-6xl font-bold uppercase">
//           Verify
//           <br />
//           Identity
//         </h1>

//         <p className="mt-6 text-white/60 max-w-sm">
//           Enter the secure verification code sent to your email.
//         </p>
//       </section>

//       {/* RIGHT SIDE */}
//       <section className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold uppercase mb-10">
//             Verification Code
//           </h2>

//           <form onSubmit={handleVerify} className="space-y-8">
//             {/* CODE INPUT */}
//             <div>
//               <label className="text-[10px] font-bold uppercase tracking-widest">
//                 Enter Code
//               </label>

//               <input
//                 type="text"
//                 value={code}
//                 onChange={(e) => setCode(e.target.value)}
//                 placeholder="6 digit code"
//                 className="w-full h-12 border-b border-black bg-transparent text-center text-xl tracking-[0.5em] focus:outline-none"
//               />

//               <p className="text-[9px] text-black/40 mt-2 uppercase">
//                 Sent to @{username}
//               </p>
//             </div>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full h-14 bg-black text-white uppercase font-bold tracking-widest flex items-center justify-center hover:bg-neutral-800 transition"
//             >
//               {isSubmitting ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 "Verify Account"
//               )}
//             </button>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default VerifyCodePage;

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const VerifyCodePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const username = searchParams.get("username") || "";

  // ================= STATE =================
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ================= OTP INPUT =================
  const handleCodeChange = (e: any) => {
    let value = e.target.value;

    // allow numbers only
    value = value.replace(/\D/g, "");

    // limit to 6 digits
    if (value.length <= 6) {
      setCode(value);
    }
  };

  // ================= VERIFY FUNCTION =================
  const verifyCode = async () => {
    if (code.length !== 6) return;

    const loadingToast = toast.loading("Verifying identity...");

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          code,
        }),
      });

      const data = await res.json();

      toast.dismiss(loadingToast);

      if (!res.ok) {
        toast.error(data.message);
        setCode(""); // reset otp
        return;
      }

      toast.success("Verification Successful", {
        description: "Your account is now active",
      });

      router.replace("/sign-in");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= AUTO VERIFY =================
  useEffect(() => {
    if (code.length === 6 && !isSubmitting) {
      verifyCode();
    }
  }, [code]);

  // ================= FORM SUBMIT =================
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyCode();
  };

  // ======================================================
  return (
    <main className="flex min-h-screen bg-white text-black">
      {/* LEFT SIDE */}
      <section className="hidden lg:flex w-1/2 bg-black text-white p-16 flex-col justify-center">
        <h1 className="text-6xl font-bold uppercase">
          Verify
          <br />
          Identity
        </h1>

        <p className="mt-6 text-white/60 max-w-sm">
          Enter the secure verification code sent to your email.
        </p>
      </section>

      {/* RIGHT SIDE */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold uppercase mb-10">
            Verification Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP INPUT */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest">
                Enter Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={code}
                onChange={handleCodeChange}
                maxLength={6}
                placeholder="000000"
                className="
                  w-full h-14
                  border-b border-black
                  bg-transparent
                  text-center
                  text-3xl
                  tracking-[0.6em]
                  focus:outline-none
                "
              />

              <p className="text-[9px] text-black/40 mt-2 uppercase">
                Sent to @{username}
              </p>
            </div>

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting || code.length !== 6}
              className="
                w-full h-14
                bg-black text-white
                uppercase font-bold
                tracking-widest
                flex items-center
                justify-center
                hover:bg-neutral-800
                transition
              "
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Verify Account"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default VerifyCodePage;
