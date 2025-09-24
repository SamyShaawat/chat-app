import React from "react";

interface Room {
  id: string;
  name: string;
}

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  if (rooms.length === 0) {
    return <p className="text-gray-500">No chat rooms available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {room.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Join the conversation!
          </p>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
