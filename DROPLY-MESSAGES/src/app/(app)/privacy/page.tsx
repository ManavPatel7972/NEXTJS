"use client";

import Link from "next/link";
import { EyeOff } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <section className="px-6 md:px-20 py-24 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold uppercase mb-6">Privacy Policy</h1>

        <p className="text-black/60 text-sm">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-20 pb-32 max-w-4xl mx-auto space-y-14">
        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            Information We Collect
          </h2>

          <p className="text-sm text-black/70">
            When you create an account, we collect information such as your
            email address, username, and authentication details. We also store
            anonymous messages sent through the platform.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            Anonymous Messages
          </h2>

          <p className="text-sm text-black/70">
            Messages sent through the platform are anonymous. We do not reveal
            the identity of the sender to the recipient.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            How We Use Your Information
          </h2>

          <p className="text-sm text-black/70">
            Your information is used to operate the platform, authenticate
            accounts, improve security, and provide features such as anonymous
            messaging and dashboard management.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">Data Security</h2>

          <p className="text-sm text-black/70">
            We implement security measures to protect your account and stored
            data. However, no internet system can guarantee complete security.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            User Responsibility
          </h2>

          <p className="text-sm text-black/70">
            Users are responsible for the content they send. Harassment,
            threats, or illegal content is strictly prohibited and may result in
            account suspension.
          </p>
        </div>

        {/* SECTION */}
        <div>
          <h2 className="text-xl font-bold uppercase mb-4">
            Changes to This Policy
          </h2>

          <p className="text-sm text-black/70">
            We may update this privacy policy from time to time. Updates will be
            posted on this page.
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
