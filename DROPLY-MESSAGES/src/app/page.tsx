// "use client";

// import Link from "next/link";
// import { EyeOff } from "lucide-react";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-white text-black">

//       {/* NAVBAR */}
//       <nav className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-black/10">

//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
//             <EyeOff size={18} />
//           </div>

//           <span className="uppercase font-bold text-sm">
//             Secret Message
//           </span>
//         </div>

//         <div className="flex items-center gap-8 text-xs uppercase font-bold">
//           <Link href="/sign-in" className="hover:text-black/60 transition">
//             Login
//           </Link>

//           <Link
//             href="/sign-up"
//             className="
//             border border-black
//             px-5 py-2
//             hover:bg-black hover:text-white
//             transition-all duration-300
//           "
//           >
//             Get Started
//           </Link>
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="px-6 md:px-20 py-32 max-w-7xl mx-auto">

//         <h1 className="text-6xl md:text-7xl font-bold uppercase leading-tight">
//           Receive
//           <br />
//           Anonymous
//           <br />
//           Messages
//         </h1>

//         <p className="mt-8 text-black/60 max-w-xl text-sm">
//           Create your personal link and allow anyone to send you anonymous
//           feedback, secrets, or questions.
//         </p>

//         <div className="flex gap-4 mt-10">

//           <Link
//             href="/sign-up"
//             className="
//             bg-black text-white
//             px-8 py-4
//             uppercase text-xs font-bold
//             hover:bg-neutral-800
//             transition-all duration-300
//           "
//           >
//             Create Your Link
//           </Link>

//           <Link
//             href="/sign-in"
//             className="
//             border border-black
//             px-8 py-4
//             uppercase text-xs font-bold
//             hover:bg-black hover:text-white
//             transition-all duration-300
//           "
//           >
//             Login
//           </Link>

//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="border-t border-black/10 px-6 md:px-20 py-24">

//         <h2 className="text-3xl font-bold uppercase mb-16">
//           How it works
//         </h2>

//         <div className="grid md:grid-cols-3 gap-16">

//           <div>
//             <span className="text-xs uppercase font-bold text-black/40">
//               Step 01
//             </span>

//             <h3 className="mt-3 font-bold uppercase">
//               Create Identity
//             </h3>

//             <p className="text-sm text-black/60 mt-3">
//               Sign up and generate your personal anonymous message link.
//             </p>
//           </div>

//           <div>
//             <span className="text-xs uppercase font-bold text-black/40">
//               Step 02
//             </span>

//             <h3 className="mt-3 font-bold uppercase">
//               Share Your Link
//             </h3>

//             <p className="text-sm text-black/60 mt-3">
//               Share your link on Instagram, WhatsApp, or any platform.
//             </p>
//           </div>

//           <div>
//             <span className="text-xs uppercase font-bold text-black/40">
//               Step 03
//             </span>

//             <h3 className="mt-3 font-bold uppercase">
//               Receive Messages
//             </h3>

//             <p className="text-sm text-black/60 mt-3">
//               Anonymous messages appear directly in your dashboard.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="border-t border-black/10 px-6 md:px-20 py-24">

//         <h2 className="text-3xl font-bold uppercase mb-16">
//           Features
//         </h2>

//         <div className="grid md:grid-cols-2 gap-16">

//           <div>
//             <h3 className="font-bold uppercase">
//               100% Anonymous
//             </h3>

//             <p className="text-sm text-black/60 mt-3">
//               Messages are completely anonymous. No identity is revealed.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-bold uppercase">
//               Message Control
//             </h3>

//             <p className="text-sm text-black/60 mt-3">
//               Enable or disable messages anytime from the dashboard.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-bold uppercase">
//               AI Suggestions
//             </h3>

//             <p className="text-sm text-black/60 mt-3">
//               Generate anonymous questions using AI prompts.
//             </p>
//           </div>

//           <div>
//             <h3 className="font-bold uppercase">
//               Clean Dashboard
//             </h3>

//             <p className="text-sm text-black/60 mt-3">
//               View, delete, and manage messages easily.
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* CTA */}
//       <section className="border-t border-black/10 px-6 md:px-20 py-32">

//         <h2 className="text-5xl font-bold uppercase max-w-2xl">
//           Start receiving anonymous messages today
//         </h2>

//         <Link
//           href="/sign-up"
//           className="
//           inline-block mt-10
//           bg-black text-white
//           px-10 py-5
//           uppercase text-xs font-bold
//           hover:bg-neutral-800
//           transition-all duration-300
//         "
//         >
//           Create Account
//         </Link>

//       </section>

//       {/* FOOTER */}
//       <footer className="border-t border-black/10 py-10 text-center text-xs uppercase text-black/40">
//         © {new Date().getFullYear()} Secret Message
//       </footer>

//     </main>
//   );
// }
"use client";

