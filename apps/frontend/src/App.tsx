import { useState } from "react";
import { ChatPage } from "./pages/Chat";
import { LoginPage } from "./pages/Login";

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  return token ? <ChatPage token={token} /> : <LoginPage onLogin={setToken} />;
}
