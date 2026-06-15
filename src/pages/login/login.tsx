import { Toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/store/slices/apiSlice";
import { setLogin } from "@/store/slices/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showError = (message: string) => {
    setErrorMessage(message);
    setIsToastVisible(true);
  };

  const [loginUser] = useLoginMutation();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password }).unwrap();

      if (response && response.token) {
        dispatch(
          setLogin({
            token: response.token,
            email: response.user.email,
            id: response.user.id,
            rememberMe: rememberMe,
          })
        );
      }

      navigate("/dashboard");
    } catch (err: any) {
      showError(err?.data?.error || "Failed to login.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="p-8 bg-white rounded-xl shadow-sm border border-slate-200 w-96">
        <h2 className="text-2xl font-bold mb-1 text-center text-slate-900">
          Welcome
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
            login
          </Button>
        </form>

        <div className="flex items-center space-x-2 py-1">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
          />
          <label
            htmlFor="remember"
            className="text-xs font-medium text-slate-600 cursor-pointer select-none"
          >
            Remember me
          </label>
        </div>

        <div className="text-center mt-6 text-sm text-slate-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-slate-900 font-medium hover:underline"
          >
            Registration
          </Link>
        </div>
      </div>
      <Toast
        message={errorMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}

export default LoginPage;
