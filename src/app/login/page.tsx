"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push(data.redirect);
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4 relative z-10">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="font-serif font-light text-[56px] leading-[1] tracking-[-0.04em] text-ink mb-4">
            Learn<em className="italic text-ochre font-light font-serif-italic">Flow</em>
          </h1>
          <p className="font-serif italic text-ink-soft text-[20px] max-w-[24ch] mx-auto leading-[1.4]">
            Sign in to access your dashboard.
          </p>
        </div>

        <div className="bg-paper border border-rule p-8 sm:p-12 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-ink -translate-x-[1px] -translate-y-[1px]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-ink translate-x-[1px] translate-y-[1px]" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-ink-mute hover:text-ink transition-colors cursor-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <div className="bg-crimson/5 border border-crimson/20 text-crimson px-4 py-3 text-[14px]">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"} <span className="btn-primary-arrow ml-2">→</span>
            </Button>
          </form>
        </div>

        <p className="text-center text-ink-faint font-mono text-[11px] uppercase tracking-[0.15em] mt-10">
          Contact your administrator if you need access
        </p>
      </div>
    </div>
  );
}
