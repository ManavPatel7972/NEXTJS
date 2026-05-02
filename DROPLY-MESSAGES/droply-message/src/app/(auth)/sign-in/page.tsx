"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInSchema } from "@/schemas/signInSchema";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  // ! handle form input changes
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ! validate form data before submission (using zod schema)
  const validateForm = () => {
    const result = signInSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.issues[0].message;

      toast.error(firstError, {
        description: "Please check your input",
      });

      return false;
    }

    return true;
  };

  // ! handle form submission
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   const isValid = validateForm();

  //   if (!isValid) return;

  //   setIsSubmitting(true);

  //   const loadingToast = toast.loading("Authenticating...");

  //   //? given by next/auth
  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       identifier: formData.identifier,
  //       password: formData.password,
  //     });

  //     toast.dismiss(loadingToast);

  //     console.log("Reuslt = ", result);
  //     if (result?.error) {
  //       toast.error(result.error);
  //       return;
  //     }

  //     toast.success("Access Granted", {
  //       description: "Welcome back to Secret Network",
  //     });

  //     router.replace("/dashboard");
  //   } catch (error) {
  //     toast.dismiss(loadingToast);
  //     toast.error("Login failed");
  //   } finally {
  //     setFormData({
  //       identifier: "",
  //       password: "",
  //     });
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    setIsSubmitting(true);

    const loadingToast = toast.loading("Authenticating...");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: formData.identifier,
        password: formData.password,
      });

      toast.dismiss(loadingToast);

      if (result?.error) {
        if (result.error === "ACCOUNT_NOT_VERIFIED") {
          toast.error("Account not verified", {
            description: "Please verify your account first",
          });

          router.push(`/verify-account?identifier=${formData.identifier}`);

          return;
        }

        toast.error(result.error);
        return;
      }

      toast.success("Access Granted", {
        description: "Welcome back to Secret Network",
      });

      router.replace("/dashboard");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Login failed");
    } finally {
      setFormData({
        identifier: "",
        password: "",
      });

      setIsSubmitting(false);
    }
  };

  // ! handle google login
  const handleGoogleLogin = () => {
    signIn("google", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <main className="flex min-h-screen w-full bg-white text-black">
      {/* left side */}
      <section className="hidden lg:flex w-1/2 bg-black text-white p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-20">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center">
              <EyeOff size={20} />
            </div>

            <h2 className="text-xl font-bold uppercase">Secret Message</h2>
          </div>

          <h1 className="text-6xl font-bold uppercase">
            Welcome back,
            <br />
            Ghost.
          </h1>

          <p className="text-white/60 mt-6">Continue your anonymous journey.</p>
        </div>
      </section>

      {/* right side */}
      <section className="flex w-full lg:w-1/2 justify-center items-center px-6 md:px-20">
        <div className="w-full max-w-md">
          {/* header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold uppercase">Identify Yourself</h1>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* identifire (username or email) */}
            <div>
              <label className="text-xs font-bold uppercase">
                Email or Username
              </label>

              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                placeholder="Email or username"
                className="
    w-full h-10
    border-b border-black
    bg-transparent
    outline-none
    text-sm font-light
    placeholder:text-black/40
  "
              />
            </div>

            {/* password */}
            <div>
              <label className="text-xs font-bold uppercase">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="
    w-full h-10 pr-10
    border-b border-black
    bg-transparent
    outline-none
    text-sm font-light
    placeholder:text-black/40
  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* forgot pass */}
              <div className="flex justify-between mt-4">
                <Link
                  href="/verify-account"
                  className="text-xs uppercase font-semibold text-black/60 hover:text-black transition"
                >
                  Verify Account?
                </Link>

                <Link
                  href="/forgot-password"
                  className="text-xs uppercase font-semibold text-black/60 hover:text-black transition"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* login button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
            
    w-full h-14
    bg-black text-white
    font-bold uppercase
    flex items-center justify-center
  hover:cursor-pointer
    transition-all duration-300
    hover:bg-neutral-800
    hover:shadow-lg
    hover:-translate-y-[1px]
    hover:cursor
    active:translate-y-0
    active:shadow-sm
  "
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Access Account"
              )}
            </button>
          </form>

          {/* divider <hr/> */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-black/10"></div>
            <span className="px-4 text-xs uppercase text-black/40">
              Authentication Tier 2
            </span>
            <div className="flex-grow border-t border-black/10"></div>
          </div>

          {/* google login */}
          <button
            onClick={handleGoogleLogin}
            className="
    w-full h-12
    border border-black
    flex items-center justify-center gap-3
    uppercase text-xs font-bold
    hover:cursor-pointer

    transition-all duration-300
    hover:bg-black
    hover:text-white
    hover:shadow-md
    hover:-translate-y-[1px]

    active:translate-y-0
  "
          >
            {/* google logo */}
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.2 3.6l6.85-6.85C35.9 2.4 30.4 0 24 0 14.64 0 6.48 5.4 2.44 13.32l7.98 6.2C12.3 13.2 17.7 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.7-.15-3.34-.43-4.93H24v9.34h12.7c-.55 2.96-2.2 5.48-4.7 7.17l7.3 5.67C43.9 37.7 46.5 31.6 46.5 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.42 28.52A14.5 14.5 0 019.5 24c0-1.57.27-3.08.75-4.48l-7.98-6.2A23.94 23.94 0 000 24c0 3.9.93 7.6 2.27 10.68l8.15-6.16z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.4 0 11.78-2.1 15.7-5.7l-7.3-5.67c-2.03 1.36-4.64 2.17-8.4 2.17-6.3 0-11.7-3.7-13.6-8.98l-8.15 6.16C6.48 42.6 14.64 48 24 48z"
              />
            </svg>

            <span className="uppercase text-xs font-bold">
              Continue with Google
            </span>
          </button>

          {/* register link */}
          <p className="flex items-center justify-center mt-10 text-center text-xs uppercase font-bold gap-1.5">
            <span> New to the network?</span>
            <Link href="/sign-up" className="underline ml-1 hover:text-primary">
              Create Identity
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
