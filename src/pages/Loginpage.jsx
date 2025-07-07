import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { auth, signInWithEmailAndPassword } from "../components/Firebase";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // List of admin emails (store this more securely in production)
  const ADMIN_EMAILS = ['ukejeisaac71@gmail.com'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the logged-in user is an admin
      if (ADMIN_EMAILS.includes(user.email)) {
        // Successful admin login
        navigate('/admin-dashboard'); // Redirect to admin dashboard
      } else {
        // Not an admin - sign them out
        await auth.signOut();
        setError('Access restricted to admin only');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-[#74541e] mb-2">
            Goodybliss Konxept
          </h1>
          <p className="text-[#846C3B]">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#e8e2d6]">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-[#f5f0ea] p-4 rounded-full">
                <Lock className="text-[#C47E20] w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-2xl font-serif text-center text-[#74541e] mb-6">
              Admin Sign In
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Error Message Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
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
                    placeholder="admin@goodybliss.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
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
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-[#C47E20] h-5 w-5" />
                    ) : (
                      <Eye className="text-[#C47E20] h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C47E20] ${
                  isLoading ? "bg-[#74541e]" : "bg-[#74541e] hover:bg-[#5a4218]"
                }`}
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-[#f9f7f3] px-8 py-4 text-center border-t border-[#e8e2d6]">
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