import Link from "next/link";
import { EyeOff } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-black/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
            <EyeOff size={18} />
          </div>

          <span className="uppercase font-bold text-sm">Secret Message</span>
        </div>

        <div className="flex items-center gap-8 text-xs uppercase font-bold">
          <Link href="/sign-in" className="hover:text-black/60 transition">
            Login
          </Link>

          <Link
            href="/sign-up"
            className="
            border border-black
            px-5 py-2
            transition-all duration-300
            hover:bg-black hover:text-white
          "
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="px-6 md:px-20 py-32 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-bold uppercase leading-tight">
          Receive
          <br />
          Anonymous
          <br />
          Messages
        </h1>

        <p className="mt-8 text-black/60 max-w-xl text-sm">
          Create your personal link and allow anyone to send you anonymous
          feedback, secrets, or questions.
        </p>

        <div className="flex gap-4 mt-10">
          <Link
            href="/sign-up"
            className="
            bg-black text-white
            px-8 py-4
            uppercase text-xs font-bold
            transition-all duration-300
            hover:bg-neutral-800
            hover:-translate-y-[1px]
          "
          >
            Create Your Link
          </Link>

          <Link
            href="/sign-in"
            className="
            border border-black
           
            px-8 py-4
            uppercase text-xs font-bold
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[1px]
          "
          >
            Login
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-black/10 px-6 md:px-20 py-24">
        <h2 className="text-3xl font-bold uppercase mb-16">How it works</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* CARD */}
          <div
            className="
            group
            border border-black
            p-8
            border-1 rounded-2xl
           drop-shadow-black
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[4px]
            hover:shadow-xl
            cursor-pointer
        
          "
          >
            <span className="text-xs uppercase font-bold text-black/40 group-hover:text-white/60">
              Step 01
            </span>

            <h3 className="mt-3 font-bold uppercase">Create Identity</h3>

            <p className="text-sm text-black/60 mt-3 group-hover:text-white/70">
              Sign up and generate your personal anonymous message link.
            </p>
          </div>

          {/* CARD */}
          <div
            className="
            group
             border-1 rounded-2xl
           drop-shadow-black
            border border-black
            p-8
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[4px]
            hover:shadow-xl
            cursor-pointer
          "
          >
            <span className="text-xs uppercase font-bold text-black/40 group-hover:text-white/60">
              Step 02
            </span>

            <h3 className="mt-3 font-bold uppercase">Share Your Link</h3>

            <p className="text-sm text-black/60 mt-3 group-hover:text-white/70">
              Share your anonymous message link anywhere online.
            </p>
          </div>

          {/* CARD */}
          <div
            className="
            group
             border-1 rounded-2xl
           drop-shadow-black
            border border-black
            p-8
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[4px]
            hover:shadow-xl
            cursor-pointer
          "
          >
            <span className="text-xs uppercase font-bold text-black/40 group-hover:text-white/60">
              Step 03
            </span>

            <h3 className="mt-3 font-bold uppercase">Receive Messages</h3>

            <p className="text-sm text-black/60 mt-3 group-hover:text-white/70">
              Anonymous messages appear directly in your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-black/10 px-6 md:px-20 py-24">
        <h2 className="text-3xl font-bold uppercase mb-16">Features</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* CARD */}
          <div
            className="
            group
            border border-black
             border-1 rounded-2xl
           drop-shadow-black
            p-8
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[4px]
            hover:shadow-xl
            cursor-pointer
          "
          >
            <h3 className="font-bold uppercase">100% Anonymous</h3>

            <p className="text-sm text-black/60 mt-3 group-hover:text-white/70">
              Messages are completely anonymous. No identity is revealed.
            </p>
          </div>

          {/* CARD */}
          <div
            className="
            group
             border-1 rounded-2xl
           drop-shadow-black
            border border-black
            p-8
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[4px]
            hover:shadow-xl
            cursor-pointer
          "
          >
            <h3 className="font-bold uppercase">Message Control</h3>

            <p className="text-sm text-black/60 mt-3 group-hover:text-white/70">
              Enable or disable receiving messages anytime.
            </p>
          </div>

          {/* CARD */}
          <div
            className="
            group
            border border-black
             border-1 rounded-2xl
           drop-shadow-black
            p-8
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[4px]
            hover:shadow-xl
            cursor-pointer
          "
          >
            <h3 className="font-bold uppercase">AI Suggestions</h3>

            <p className="text-sm text-black/60 mt-3 group-hover:text-white/70">
              Generate interesting anonymous questions using AI.
            </p>
          </div>

          {/* CARD */}
          <div
            className="
            group
            border border-black
            p-8
             border-1 rounded-2xl
           drop-shadow-black
            transition-all duration-300
            hover:bg-black hover:text-white
            hover:-translate-y-[4px]
            hover:shadow-xl
            cursor-pointer
          "
          >
            <h3 className="font-bold uppercase">Clean Dashboard</h3>

            <p className="text-sm text-black/60 mt-3 group-hover:text-white/70">
              View, delete, and manage messages easily.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-black/10 px-6 md:px-20 py-32">
        <h2 className="text-5xl font-bold uppercase max-w-2xl">
          Start receiving anonymous messages today
        </h2>

        <Link
          href="/sign-up"
          className="
          inline-block mt-10
          bg-black text-white
          px-10 py-5
          uppercase text-xs font-bold
          transition-all duration-300
          hover:bg-neutral-800
          hover:-translate-y-[2px]
          
        "
        >
          Create Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 py-10 text-center text-xs uppercase text-black/40">
        © {new Date().getFullYear()} Secret Message
      </footer>
    </main>
  );
}
