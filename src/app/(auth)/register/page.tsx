"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }
    await signIn("credentials", { email, password, redirect: false });
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
        * { font-family: 'Geist', sans-serif; }
        input { background: rgba(255,255,255,0.04) !important; }
        input:focus { outline: none; border-color: #2D6FE8 !important; }
      `}</style>
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-[#2D6FE8] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <span className="font-semibold text-white text-[17px]">DocVault</span>
        </div>
        <div className="bg-[#0F1623] border border-white/[0.07] rounded-2xl p-8">
          <h1 className="text-[28px] font-semibold text-white mb-1">Create your account</h1>
          <p className="text-[#6B7A99] text-[13px] mb-7">Free forever. No credit card required.</p>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] px-4 py-3 rounded-xl mb-5">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-[#6B7A99] mb-1.5">Full name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" required className="w-full px-4 py-2.5 rounded-xl border border-white/[0.07] text-white text-[14px] placeholder:text-[#3a4558]"/>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#6B7A99] mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-4 py-2.5 rounded-xl border border-white/[0.07] text-white text-[14px] placeholder:text-[#3a4558]"/>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#6B7A99] mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" minLength={8} required className="w-full px-4 py-2.5 rounded-xl border border-white/[0.07] text-white text-[14px]"/>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#2D6FE8] hover:bg-[#4080FF] text-white font-medium py-2.5 rounded-xl text-[14px] transition-all disabled:opacity-50 mt-2">
              {loading ? "Creating account..." : "Create free account"}
            </button>
          </form>
          <p className="text-center text-[13px] text-[#6B7A99] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#5B93FF] hover:text-white transition-colors">Sign in</Link>
          </p>
        </div>
        <p className="text-center text-[12px] text-[#3a4558] mt-6">
          <Link href="/" className="hover:text-[#6B7A99] transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}