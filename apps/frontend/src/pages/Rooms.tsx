import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import RoomList from "../components/RoomList";
import Layout from "../components/Layout";

interface Room {
  id: string;
  name: string;
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Available Chat Rooms
        </h1>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading rooms...</p>
        ) : (
          <RoomList rooms={rooms} />
        )}
      </div>
    </Layout>
  );
};

export default Rooms;
