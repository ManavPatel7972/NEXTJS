// "use client";

// import { useState } from "react";
// import { RefreshCcw, Trash2, User } from "lucide-react";
// import Link from "next/link";

// export default function DashboardPage() {
//   const [acceptMessages, setAcceptMessages] = useState(true);

//   const messages = [
//     {
//       time: "2 minutes ago",
//       text: `"The project update you requested is ready for review. Check the secure folder in the usual location. All metadata has been scrubbed."`,
//     },
//     {
//       time: "1 hour ago",
//       text: `"I really appreciate the advice you gave me yesterday. It worked perfectly. Nobody suspected a thing."`,
//     },
//     {
//       time: "Yesterday",
//       text: `"Welcome to the network. Your identity has been successfully verified."`,
//     },
//     {
//       time: "2 days ago",
//       text: `"How do I know this is really anonymous? Testing the system limits."`,
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-white text-black font-sans">
//       <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
//         {/* HEADER */}
//         <div className="flex justify-between items-start mb-10">
//           <h1 className="text-4xl font-black tracking-tight">User Dashboard</h1>

//           <div
//             className="
//   size-10
//   rounded-full
//   bg-neutral-100
//   border border-neutral-200

//   flex items-center justify-center

//   cursor-pointer
//   transition-all duration-300

//   hover:bg-black
//   hover:text-white
//   hover:shadow-lg
//   hover:scale-110
// "
//           >
//             <User size={20} />
//           </div>
//         </div>

//         {/* UNIQUE LINK */}
//         <div className="mb-8">
//           <label className="text-sm font-medium mb-2 block">
//             Copy Your Unique Link
//           </label>

//           <div className="flex gap-2">
//             <input
//               readOnly
//               value="https://secretmessage.net/u/ghost_9218"
//               className="flex-1 bg-neutral-100 rounded-lg px-4 py-3 text-sm outline-none"
//             />

//             <button
//               className="
//   bg-black text-white
//   px-8 py-3 rounded-lg
//   text-sm font-bold

//   cursor-pointer
//   transition-all duration-300

//   hover:bg-neutral-800
//   hover:shadow-lg
//   hover:-translate-y-[2px]

//   active:translate-y-0
//   active:shadow-sm
// "
//             >
//               Copy
//             </button>
//           </div>
//         </div>

//         {/* TOGGLE */}
//         <div className="flex items-center gap-3 mb-10">
//           <button
//             onClick={() => setAcceptMessages(!acceptMessages)}
//             className={`relative w-11 h-6 rounded-full transition ${
//               acceptMessages ? "bg-black" : "bg-neutral-300"
//             }`}
//           >
//             <span
//               className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full transition-transform ${
//                 acceptMessages ? "translate-x-5" : ""
//               }`}
//             />
//           </button>

//           <span className="text-sm font-medium">
//             Accept Messages: {acceptMessages ? "On" : "Off"}
//           </span>
//         </div>

//         <hr className="border-neutral-100 mb-10" />

//         {/* MESSAGE HEADER */}
//         <div className="flex justify-between items-center mb-8">
//           <h3 className="text-lg font-bold">Messages</h3>

//           <button
//             className="
//   group flex items-center gap-2
//   px-3 py-2 rounded-lg
//   text-sm font-medium
//   text-neutral-500

//   cursor-pointer
//   transition-all duration-300

//   hover:bg-neutral-100
//   hover:text-black
// "
//           >
//             <RefreshCcw
//               size={18}
//               className="
//       transition-transform duration-500
//       group-hover:rotate-180
//     "
//             />
//             Refresh
//           </button>
//         </div>

//         {/* MESSAGE GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className="
//   group relative overflow-hidden
//   rounded-2xl border border-neutral-200
//   bg-white p-6
//   transition-all duration-500
//   hover:bg-black
//   hover:shadow-2xl
//   hover:-translate-y-1
// "
//             >
//               {/* TIME */}
//               <span
//                 className="
//     text-xs font-medium
//     text-neutral-400
//     transition-colors duration-500
//     group-hover:text-neutral-300
//   "
//               >
//                 {msg.time}
//               </span>

