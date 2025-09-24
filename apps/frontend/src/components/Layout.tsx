import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-blue-500 text-white font-bold">Chat App</header>
      <main className="flex-1 p-4 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
