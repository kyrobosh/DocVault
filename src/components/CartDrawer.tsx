// src/components/CartDrawer.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, removeFromCart, getCartTotal, CartItem } from "@/lib/cart-store";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
    const handler = () => setCart(getCart());
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, [open]);

  const total = getCartTotal(cart);

  function handleRemove(id: number) {
    const updated = removeFromCart(id);
    setCart(updated);
  }

  // If only 1 item → go directly to Gumroad
  // If multiple items → go to checkout page
  function handleCheckout() {
    if (cart.length === 1) {
      window.open(cart[0].gumroad, "_blank");
      onClose();
    } else {
      window.location.href = "/checkout";
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(26,26,24,.5)", zIndex:998, backdropFilter:"blur(3px)" }} />

      {/* Drawer */}
      <div style={{ position:"fixed", top:0, right:0, bottom:0, width:400, background:"#fff", zIndex:999, display:"flex", flexDirection:"column", boxShadow:"-8px 0 48px rgba(0,0,0,.15)", animation:"slideIn .25s ease" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
          .serif { font-family: 'Cormorant Garamond', serif; }
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          .remove-btn:hover { color: #b84c2a !important; }
        `}</style>

        {/* Header */}
        <div style={{ background:"#1a1a18", padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h3 className="serif" style={{ fontSize:22, fontWeight:700, color:"#fff", marginBottom:2 }}>Your Cart</h3>
            <p style={{ fontSize:12, color:"rgba(255,255,255,.4)", fontFamily:"'DM Sans',sans-serif" }}>{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.1)", border:"none", color:"#fff", width:32, height:32, borderRadius:"50%", cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px", fontFamily:"'DM Sans',sans-serif" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🗂️</div>
              <div style={{ fontSize:16, fontWeight:600, color:"#1a1a18", marginBottom:4 }}>Your cart is empty</div>
              <p style={{ fontSize:13, color:"#7a7060", marginBottom:20 }}>Browse templates and add them here</p>
              <button onClick={onClose} style={{ background:"#c8923a", color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>Browse Templates</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ display:"flex", gap:14, padding:"14px 0", borderBottom:"1px solid #f0ebe0", fontFamily:"'DM Sans',sans-serif" }}>
                <div style={{ width:48, height:48, borderRadius:10, background:"#f0ebe0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{item.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:"#1a1a18", marginBottom:2, lineHeight:1.3 }}>{item.title}</div>
                  <div style={{ fontSize:11, color:"#7a7060", marginBottom:4 }}>{item.niche} · {item.formats}</div>
                  <div className="serif" style={{ fontSize:18, fontWeight:700, color:"#c8923a" }}>${item.price}</div>
                </div>
                <button onClick={() => handleRemove(item.id)} className="remove-btn"
                  style={{ background:"none", border:"none", color:"#b0a898", cursor:"pointer", fontSize:16, padding:4, alignSelf:"flex-start", transition:"color .2s ease" }}>✕</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding:"20px 24px", borderTop:"2px solid #f0ebe0", background:"#FAFAF8", fontFamily:"'DM Sans',sans-serif" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <span style={{ fontSize:14, color:"#7a7060" }}>Subtotal</span>
              <span className="serif" style={{ fontSize:26, fontWeight:700 }}>${total}</span>
            </div>
            <div style={{ fontSize:11, color:"#7a7060", marginBottom:16 }}>Instant download after payment · Editable files</div>
            <button onClick={handleCheckout}
              style={{ width:"100%", background:"#c8923a", color:"#fff", border:"none", padding:"14px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", marginBottom:8, transition:"background .2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#b07830")}
              onMouseLeave={e => (e.currentTarget.style.background = "#c8923a")}>
              Checkout → ${total}
            </button>

            {/* Full access upsell */}
            <div style={{ background:"rgba(200,146,58,.08)", border:"1px solid rgba(200,146,58,.2)", borderRadius:8, padding:"12px", marginTop:8 }}>
              <div style={{ fontSize:11, fontWeight:600, color:"#c8923a", marginBottom:2 }}>💡 Better value</div>
              <div style={{ fontSize:11, color:"#7a7060", marginBottom:8 }}>You're spending ${total} on {cart.length} template{cart.length !== 1 ? "s" : ""}. Full access is just $29/mo for everything.</div>
              <Link href="/register" onClick={onClose}
                style={{ display:"block", textAlign:"center", background:"#1a1a18", color:"#fff", padding:"8px", borderRadius:6, fontSize:12, fontWeight:600, textDecoration:"none" }}>
                Get Full Access Instead →
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}