import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader } from "lucide-react";
import logo from "../nirog-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login integration coming soon!");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">

      {/* Logo */}
      <div className="mb-10">
        <img src={logo} alt="NIROG Logo" 
        className="w-40 object-contain mx-auto drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]" 
        />
      </div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-6"
      >

        {/* Email */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          className="h-14 bg-[#0f172a] border border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl"
        />

        {/* Password */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          className="h-14 bg-[#0f172a] border border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl"
        />

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700 rounded-lg text-sm text-red-300">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          {isLoading ? (
            <>
              <Loader size={16} className="animate-spin mr-2" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        {/* Register Link */}
        <p className="text-center text-zinc-400">
          New here?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline"
          >
            Register here
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-4 bg-[#0f172a] border border-zinc-800 rounded-xl p-5 text-sm text-zinc-300 text-center">
          <p className="font-semibold mb-3 text-white">
            Demo Credentials
          </p>

          <p>
            <span className="text-blue-400">Full Demo:</span>{" "}
            rajesh@example.com / rajesh123
          </p>

          <p>
            <span className="text-blue-400">New User:</span>{" "}
            demo@example.com / demo123
          </p>
        </div>

        {/* Google Login BELOW Credentials */}
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full h-12 bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 rounded-xl"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>

      </form>
    </div>
  );
}
