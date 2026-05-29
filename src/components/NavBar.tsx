// src/components/Navbar.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { getCart, CartItem } from "@/lib/cart-store";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setCart(getCart());
    const cartHandler = () => setCart(getCart());
    const scrollHandler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("cart-updated", cartHandler);
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      window.removeEventListener("cart-updated", cartHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <nav style={{
        position:"sticky", top:0, zIndex:100,
        background: scrolled ? "rgba(250,250,248,.95)" : "#FAFAF8",
        borderBottom:"1px solid #e8e0d0",
        padding:"0 48px", height:62,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition:"all .3s ease",
        fontFamily:"'DM Sans',sans-serif"
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
          <div style={{ width:30, height:30, borderRadius:7, background:"#1a1a18", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8923a" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <span style={{ fontSize:18, fontWeight:700, color:"#1a1a18", fontFamily:"'DM Sans',sans-serif" }}>Doc<span style={{ color:"#c8923a" }}>Vault</span></span>
        </Link>

        {/* Center links */}
        <div style={{ display:"flex", alignItems:"center", gap:28 }}>
          {[["Templates","/#templates"], ["Bundles","/#bundles"], ["Pricing","/#pricing"]].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize:13, fontWeight:500, color:"#7a7060", textDecoration:"none", transition:"color .2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1a1a18")}
              onMouseLeave={e => (e.currentTarget.style.color = "#7a7060")}>{l}</Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {/* Cart button */}
          <button onClick={() => setCartOpen(true)} style={{ position:"relative", background:"none", border:"1.5px solid #e8e0d0", borderRadius:8, padding:"7px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:500, color:"#1a1a18", fontFamily:"'DM Sans',sans-serif", transition:"all .2s ease" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8923a"; (e.currentTarget as HTMLButtonElement).style.color = "#c8923a"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8e0d0"; (e.currentTarget as HTMLButtonElement).style.color = "#1a1a18"; }}>
            🛒 Cart
            {cart.length > 0 && (
              <span style={{ background:"#c8923a", color:"#fff", fontSize:10, fontWeight:700, width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>{cart.length}</span>
            )}
          </button>

          {session ? (
            <>
              <Link href="/dashboard" style={{ fontSize:13, fontWeight:500, color:"#7a7060", textDecoration:"none", padding:"8px 14px", borderRadius:8, transition:"all .2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#f0ebe0"; (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a18"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#7a7060"; }}>
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl:"/" })}
                style={{ fontSize:13, fontWeight:500, color:"#7a7060", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"color .2s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#b84c2a")}
                onMouseLeave={e => (e.currentTarget.style.color = "#7a7060")}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ fontSize:13, fontWeight:500, color:"#7a7060", textDecoration:"none", padding:"8px 14px", borderRadius:8, transition:"all .2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1a1a18"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#7a7060"; }}>
                Sign in
              </Link>
              <Link href="/register" style={{ background:"#c8923a", color:"#fff", padding:"9px 18px", borderRadius:7, fontSize:13, fontWeight:600, textDecoration:"none", transition:"background .2s ease" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#b07830")}
                onMouseLeave={e => (e.currentTarget.style.background = "#c8923a")}>
                Get full access
              </Link>
            </>
          )}
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}