//               {/* MESSAGE */}
//               <p
//                 className="
//     mt-4 text-sm leading-relaxed
//     text-neutral-800
//     transition-colors duration-500
//     group-hover:text-white
//     line-clamp-3
//   "
//               >
//                 {msg.text}
//               </p>

//               {/* ACTION AREA */}
//               <div
//                 className="
//     flex justify-between items-center
//     mt-6 pt-4 border-t border-neutral-100
//     transition-all duration-500
//     group-hover:border-white/20
//   "
//               >
//                 {/* VIEW BUTTON */}
//                 <button
//                   className="
//   px-4 py-2
//   text-xs font-bold uppercase tracking-wider
//   rounded-full

//   cursor-pointer
//   transition-all duration-300

//   text-neutral-700
//   hover:text-white
//   hover:bg-black
//   hover:scale-105
//   active:scale-95
// "
//                 >
//                   View Message
//                 </button>

//                 {/* DELETE */}
//                 <button
//                   className="
//   p-2 rounded-full
//   cursor-pointer
//   transition-all duration-300

//   text-neutral-400
//   hover:text-red-500
//   hover:bg-red-500/10
//   hover:scale-110
//   active:scale-95
// "
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>

//               {/* GLOW EFFECT */}
//               <div
//                 className="
//     absolute inset-0 opacity-0
//     group-hover:opacity-100
//     transition duration-500
//     bg-gradient-to-br
//     from-white/5 via-transparent to-white/10
//     pointer-events-none
//   "
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="max-w-6xl mx-auto px-6 py-8 border-t flex justify-between text-[11px] font-bold uppercase text-neutral-400">
//         <p>© 2026 SECRET MESSAGE NETWORK</p>

//         <div className="flex gap-6">
//           <Link href="#" className="hover:text-black">
//             Privacy
//           </Link>
//           <Link href="#" className="hover:text-black">
//             Terms
//           </Link>
//           <Link href="#" className="hover:text-black">
//             Help Center
//           </Link>
//         </div>
//       </footer>
//     </main>
//   );
// }

// "use client";

// import { useState } from "react";
// import { RefreshCcw, Trash2 } from "lucide-react";
// import Link from "next/link";

// export default function DashboardPage() {
//   const [acceptMessages, setAcceptMessages] = useState(true);

//   const messages = [
//     {
//       time: "2 minutes ago",
//       text: `"The project update you requested is ready for review. Check the secure folder in the usual location. All metadata has been scrubbed."`,
//     },
//     {
//       time: "1 hour ago",
//       text: `"I really appreciate the advice you gave me yesterday. It worked perfectly. Nobody suspected a thing."`,
//     },
//     {
//       time: "Yesterday",
//       text: `"Welcome to the network. Your identity has been successfully verified."`,
//     },
//     {
//       time: "2 days ago",
//       text: `"How do I know this is really anonymous? Testing the system limits."`,
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-white text-black font-sans">

//       {/* NAVBAR */}
//       <nav className="border-b border-neutral-200">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

//           {/* LEFT SIDE */}
//           <h1 className="text-xl font-black tracking-tight">
//             True Feedback
//           </h1>

//           {/* RIGHT SIDE */}
//           <button
//             className="
//               bg-black text-white
//               px-6 py-2 rounded-lg
//               text-sm font-bold
//               transition-all duration-300
//               hover:bg-neutral-800
//               hover:shadow-lg
//               hover:-translate-y-[2px]
//               active:translate-y-0
//               active:shadow-sm
//             "
//           >
//             Logout
//           </button>

//         </div>
//       </nav>

//       <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">

//         {/* UNIQUE LINK */}
//         <div className="mb-8">
//           <label className="text-sm font-medium mb-2 block">
//             Copy Your Unique Link
//           </label>

//           <div className="flex gap-2">
//             <input
//               readOnly
//               value="https://secretmessage.net/u/ghost_9218"
//               className="flex-1 bg-neutral-100 rounded-lg px-4 py-3 text-sm outline-none"
//             />

