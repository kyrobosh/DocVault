"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cart-store";

const TEMPLATES = [
  { id:1, title:"Roofing Job Estimate Spreadsheet", niche:"Roofing", icon:"🏠", price:27, formats:"Excel + Google Sheets" },
  { id:2, title:"Move-In / Move-Out Checklist", niche:"Property Management", icon:"🏢", price:19, formats:"Word + Google Docs" },
  { id:3, title:"Wedding Photography Contract", niche:"Photography", icon:"📸", price:37, formats:"Word + Google Docs" },
  { id:4, title:"12-Week Program Builder", niche:"Personal Training", icon:"💪", price:27, formats:"Excel + Google Sheets" },
  { id:5, title:"Freelance Service Agreement", niche:"Legal", icon:"⚖️", price:29, formats:"Word + Google Docs" },
  { id:6, title:"Monthly Cash Flow Tracker", niche:"Finance", icon:"💰", price:24, formats:"Excel + Google Sheets" },
];

const NAV = [
  { icon:"⊞", label:"Dashboard", href:"/dashboard" },
  { icon:"📁", label:"My Templates", href:"/dashboard" },
  { icon:"⭐", label:"Saved", href:"/dashboard" },
  { icon:"🛒", label:"Browse Store", href:"/" },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [purchases] = useState<number[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{ minHeight:"100vh", background:"#FAFAF8", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:32, height:32, border:"3px solid #e8e0d0", borderTopColor:"#c8923a", borderRadius:"50%", animation:"spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const firstName = session?.user?.name?.split(" ")[0] || "there";
  const hasAccess = false; // Will be true when Stripe is connected

  return (
    <div style={{ minHeight:"100vh", background:"#FAFAF8", fontFamily:"'DM Sans',sans-serif", display:"flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .nav-item:hover { background: #f0ebe0 !important; color: #1a1a18 !important; }
        .tcard:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .tcard { transition: all .2s ease; }
        .sign-out:hover { color: #b84c2a !important; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width:220, background:"#1a1a18", minHeight:"100vh", display:"flex", flexDirection:"column", padding:"24px 16px", position:"fixed", top:0, left:0, bottom:0 }}>
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, marginBottom:36, paddingLeft:8, textDecoration:"none" }}>
          <div style={{ width:28, height:28, borderRadius:6, background:"#c8923a", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <span style={{ fontSize:16, fontWeight:700, color:"#fff" }}>Doc<span style={{ color:"#c8923a" }}>Vault</span></span>
        </Link>

        <nav style={{ flex:1 }}>
          {NAV.map(item => (
            <Link key={item.label} href={item.href} onClick={() => setActiveNav(item.label)}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:8, marginBottom:2, fontSize:13, fontWeight:500, textDecoration:"none", transition:"all .2s ease",
                background: activeNav === item.label ? "rgba(200,146,58,.15)" : "transparent",
                color: activeNav === item.label ? "#c8923a" : "rgba(255,255,255,.5)" }}
              className="nav-item">
              <span style={{ fontSize:16 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Upgrade banner */}
        {!hasAccess && (
          <div style={{ background:"rgba(200,146,58,.1)", border:"1px solid rgba(200,146,58,.2)", borderRadius:10, padding:"14px", marginBottom:16 }}>
            <div style={{ fontSize:12, fontWeight:600, color:"#c8923a", marginBottom:4 }}>Upgrade to Full Access</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginBottom:10, lineHeight:1.5 }}>Unlock all 250+ templates for $29/mo</div>
            <Link href="/register" style={{ display:"block", textAlign:"center", background:"#c8923a", color:"#fff", fontSize:11, fontWeight:600, padding:"7px", borderRadius:6, textDecoration:"none" }}>Upgrade Now →</Link>
          </div>
        )}

        {/* User */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.07)", paddingTop:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, paddingLeft:4, marginBottom:10 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:"#c8923a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:12, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{session?.user?.name}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{session?.user?.email}</div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl:"/" })} className="sign-out"
            style={{ width:"100%", textAlign:"left", padding:"8px 12px", borderRadius:6, fontSize:12, color:"rgba(255,255,255,.4)", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"color .2s ease" }}>
            Sign out
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft:220, flex:1, padding:"40px 48px" }}>
        {/* Header */}
        <div style={{ marginBottom:36 }}>
          <h1 className="serif" style={{ fontSize:36, fontWeight:700, marginBottom:4 }}>
            Good to see you, {firstName} 👋
          </h1>
          <p style={{ fontSize:14, color:"#7a7060" }}>Manage your templates and purchases from here.</p>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:40 }}>
          {[
            { label:"Templates Owned", value: purchases.length || "0", icon:"📄", sub:"of 250+ available" },
            { label:"Plan", value: hasAccess ? "Full Access" : "Free", icon:"⭐", sub: hasAccess ? "All templates" : "Upgrade for more" },
            { label:"Downloads", value:"0", icon:"⬇️", sub:"Total downloads" },
            { label:"Saved", value:"0", icon:"🔖", sub:"Bookmarked items" },
          ].map(s => (
            <div key={s.label} style={{ background:"#fff", border:"1px solid #e8e0d0", borderRadius:12, padding:"20px" }}>
              <div style={{ fontSize:24, marginBottom:10 }}>{s.icon}</div>
              <div className="serif" style={{ fontSize:28, fontWeight:700, marginBottom:2 }}>{s.value}</div>
              <div style={{ fontSize:12, fontWeight:600, color:"#1a1a18", marginBottom:2 }}>{s.label}</div>
              <div style={{ fontSize:11, color:"#7a7060" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Access banner if not subscribed */}
        {!hasAccess && (
          <div style={{ background:"#1a1a18", borderRadius:14, padding:"28px 32px", marginBottom:36, display:"flex", alignItems:"center", justifyContent:"space-between", gap:20 }}>
            <div>
              <div className="serif" style={{ fontSize:22, fontWeight:700, color:"#fff", marginBottom:6 }}>Unlock all 250+ templates</div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.5)", maxWidth:460 }}>Get instant access to every template — contracts, estimates, checklists, spreadsheets and more. New templates added monthly.</p>
            </div>
            <div style={{ display:"flex", gap:10, flexShrink:0 }}>
              <Link href="/upgrade" style={{ background:"#c8923a", color:"#fff", padding:"12px 24px", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none", whiteSpace:"nowrap" }}>Full Access — $29/mo</Link>
              <Link href="/upgrade" style={{ background:"rgba(255,255,255,.08)", color:"#fff", padding:"12px 24px", borderRadius:8, fontSize:13, fontWeight:500, textDecoration:"none", whiteSpace:"nowrap" }}>Lifetime — $149</Link>
            </div>
          </div>
        )}

        {/* Browse Templates */}
        <div style={{ marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <h2 className="serif" style={{ fontSize:24, fontWeight:700 }}>Popular Templates</h2>
          <Link href="/" style={{ fontSize:13, color:"#c8923a", textDecoration:"none", fontWeight:500 }}>Browse all 250+ →</Link>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
          {TEMPLATES.map(t => (
            <div key={t.id} className="tcard" style={{ background:"#fff", border:"1px solid #e8e0d0", borderRadius:12, overflow:"hidden" }}>
              <div style={{ height:100, background:"#f0ebe0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:44 }}>{t.icon}</div>
              <div style={{ padding:16 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#7a7060", marginBottom:6 }}>{t.niche}</div>
                <div className="serif" style={{ fontSize:16, fontWeight:700, marginBottom:10, lineHeight:1.3 }}>{t.title}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div className="serif" style={{ fontSize:22, fontWeight:700 }}>${t.price}</div>
                    <div style={{ fontSize:10, color:"#7a7060" }}>{t.formats}</div>
                  </div>
                  {hasAccess ? (
                    <button style={{ background:"#2a4a35", color:"#fff", border:"none", padding:"8px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>⬇ Download</button>
                  ) : (
                    <button onClick={() => addToCart({...t, gumroad:"https://gumroad.com/l/your-link"})} style={{ background:"#c8923a", color:"#fff", border:"none", padding:"8px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Add to Cart</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}