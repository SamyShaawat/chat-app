import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import MessageBubble from "../components/MessageBubble";
import socket from "../socket";
import { useAuth } from "../auth/useAuth";

interface Message {
  sender: string;
  text: string;
}

const ChatRoom: React.FC = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) return;

    // Join the room
    socket.emit("joinRoom", roomId);

    // Listen for incoming messages
    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Leave the room on cleanup
    return () => {
      socket.off("message");
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = { sender: user!, text: input };
    socket.emit("message", { roomId, ...msg });
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Room: {roomId}
        </h2>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 bg-white dark:bg-gray-800 rounded-xl shadow-inner"
        >
          {messages.map((msg, i) => (
            <MessageBubble
              key={i}
              message={msg.text}
              isOwn={msg.sender === user}
            />
          ))}
        </div>

        <div className="flex mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-l-2xl border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-r-2xl hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatRoom;
