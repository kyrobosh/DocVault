"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div style={{ minHeight:"100vh", background:"#FAFAF8", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 20px", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        input:focus { outline: none; border-color: #c8923a !important; box-shadow: 0 0 0 3px rgba(200,146,58,.1); }
        .btn-hover:hover { background: #b07830 !important; transform: translateY(-1px); }
        .btn-hover { transition: all .2s ease; }
      `}</style>

      {/* Logo */}
      <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32, textDecoration:"none" }}>
        <div style={{ width:36, height:36, borderRadius:8, background:"#1a1a18", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8923a" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <span style={{ fontSize:20, fontWeight:700, color:"#1a1a18" }}>Doc<span style={{ color:"#c8923a" }}>Vault</span></span>
      </Link>

      <div style={{ width:"100%", maxWidth:420, background:"#fff", border:"1px solid #e8e0d0", borderRadius:16, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.08)" }}>
        {/* Header */}
        <div style={{ background:"#1a1a18", padding:"28px 32px" }}>
          <h1 className="serif" style={{ fontSize:28, fontWeight:700, color:"#fff", marginBottom:4 }}>Welcome back</h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.5)" }}>Sign in to access your templates</p>
        </div>

        {/* Form */}
        <div style={{ padding:"28px 32px" }}>
          {error && (
            <div style={{ background:"#fff5f5", border:"1px solid #fecaca", color:"#b84c2a", fontSize:13, padding:"12px 16px", borderRadius:8, marginBottom:20 }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#7a7060", marginBottom:6, letterSpacing:".3px" }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #e8e0d0", borderRadius:8, fontSize:14, fontFamily:"'DM Sans',sans-serif", background:"#FAFAF8", color:"#1a1a18", boxSizing:"border-box", transition:"border-color .2s ease" }} />
            </div>
            <div style={{ marginBottom:8 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#7a7060", marginBottom:6, letterSpacing:".3px" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #e8e0d0", borderRadius:8, fontSize:14, fontFamily:"'DM Sans',sans-serif", background:"#FAFAF8", color:"#1a1a18", boxSizing:"border-box", transition:"border-color .2s ease" }} />
            </div>
            <div style={{ textAlign:"right", marginBottom:20 }}>
              <a href="#" style={{ fontSize:12, color:"#c8923a", textDecoration:"none" }}>Forgot password?</a>
            </div>
            <button type="submit" disabled={loading} className="btn-hover"
              style={{ width:"100%", background:"#c8923a", color:"#fff", border:"none", padding:"13px", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>

          <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
            <div style={{ flex:1, height:1, background:"#e8e0d0" }} />
            <span style={{ fontSize:11, color:"#7a7060" }}>or</span>
            <div style={{ flex:1, height:1, background:"#e8e0d0" }} />
          </div>

          <p style={{ textAlign:"center", fontSize:13, color:"#7a7060" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color:"#c8923a", fontWeight:600, textDecoration:"none" }}>Create one free</Link>
          </p>
        </div>
      </div>

      <p style={{ marginTop:20, fontSize:11, color:"#b0a898" }}>
        <Link href="/" style={{ color:"#b0a898", textDecoration:"none" }}>← Back to DocVault</Link>
      </p>
    </div>
  );
}