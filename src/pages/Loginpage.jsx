import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { auth, signInWithEmailAndPassword } from "../components/Firebase";
import toast from "react-hot-toast";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const ADMIN_EMAILS = ["ukejeisaac71@gmail.com", "goodybliss@gmail.com"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Determine role based on email
      const isAdmin = ADMIN_EMAILS.includes(user.email);
      const role = isAdmin ? "admin" : "user";

      // Store auth token and role
      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", user.email);

      // Redirect based on role
      const from =
        location.state?.from?.pathname ||
        (isAdmin ? "/admin/dashboard" : "/gallery");

      navigate(from, { replace: true });
      toast.success(`Welcome ${isAdmin ? "Admin" : "User"}!`);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : "Login failed. Please try again."
      );
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userEmail");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#74541e] mb-2">
            Goodybliss Konxept
          </h1>
          <p className="text-[#846C3B]">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#e8e2d6]">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-[#f5f0ea] p-4 rounded-full">
                <Lock className="text-[#C47E20] w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-2xl font-serif text-center text-[#74541e] mb-6">
              Sign In
            </h2>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#846C3B] mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-[#C47E20] h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                    placeholder="Some@email.com"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#846C3B] mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-[#C47E20] h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-[#d4c9b5] rounded-lg focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="text-[#C47E20] h-5 w-5" />
                    ) : (
                      <Eye className="text-[#C47E20] h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#C47E20] focus:ring-[#C47E20] border-[#d4c9b5] rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-[#846C3B]"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-[#C47E20] hover:text-[#a56d1a]"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <span className="text-sm flex gap-4 mb-3">
                <p>Dont have an account ?</p>
                <Link
                  to="/signup"
                  className="font-medium text-[#C47E20] hover:text-[#a56d1a] hover:underline"
                >
                  Sign up
                </Link>
              </span>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C47E20] ${
                  isLoading ? "bg-[#74541e]" : "bg-[#74541e] hover:bg-[#5a4218]"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  </>
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-xs bg-[#f9f7f3] px-8 py-4 text-center border-t border-[#e8e2d6]">
            <p className="text-xs text-[#846C3B]">
              © {new Date().getFullYear()} Goodybliss Konxept. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
