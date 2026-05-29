"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function UpgradePage() {
  const { data: session } = useSession();

  return (
    <div style={{ minHeight:"100vh", background:"#FAFAF8", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.15); }
        .btn { transition: all .2s ease; }
        .card:hover { border-color: #c8923a !important; }
        .card { transition: border-color .2s ease; }
      `}</style>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"64px 24px" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", color:"#c8923a", border:"1px solid #c8923a", padding:"4px 12px", borderRadius:2, marginBottom:16 }}>Upgrade</div>
          <h1 className="serif" style={{ fontSize:"clamp(36px,4vw,56px)", fontWeight:700, marginBottom:12, lineHeight:1.1 }}>
            Unlock everything<br /><em style={{ color:"#c8923a" }}>in DocVault.</em>
          </h1>
          {session?.user?.name && (
            <p style={{ fontSize:15, color:"#7a7060" }}>Hey {session.user.name.split(" ")[0]} — choose the plan that works for you.</p>
          )}
        </div>

        {/* Plans */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:40 }}>

          {/* Monthly */}
          <div className="card" style={{ background:"#fff", border:"2px solid #c8923a", borderRadius:16, padding:32, position:"relative" }}>
            <div style={{ position:"absolute", top:-12, left:24, background:"#c8923a", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 12px", borderRadius:999 }}>Most Popular</div>
            <div style={{ fontSize:13, color:"#7a7060", marginBottom:6 }}>Full Access Pass</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
              <span className="serif" style={{ fontSize:52, fontWeight:700, lineHeight:1 }}>$29</span>
              <span style={{ fontSize:13, color:"#7a7060" }}>/month</span>
            </div>
            <p style={{ fontSize:13, color:"#7a7060", marginBottom:24, lineHeight:1.6 }}>Full access to all templates. Cancel anytime.</p>
            <ul style={{ listStyle:"none", padding:0, marginBottom:28 }}>
              {["All 12 templates instantly","New templates added monthly","Cancel anytime","Commercial use license","Priority email support"].map(f => (
                <li key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, padding:"5px 0" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8923a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ color:"#7a7060" }}>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#" onClick={e => { e.preventDefault(); alert("Payments launching soon! Check back shortly."); }} className="btn"
              style={{ display:"block", textAlign:"center", background:"#c8923a", color:"#fff", padding:"14px", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              Get Full Access — $29/mo
            </a>
            <p style={{ fontSize:11, color:"#7a7060", textAlign:"center", marginTop:8 }}>14-day free trial · No commitment</p>
          </div>

          {/* Lifetime */}
          <div className="card" style={{ background:"#1a1a18", border:"2px solid #1a1a18", borderRadius:16, padding:32 }}>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:6 }}>Lifetime Deal</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
              <span className="serif" style={{ fontSize:52, fontWeight:700, lineHeight:1, color:"#fff" }}>$149</span>
              <span style={{ fontSize:13, color:"rgba(255,255,255,.4)" }}>one time</span>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:24, lineHeight:1.6 }}>Pay once, own it forever. Includes all future templates.</p>
            <ul style={{ listStyle:"none", padding:0, marginBottom:28 }}>
              {["All 12 templates instantly","All future templates free","No subscription ever","Commercial use license","Priority email support"].map(f => (
                <li key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, padding:"5px 0" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8923a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ color:"rgba(255,255,255,.6)" }}>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#" onClick={e => { e.preventDefault(); alert("Payments launching soon! Check back shortly."); }} className="btn"
              style={{ display:"block", textAlign:"center", background:"#c8923a", color:"#fff", padding:"14px", borderRadius:8, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              Get Lifetime Access — $149
            </a>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.3)", textAlign:"center", marginTop:8 }}>One-time payment · Yours forever</p>
          </div>
        </div>

        {/* Compare */}
        <div style={{ background:"#fff", border:"1px solid #e8e0d0", borderRadius:12, padding:24, marginBottom:32 }}>
          <h3 style={{ fontSize:11, fontWeight:600, marginBottom:16, color:"#7a7060", textTransform:"uppercase", letterSpacing:"1px" }}>
            What is included in both plans
          </h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {[
              { icon:"📄", label:"12 Templates", desc:"Contracts, estimates, checklists, spreadsheets" },
              { icon:"⚡", label:"Instant Download", desc:"Files delivered immediately after payment" },
              { icon:"✏️", label:"Fully Editable", desc:"Works in Word, Excel & Google Workspace" },
              { icon:"🔁", label:"Free Updates", desc:"Get every future update at no extra cost" },
              { icon:"💼", label:"Commercial License", desc:"Use in your business and with clients" },
              { icon:"📧", label:"Email Support", desc:"Get help from the DocVault team" },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", gap:10 }}>
                <div style={{ fontSize:20, flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{item.label}</div>
                  <div style={{ fontSize:11, color:"#7a7060", lineHeight:1.4 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign:"center" }}>
          <Link href="/dashboard" style={{ fontSize:13, color:"#7a7060", textDecoration:"none" }}>← Back to dashboard</Link>
        </div>

      </div>
    </div>
  );
}