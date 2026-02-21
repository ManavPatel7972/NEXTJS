"use client";

import { useEffect, useRef, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [logoutLoading, setLogoutLoading] = useState(false);

  const { theme = "dark", setTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    fetchTodos();
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUser = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();

    if (response.status === 401) {
      return router.push("/login");
    }

    if (!data.error) {
      setUser(data);
    }
  };

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    if (response.status === 401) {
      return router.push("/login");
    }
    if (!data.error) {
      setTodos(data.reverse());
    }
  };

  const addTodo = async (text) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      fetchTodos();
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (response.status === 200) {
      fetchTodos();
    }
  };

  const updateTodo = async (id, newText) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ text: newText }),
    });
    if (response.status === 200) {
      fetchTodos();
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center relative">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            My Todo App
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="py-2 rounded-full hover:bg-muted transition-colors cursor-pointer"
                aria-label="User menu"
              >
                <UserIcon className="h-5 w-5" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 max-w-48 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 shadow-lg z-10 text-gray-900 dark:text-gray-100">
                  <div className="text-sm font-semibold">{user.name}</div>
                  <div
                    className="text-xs text-gray-600 dark:text-gray-400 mb-3 truncate"
                    title={user.email}
                  >
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-500 hover:underline text-sm cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <TodoForm addTodo={addTodo} />

        <main className="mt-6">
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
          />
        </main>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import TodoList from "@/components/TodoList";
// import TodoForm from "@/components/TodoForm";
// import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon, UserIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
import Loading from "./loading";

// export default function Home() {
//   const router = useRouter();
//   const [todos, setTodos] = useState([]);
//   const [user, setUser] = useState({ name: "", email: "" });
//   const { theme = "dark", setTheme } = useTheme();
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     fetchTodos();
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setShowUserMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchUser = async () => {
//     const response = await fetch("/api/user");
//     const data = await response.json();
//     if (response.status === 401) return router.push("/login");
//     if (!data.error) setUser(data);
//   };

//   const fetchTodos = async () => {
//     const response = await fetch("/api/todos");
//     const data = await response.json();
//     if (response.status === 401) return router.push("/login");
//     if (!data.error) setTodos(data.reverse());
//   };

//   const addTodo = async (text) => {
//     const response = await fetch("/api/todos", {
//       method: "POST",
//       body: JSON.stringify({ text }),
//     });
//     const newTodo = await response.json();
//     setTodos([newTodo, ...todos]);
//   };

//   const deleteTodo = async (id) => {
//     const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
//     if (response.status === 204) fetchTodos();
//   };

//   const toggleTodo = async (id) => {
//     const todo = todos.find((t) => t.id === id);
//     const response = await fetch(`/api/todos/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ completed: !todo.completed }),
//     });
//     if (response.status === 200) fetchTodos();
//   };

//   const updateTodo = async (id, newText) => {
//     const response = await fetch(`/api/todos/${id}`, {
//       method: "PUT",
//       body: JSON.stringify({ text: newText }),
//     });
//     if (response.status === 200) fetchTodos();
//   };

//   const handleLogout = async () => {
//     const response = await fetch(`/api/logout`, { method: "POST" });
//     if (response.status === 204) router.push("/login");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-4">
//       <div className="w-full max-w-lg rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-2xl border border-white/20 p-6 animate-fade-in">

//         {/* HEADER */}
//         <header className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
//             My Todo App
//           </h1>

//           <div className="flex items-center gap-2">
//             {/* THEME BUTTON */}
//             <button
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               className="p-2 rounded-full hover:scale-110 transition-all hover:bg-black/10 dark:hover:bg-white/10"
//             >
//               {theme === "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
//             </button>

//             {/* USER MENU */}
//             <div className="relative" ref={menuRef}>
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="p-2 rounded-full hover:scale-110 transition-all hover:bg-black/10 dark:hover:bg-white/10"
//               >
//                 <UserIcon size={20} />
//               </button>

//               {showUserMenu && (
//                 <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 p-4 animate-slide-down">
//                   <p className="font-semibold text-sm">{user.name}</p>
//                   <p className="text-xs text-gray-300 truncate mb-3">
//                     {user.email}
//                   </p>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left text-sm text-red-500 hover:underline"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </header>

//         {/* FORM */}
//         <TodoForm addTodo={addTodo} />

//         {/* LIST */}
//         <main className="mt-6">
//           <TodoList
//             todos={todos}
//             deleteTodo={deleteTodo}
//             toggleTodo={toggleTodo}
//             updateTodo={updateTodo}
//           />
//         </main>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         .animate-fade-in {
//           animation: fadeIn 0.6s ease-out;
//         }
//         .animate-slide-down {
//           animation: slideDown 0.25s ease-out;
//         }
//         .animate-gradient {
//           background-size: 200% 200%;
//           animation: gradientMove 4s ease infinite;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; transform: scale(0.97); }
//           to { opacity: 1; transform: scale(1); }
//         }
//         @keyframes slideDown {
//           from { opacity: 0; transform: translateY(-8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes gradientMove {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//       `}</style>
//     </div>
//   );
// }
