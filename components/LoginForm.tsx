"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const [employmentId, setEmploymentId] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = login(employmentId, pincode);
      toast.promise(res, {
        loading: "Loading",
        success: "Successful login",
        error: "Login failed",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl flex flex-col font-bold  mt-2 text-center">
          {" "}
          <span>MATE</span>{" "}
          <span className="text-lg -mt-2 font-light">
            Meridion Attestation Tool
          </span>
        </div>
        <div className="bg-card-light dark:bg-card-dark p-8 border border-edge-light dark:border-edge-dark mt-6 rounded-lg shadow-lg m-6">
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            onSubmit={handleLogin}
          >
            <label className="text-md" htmlFor="employmentId">
              Employment ID
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="text"
              name="employmentId"
              placeholder="Enter your Employment ID"
              value={employmentId}
              onChange={(e) => setEmploymentId(e.target.value)}
              required
            />
            <label className="text-md" htmlFor="pincode">
              PIN Code
            </label>
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="pincode"
              placeholder="••••••••"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-slate-700 rounded-md px-4 py-2 text-white mb-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            {error && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
