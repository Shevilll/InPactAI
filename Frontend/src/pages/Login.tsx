import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Rocket } from "lucide-react";
import { supabase } from "../utils/supabase";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const Navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      // AuthContext will handle navigation based on user onboarding status and role
      setIsLoading(false);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.log("Google login error", error);
      return;
    }

    // AuthContext will handle navigation based on user onboarding status and role
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between bg-slate-50 dark:bg-[#030712] relative overflow-hidden font-sans transition-colors duration-500">
      {/* Cinematic Ambient Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full bg-purple-400/10 dark:bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Top Navigation Header */}
      <header className="w-full flex justify-between items-center px-6 py-5 md:px-12 relative z-10">
        <Link
          to="/"
          className="flex items-center space-x-2.5 group transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-600/10 dark:shadow-indigo-500/5 group-hover:scale-105 transition-all duration-300">
            <Rocket className="h-5 w-5 text-white stroke-[1.75]" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
            Inpact
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline font-medium">
            Don't have an account?
          </span>
          <Link
            to="/signup"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-950/80 px-4 py-2 rounded-xl transition-all duration-300"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Centered Form Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
        {/* Double-Bezel Nested Card Enclosure */}
        <div className="w-full max-w-md p-1.5 md:p-2 rounded-[2.25rem] bg-slate-200/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 shadow-[0_24px_80px_-15px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_80px_-15px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-500 hover:shadow-[0_32px_96px_-10px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_32px_96px_-10px_rgba(99,102,241,0.1)]">
          <div className="w-full rounded-[calc(2.25rem-8px)] p-6 md:p-10 bg-white dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
            {/* Header / Brand Welcome */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2.5">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-medium animate-[pulse_1.5s_ease-in-out_infinite]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Address Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] font-medium"
                  placeholder="you@example.com"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pr-12 font-medium"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 stroke-[1.75]" />
                    ) : (
                      <Eye className="h-5 w-5 stroke-[1.75]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login CTA (Submit Button) */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 px-4 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-[0_4px_20px_-2px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_24px_-2px_rgba(99,102,241,0.4)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-900 active:scale-[0.98] ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center font-semibold">
                    <svg
                      className="animate-spin -ml-1 mr-2.5 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Separator / Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-slate-800/80"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="px-3 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 font-bold">
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth Buttons (Centered Grid) */}
            <div className="grid grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 dark:border-slate-800/80 rounded-xl shadow-sm bg-white dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] gap-2.5"
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-slate-500 dark:text-slate-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 dark:border-slate-800/80 rounded-xl shadow-sm bg-white dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] gap-2.5"
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-slate-500 dark:text-slate-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Styled Centered Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 dark:text-slate-500 relative z-10 font-semibold">
        © 2024 Inpact. All rights reserved.
      </footer>
    </div>
  );
}
