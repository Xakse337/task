import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200 w-96">
        <h2 className="text-2xl font-bold mb-1 text-center text-slate-900">
          Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          Have an account?
          <Link
            to="/login"
            className="text-slate-900 font-medium hover:underline"
          >
            login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
