import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function Dashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">Halo, {username}</h1>

      <p className="mt-2 text-muted-foreground">Siap mengerjakan quiz?</p>

      <Button className="mt-6" onClick={() => navigate("/quiz")}>
        Mulai Quiz
      </Button>
    </div>
  );
}