//             <button
//               className="
//                 bg-black text-white
//                 px-8 py-3 rounded-lg
//                 text-sm font-bold
//                 transition-all duration-300
//                 hover:bg-neutral-800
//                 hover:shadow-lg
//                 hover:-translate-y-[2px]
//                 active:translate-y-0
//                 active:shadow-sm
//               "
//             >
//               Copy
//             </button>
//           </div>
//         </div>

//         {/* TOGGLE */}
//         <div className="flex items-center gap-3 mb-10">
//           <button
//             onClick={() => setAcceptMessages(!acceptMessages)}
//             className={`relative w-11 h-6 rounded-full transition ${
//               acceptMessages ? "bg-black" : "bg-neutral-300"
//             }`}
//           >
//             <span
//               className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full transition-transform ${
//                 acceptMessages ? "translate-x-5" : ""
//               }`}
//             />
//           </button>

//           <span className="text-sm font-medium">
//             Accept Messages: {acceptMessages ? "On" : "Off"}
//           </span>
//         </div>

//         <hr className="border-neutral-100 mb-10" />

//         {/* MESSAGE HEADER */}
//         <div className="flex justify-between items-center mb-8">
//           <h3 className="text-lg font-bold">Messages</h3>

//           <button
//             className="
//               group flex items-center gap-2
//               px-3 py-2 rounded-lg
//               text-sm font-medium
//               text-neutral-500
//               transition-all duration-300
//               hover:bg-neutral-100
//               hover:text-black
//             "
//           >
//             <RefreshCcw
//               size={18}
//               className="transition-transform duration-500 group-hover:rotate-180"
//             />
//             Refresh
//           </button>
//         </div>

//         {/* MESSAGE GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className="
//                 group relative overflow-hidden
//                 rounded-2xl border border-neutral-200
//                 bg-white p-6
//                 transition-all duration-500
//                 hover:bg-black
//                 hover:shadow-2xl
//                 hover:-translate-y-1
//               "
//             >
//               <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-300">
//                 {msg.time}
//               </span>

//               <p className="mt-4 text-sm leading-relaxed text-neutral-800 group-hover:text-white line-clamp-3">
//                 {msg.text}
//               </p>

//               <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-100 group-hover:border-white/20">
//                 <button className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full text-neutral-700 hover:text-white hover:bg-black hover:scale-105 active:scale-95 transition-all">
//                   View Message
//                 </button>

//                 <button className="p-2 rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-500/10 hover:scale-110 active:scale-95 transition-all">
//                   <Trash2 size={18} />
//                 </button>
//               </div>

//               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FOOTER */}
//       <footer className="max-w-6xl mx-auto px-6 py-8 border-t flex justify-between text-[11px] font-bold uppercase text-neutral-400">
//         <p>© 2026 TRUE FEEDBACK</p>

