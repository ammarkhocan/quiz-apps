import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Login() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) return;

    localStorage.setItem("username", username);

    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-100 space-y-4">
        <h1 className="text-3xl font-bold">Quiz App</h1>

        <Input
          placeholder="Masukkan nama"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
