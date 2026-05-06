"use client";

import Link from "next/link";
import { EyeOff } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* HEADER */}
      <section className="px-6 md:px-20 py-24 max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold uppercase mb-6">
          About Secret Message
        </h1>

        <p className="text-black/60 text-sm max-w-2xl">
          Secret Message is a platform that allows people to receive honest,
          anonymous messages from friends, colleagues, or anyone online.
          Our mission is to create a simple and secure way for people to
          share thoughts without revealing their identity.
        </p>

      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-20 pb-32 max-w-4xl mx-auto space-y-14">

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            Our Mission
          </h2>

          <p className="text-sm text-black/70">
            Our goal is to provide a safe and simple platform where users
            can receive anonymous feedback, questions, and messages.
            We believe honest conversations sometimes require anonymity.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            What We Offer
          </h2>

          <p className="text-sm text-black/70">
            Secret Message provides users with a personal link that can be
            shared on social media or anywhere online. People can use this
            link to send anonymous messages which appear in the user’s
            private dashboard.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            Privacy First
          </h2>

          <p className="text-sm text-black/70">
            We prioritize privacy and ensure that the identity of message
            senders remains hidden. Users maintain full control over their
            messages and can manage them directly from their dashboard.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            Built for Simplicity
          </h2>

          <p className="text-sm text-black/70">
            The platform is designed with a minimal and clean interface so
            users can focus on receiving and managing messages without
            unnecessary complexity.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            Contact
          </h2>

          <p className="text-sm text-black/70">
            If you have questions or feedback about the platform, feel free
            to contact us anytime.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 py-10 text-center text-xs uppercase text-black/40">
        © {new Date().getFullYear()} Secret Message
      </footer>

    </main>
  );
}