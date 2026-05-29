"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, removeFromCart, clearCart, getCartTotal, CartItem } from "@/lib/cart-store";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"cart" | "details" | "processing" | "success">("cart");

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = getCartTotal(cart);

  function handleRemove(id: number) {
    setCart(removeFromCart(id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep("processing");

    // If single item → redirect to Gumroad with email prefilled
    if (cart.length === 1) {
      const url = new URL(cart[0].gumroad);
      url.searchParams.set("email", email);
      clearCart();
      window.location.href = url.toString();
      return;
    }

    // Multiple items → open each Gumroad link sequentially
    // In production this would be a single Stripe checkout session
    clearCart();
    setStep("success");
    cart.forEach((item, i) => {
      setTimeout(() => window.open(item.gumroad, "_blank"), i * 500);
    });
  }

  if (step === "success") {
    return (
      <div style={{ minHeight:"100vh", background:"#FAFAF8", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap'); .serif{font-family:'Cormorant Garamond',serif;}`}</style>
        <div style={{ textAlign:"center", maxWidth:480, padding:"0 24px" }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
          <h1 className="serif" style={{ fontSize:36, fontWeight:700, marginBottom:8 }}>Order Complete!</h1>
          <p style={{ fontSize:15, color:"#7a7060", lineHeight:1.7, marginBottom:32 }}>Your download links have opened in new tabs. Check your email for confirmation. Thank you for choosing DocVault!</p>
          <Link href="/dashboard" style={{ background:"#c8923a", color:"#fff", padding:"14px 32px", borderRadius:8, fontSize:14, fontWeight:600, textDecoration:"none" }}>Go to Dashboard →</Link>
        </div>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div style={{ minHeight:"100vh", background:"#FAFAF8", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ width:48, height:48, border:"3px solid #e8e0d0", borderTopColor:"#c8923a", borderRadius:"50%", animation:"spin 1s linear infinite", margin:"0 auto 16px" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize:15, color:"#7a7060" }}>Redirecting to checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:"#FAFAF8", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        input:focus { outline: none; border-color: #c8923a !important; box-shadow: 0 0 0 3px rgba(200,146,58,.1); }
        .btn:hover { background: #b07830 !important; transform: translateY(-1px); }
        .btn { transition: all .2s ease; }
      `}</style>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"48px 24px", display:"grid", gridTemplateColumns:"1fr 380px", gap:40, alignItems:"start" }}>

        {/* Left — Order details form */}
        <div>
          <Link href="/" style={{ fontSize:13, color:"#7a7060", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6, marginBottom:32 }}>
            ← Back to store
          </Link>

          <h1 className="serif" style={{ fontSize:36, fontWeight:700, marginBottom:4 }}>Checkout</h1>
          <p style={{ fontSize:14, color:"#7a7060", marginBottom:32 }}>Your files will be delivered instantly after payment.</p>

          {cart.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 20px", background:"#fff", borderRadius:12, border:"1px solid #e8e0d0" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>🗂️</div>
              <div style={{ fontSize:16, fontWeight:600, marginBottom:8 }}>Your cart is empty</div>
              <Link href="/" style={{ color:"#c8923a", fontWeight:600, textDecoration:"none" }}>Browse templates →</Link>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div style={{ background:"#fff", border:"1px solid #e8e0d0", borderRadius:12, overflow:"hidden", marginBottom:24 }}>
                <div style={{ padding:"16px 20px", borderBottom:"1px solid #f0ebe0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, fontWeight:600 }}>Order Items</span>
                  <Link href="/" style={{ fontSize:12, color:"#c8923a", textDecoration:"none" }}>+ Add more</Link>
                </div>
                {cart.map(item => (
                  <div key={item.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 20px", borderBottom:"1px solid #f0ebe0" }}>
                    <div style={{ width:44, height:44, borderRadius:8, background:"#f0ebe0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{item.icon}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{item.title}</div>
                      <div style={{ fontSize:11, color:"#7a7060" }}>{item.niche} · {item.formats}</div>
                    </div>
                    <div className="serif" style={{ fontSize:18, fontWeight:700, color:"#c8923a", marginRight:8 }}>${item.price}</div>
                    <button onClick={() => handleRemove(item.id)} style={{ background:"none", border:"none", color:"#b0a898", cursor:"pointer", fontSize:14, padding:4 }}>✕</button>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div style={{ background:"#fff", border:"1px solid #e8e0d0", borderRadius:12, padding:"24px" }}>
                <h3 style={{ fontSize:16, fontWeight:600, marginBottom:20 }}>Your details</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom:16 }}>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#7a7060", marginBottom:6 }}>Full name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" required
                      style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #e8e0d0", borderRadius:8, fontSize:14, fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box", background:"#FAFAF8" }} />
                  </div>
                  <div style={{ marginBottom:24 }}>
                    <label style={{ display:"block", fontSize:12, fontWeight:600, color:"#7a7060", marginBottom:6 }}>Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                      style={{ width:"100%", padding:"11px 14px", border:"1.5px solid #e8e0d0", borderRadius:8, fontSize:14, fontFamily:"'DM Sans',sans-serif", boxSizing:"border-box", background:"#FAFAF8" }} />
                    <div style={{ fontSize:11, color:"#7a7060", marginTop:6 }}>Download links will be sent here</div>
                  </div>
                  <button type="submit" className="btn"
                    style={{ width:"100%", background:"#c8923a", color:"#fff", border:"none", padding:"14px", borderRadius:8, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                    Complete Purchase → ${total}
                  </button>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:12 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7a7060" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span style={{ fontSize:11, color:"#7a7060" }}>Secure checkout via Gumroad · Instant delivery</span>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Right — Order summary */}
        <div style={{ position:"sticky", top:80 }}>
          <div style={{ background:"#fff", border:"1px solid #e8e0d0", borderRadius:12, overflow:"hidden" }}>
            <div style={{ background:"#1a1a18", padding:"20px 24px" }}>
              <h3 className="serif" style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:2 }}>Order Summary</h3>
              <p style={{ fontSize:12, color:"rgba(255,255,255,.4)" }}>{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
            </div>
            <div style={{ padding:"20px 24px" }}>
              {cart.map(item => (
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", fontSize:13, padding:"6px 0", borderBottom:"1px solid #f0ebe0" }}>
                  <span style={{ color:"#1a1a18", flex:1, marginRight:12 }}>{item.title}</span>
                  <span style={{ fontWeight:600, flexShrink:0 }}>${item.price}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:16, marginTop:8 }}>
                <span style={{ fontSize:14, fontWeight:600 }}>Total</span>
                <span className="serif" style={{ fontSize:28, fontWeight:700, color:"#c8923a" }}>${total}</span>
              </div>
              <div style={{ marginTop:20, padding:"14px", background:"#f0ebe0", borderRadius:8 }}>
                <div style={{ fontSize:11, fontWeight:600, color:"#c8923a", marginBottom:6 }}>💡 Better value available</div>
                <div style={{ fontSize:11, color:"#7a7060", marginBottom:10, lineHeight:1.5 }}>Full access to all 250+ templates is just $29/mo — much better than buying individually.</div>
                <Link href="/register" style={{ display:"block", textAlign:"center", background:"#1a1a18", color:"#fff", padding:"9px", borderRadius:6, fontSize:12, fontWeight:600, textDecoration:"none" }}>
                  Get Full Access Instead →
                </Link>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ marginTop:16, display:"flex", flexDirection:"column", gap:8 }}>
            {["✓ Instant download after payment", "✓ Editable in Word, Excel & Google", "✓ Free updates forever", "✓ Secure checkout via Gumroad"].map(t => (
              <div key={t} style={{ fontSize:12, color:"#7a7060", display:"flex", alignItems:"center", gap:6 }}>{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}