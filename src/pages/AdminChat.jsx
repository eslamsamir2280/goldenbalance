import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// 1. التعديل هنا: استخدام مسار نسبي '/' لضمان الاتصال بالسيرفر الحالي في الإنتاج
const SOCKET_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const socket = io(SOCKET_URL, {
  path: "/socket.io/",
  transports: ["websocket", "polling"],
});

export default function AdminChat() {
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [unreadRooms, setUnreadRooms] = useState(new Set());
  const scrollRef = useRef();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        // 2. التعديل هنا: جعل baseUrl يميل للمسار النسبي إذا لم يجد المتغير
        let baseUrl = import.meta.env.VITE_API_URL || "";
        baseUrl = baseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

        const res = await fetch(`${baseUrl}/api/chats/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON. Check the API URL.");
        }

        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error("Error from server:", data);
          setRooms([]);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
      }
    };

    fetchRooms();
  }, []);

  // باقي الكود كما هو بدون تغييرات في المنطق...
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (data.roomId === activeRoom) {
        setChat((prev) => [...prev, data]);
      } else if (data.sender !== "admin") {
        setUnreadRooms((prev) => new Set(prev).add(data.roomId));
        setRooms((prevRooms) => {
          if (!prevRooms.includes(data.roomId)) {
            return [data.roomId, ...prevRooms];
          }
          return prevRooms;
        });
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, [activeRoom]);

  useEffect(() => {
    if (!activeRoom) return;
    socket.emit("join_chat", activeRoom);
    socket.on("chat_history", (history) => setChat(history));
    return () => socket.off("chat_history");
  }, [activeRoom]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleRoomClick = (roomId) => {
    setActiveRoom(roomId);
    setUnreadRooms((prev) => {
      const newSet = new Set(prev);
      newSet.delete(roomId);
      return newSet;
    });
  };

  const sendMsg = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const msgData = { roomId: activeRoom, message: message.trim(), sender: "admin" };
    socket.emit("send_message", msgData);
    setChat((prev) => [...prev, msgData]);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-4" dir="rtl">
       {/* UI code remains the same */}
       <div className="w-1/3 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-5 bg-gray-50 border-b border-gray-200 font-black text-gray-800 text-lg flex justify-between items-center">
          <span>المحادثات النشطة</span>
          {unreadRooms.size > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
              {unreadRooms.size} جديد
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {rooms.length === 0 ? (
            <div className="p-10 text-center text-gray-400 italic">
              لا توجد محادثات سابقة
            </div>
          ) : (
            rooms.map((id) => {
              const isUnread = unreadRooms.has(id);
              return (
                <button
                  key={id}
                  onClick={() => handleRoomClick(id)}
                  className={`w-full p-5 text-right border-b border-gray-100 transition-all flex justify-between items-center ${
                    activeRoom === id
                      ? "bg-blue-50 border-r-4 border-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={`font-black ${isUnread ? "text-red-600" : "text-gray-900"}`}
                    >
                      عميل: {id.split("_")[1] || id}
                    </span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-tighter">
                      ID: {id}
                    </span>
                  </div>
                  {isUnread && (
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
        {activeRoom ? (
          <>
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="font-black text-gray-800 text-lg">
                  محادثة العميل ({activeRoom.split("_")[1]})
                </span>
              </div>
              <button
                onClick={() => setActiveRoom(null)}
                className="text-gray-400 hover:text-red-500 transition-colors font-bold text-sm border px-3 py-1 rounded-lg"
              >
                إغلاق المحادثة
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-[#F8F9FA] space-y-4 flex flex-col">
              {chat.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === "admin" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`p-4 rounded-2xl max-w-md shadow-sm text-sm leading-relaxed ${
                      m.sender === "admin"
                        ? "bg-blue-600 text-white font-bold rounded-tr-none"
                        : "bg-white text-gray-900 border border-gray-200 font-medium rounded-tl-none"
                    }`}
                  >
                    {m.message}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <form
              onSubmit={sendMsg}
              className="p-4 bg-white border-t border-gray-200 flex gap-3"
            >
              <input
                className="flex-1 p-4 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-gray-900 font-bold transition-all"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب ردك المهني هنا..."
              />
              <button className="bg-blue-600 text-white px-8 py-2 rounded-xl font-black hover:bg-blue-700 shadow-lg transition-all active:scale-95">
                إرسال
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-4">
            <svg className="w-20 h-20 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-xl font-bold text-gray-400">يرجى اختيار محادثة للبدء</p>
          </div>
        )}
      </div>
    </div>
  );
}
