import React from "react";

interface Props {
  message: string;
  isOwn?: boolean;
}

const MessageBubble: React.FC<Props> = ({ message, isOwn }) => {
  return (
    <div
      className={`max-w-[70%] px-4 py-2 rounded-2xl break-words ${
        isOwn
          ? "ml-auto bg-blue-500 text-white"
          : "mr-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      }`}
    >
      {message}
    </div>
  );
};

export default MessageBubble;