//         <div className="flex gap-6">
//           <Link href="#" className="hover:text-black">
//             Privacy
//           </Link>
//           <Link href="#" className="hover:text-black">
//             Terms
//           </Link>
//           <Link href="#" className="hover:text-black">
//             Help Center
//           </Link>
//         </div>
//       </footer>
//     </main>
//   );
// }
// !-------------------------------------------------------------------------------
// !--------------------------------------------------------------------------------
"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Message {
  _id: string;
  content: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [acceptMessages, setAcceptMessages] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [updatingAccept, setUpdatingAccept] = useState(false);

  const router = useRouter();

  const { data } = useSession();

  console.log("Session in Dashboard ==", data);

  const username = data?.user?.username;
  console.log("Username ==", username);

  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/u/${username}`
      : "";

  console.log("Profile URL ==", profileUrl);

  //! FETCH ACCEPT STATUS
  const fetchAcceptStatus = async () => {
    try {
      const res = await fetch("/api/accept-messages");
      const data = await res.json();
      // console.log("Data = ", data);

      if (!data.success) {
        toast.error(data.message);
        return;
      } else {
        // toast.success(data.message);
      }

      setAcceptMessages(data.isAcceptingMessages);
    } catch (error) {
      toast.error("Failed to fetch acceptance status");
    }
  };

  //! toggle accept messages
  const handleToggleAccept = async () => {
    try {
      setUpdatingAccept(true);

      const newValue = !acceptMessages;

      const res = await fetch("/api/accept-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acceptMessages: newValue }),
      });

      const data = await res.json();

      // console.log("Data = ",data );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setAcceptMessages(newValue);

      toast.success(
        newValue
          ? "Now accepting anonymous messages"
          : "Stopped accepting messages",
      );
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingAccept(false);
    }
  };

  //  ! fetch messages
  const fetchMessages = async () => {
    try {
      setLoadingMessages(true);

      const res = await fetch("/api/get-messages");
      const data = await res.json();
      // console.log("Data =====>", data);
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setMessages(data.messages);

      toast.success("Messages refreshed");
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      // console.log("Messages ==", messages);
      setLoadingMessages(false);
    }
  };

  //!  delete message
  const deleteMessage = async (messageid: string) => {
    console.log("MessageID CLIENT ===", messageid);
    try {
      const res = await fetch(`/api/delete-message/${messageid}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("Delete res = ==", data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== messageid));

      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  //! handle logout
  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false, // prevent auto redirect
      });

      toast.success("Logged out successfully");

      router.replace("/sign-in");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  //! handle copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Profile link copied");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  //! initial fetch
  useEffect(() => {
    fetchAcceptStatus();
    fetchMessages();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        {/* accept toggle */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={handleToggleAccept}
            disabled={updatingAccept}
            className={` cursor-pointer relative w-11 h-6 rounded-full transition ${
              acceptMessages ? "bg-black" : "bg-neutral-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-4 w-4 bg-white rounded-full transition-transform ${
                acceptMessages ? "translate-x-5" : ""
              }`}
            />
          </button>

          <span className="text-sm font-medium flex items-center gap-2">
            Accept Messages: {acceptMessages ? "On" : "Off"}
            {updatingAccept && <Loader2 size={14} className="animate-spin" />}
          </span>
        </div>

        {/* unique link */}
        <div className="mb-10 ">
          <label className="text-sm font-medium mb-2 block">
            Copy Your Unique Link
          </label>

          <div className="flex gap-2">
            <input
              readOnly
              value={profileUrl}
              className="flex-1 bg-neutral-100 rounded-lg px-4 py-3 text-sm outline-none"
            />

            <button
              onClick={handleCopyLink}
              className="
  bg-black text-white
  px-8 py-3 rounded-lg
  text-sm font-bold

  cursor-pointer
  transition-all duration-300

  hover:bg-neutral-800
  hover:shadow-lg
  hover:-translate-y-[2px]

  active:translate-y-0
  active:shadow-sm
"
            >
              Copy
            </button>
          </div>
        </div>

        <hr className="text-black bg-black border-1 mb-3" />
        {/* message header */}
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-bold">Messages</h3>

          <button
            onClick={fetchMessages}
            disabled={loadingMessages}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 transition-all duration-300 hover:bg-neutral-100 hover:text-black"
          >
            {loadingMessages ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <RefreshCcw
                size={18}
                className="transition-transform duration-500 group-hover:rotate-180"
              />
            )}
            Refresh
          </button>
        </div>

        {/* message card (gride   ) */}
        {loadingMessages ? (
          <p className="text-neutral-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-neutral-400">No messages yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-500 hover:bg-black hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-300">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>

                <p className="mt-4 text-sm leading-relaxed text-neutral-800 group-hover:text-white">
                  {msg.content}
                </p>

                <div className="flex justify-end items-center mt-6 pt-4 border-t border-neutral-100 group-hover:border-white/20">
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className="p-2 rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-500/10 hover:scale-110 active:scale-95 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t flex justify-between text-[11px] font-bold uppercase text-neutral-400">
        <p>© 2026 TRUE FEEDBACK</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-black">
            Privacy
          </Link>
          <Link href="#" className="hover:text-black">
            Terms
          </Link>
          <Link href="#" className="hover:text-black">
            Help Center
          </Link>
        </div>
      </footer>
    </main>
  );
}
