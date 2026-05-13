// "use client";
// import { useState } from "react";
// import { useParams } from "next/navigation";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// export default function PublicMessagePage() {
//   const { username } = useParams();

//   const [content, setContent] = useState("");
//   const [sending, setSending] = useState(false);

//   const handleSendMessage = async (e: any) => {
//     e.preventDefault();

//     if (!content.trim()) {
//       toast.error("Message cannot be empty");
//       return;
//     }

//     try {
//       setSending(true);

//       const res = await fetch("/api/send-message", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           username,
//           content,
//         }),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         toast.error(data.error || data.message);
//         return;
//       }

//       toast.success("Anonymous message sent successfully");

//       setContent("");
//     } catch (error) {
//       toast.error("Failed to send message");
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">

//       <div className="w-full max-w-xl">

//         {/* HEADER */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-black tracking-tight">
//             Send Anonymous Feedback
//           </h1>

//           <p className="text-neutral-500 mt-3">
//             Share your honest thoughts with <b>@{username}</b>
//           </p>
//         </div>

//         {/* CARD */}
//         <div className="border border-neutral-200 rounded-2xl p-8 shadow-sm">

//           <form onSubmit={handleSendMessage} className="space-y-6">

//             {/* MESSAGE FIELD */}
//             <div>
//               <label className="text-sm font-semibold block mb-2">
//                 Your Message
//               </label>

//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Write your anonymous feedback..."
//                 rows={5}
//                 className="
//                   w-full
//                   border border-neutral-200
//                   rounded-lg
//                   px-4 py-3
//                   text-sm
//                   outline-none
//                   focus:border-black
//                   transition
//                 "
//               />
//             </div>

//             {/* SEND BUTTON */}
//             <button
//               disabled={sending}
//               className="
//                 w-full
//                 bg-black text-white
//                 py-3 rounded-lg
//                 text-sm font-bold
//                 transition-all duration-300
//                 hover:bg-neutral-800
//                 hover:shadow-lg
//                 hover:-translate-y-[2px]
//                 active:translate-y-0
//               "
//             >
//               {sending ? (
//                 <Loader2 className="animate-spin mx-auto" size={18} />
//               ) : (
//                 "Send Anonymous Message"
//               )}
//             </button>

//           </form>

//         </div>

//         {/* INFO */}
//         <p className="text-xs text-center text-neutral-400 mt-6">
//           Your identity will remain completely anonymous.
//         </p>

//       </div>

//     </main>
//   );
// }

//! -----------------------------------------------------------------

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

export default function PublicMessagePage() {
  const { username } = useParams();

  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  /* ===============================
        SEND MESSAGE
  =============================== */
  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      setSending(true);

      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          content,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.error);
        return;
      }

      toast.success("Anonymous message sent");

      setContent("");
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  /* ===============================
        AI MESSAGE SUGGESTION
  =============================== */
  const generateSuggestions = async () => {
    try {
      setAiLoading(true);

      const res = await fetch("/api/ai-suggestions");
      const data = await res.json();

      if (!data.success) {
        toast.error("AI failed to generate suggestions");
        return;
      }

      setSuggestions(data.suggestions);
    } catch (error) {
      toast.error("AI suggestion failed");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">

      <div className="w-full max-w-xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight">
            Anonymous Feedback
          </h1>

          <p className="text-neutral-500 mt-3">
            Send honest thoughts to <b>@{username}</b>
          </p>
        </div>

        {/* CARD */}
        <div className="border border-neutral-200 rounded-2xl p-8 shadow-sm">

          {/* MESSAGE FORM */}
          <form onSubmit={sendMessage} className="space-y-6">

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write anonymous feedback..."
              rows={4}
              className="
                w-full
                border border-neutral-200
                rounded-lg
                px-4 py-3
                text-sm
                outline-none
                focus:border-black
                transition
              "
            />

            {/* SEND BUTTON */}
            <button
              disabled={sending}
              className="
                w-full
                bg-black text-white
                py-3 rounded-lg
                text-sm font-bold
                transition-all duration-300
                hover:bg-neutral-800
                hover:shadow-lg
                hover:-translate-y-[2px]
              "
            >
              {sending ? (
                <Loader2 className="animate-spin mx-auto" size={18} />
              ) : (
                "Send Anonymous Message"
              )}
            </button>

          </form>

          {/* AI SECTION */}
          <div className="mt-8">

            <button
              onClick={generateSuggestions}
              className="
                flex items-center gap-2
                text-sm font-semibold
                text-black
                hover:text-neutral-600
              "
            >
              <Sparkles size={16} />
              Generate AI Suggestions
            </button>

            {aiLoading && (
              <div className="mt-3 text-sm text-neutral-500 flex items-center gap-2">
                <Loader2 className="animate-spin" size={14} />
                Generating suggestions...
              </div>
            )}

            {/* AI SUGGESTIONS */}
            <div className="mt-4 space-y-2">

              {suggestions.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => setContent(msg)}
                  className="
                    w-full text-left
                    border border-neutral-200
                    rounded-lg
                    px-4 py-2
                    text-sm
                    hover:bg-neutral-100
                    transition
                  "
                >
                  {msg}
                </button>
              ))}

            </div>

          </div>

        </div>

        <p className="text-xs text-neutral-400 text-center mt-6">
          Your identity remains completely anonymous.
        </p>

      </div>

    </main>
  );
}

