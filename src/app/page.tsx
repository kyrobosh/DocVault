"use client";
import { useState, useEffect } from "react";
import { addToCart, CartItem } from "@/lib/cart-store";
import Image from "next/image";

const PRODUCTS: (CartItem & { preview: string; includes: string[] })[] = [
  {
    id:1, title:"Roofing Job Estimate Spreadsheet", niche:"Roofing", icon:"🏠", price:27,
    formats:"Excel + Google Sheets", gumroad:"https://gumroad.com/l/your-link-1",
    preview:"/previews/roofing_estimate-1.jpg",
    includes:["Material cost calculator by sq/ft","Labor hours & rate breakdown","Profit margin tracker","Client-ready print view","How to Use tab included"],
  },
  {
    id:2, title:"Move-In / Move-Out Checklist", niche:"Property Management", icon:"🏢", price:19,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-2",
    preview:"/previews/move_in_out_checklist-1.jpg",
    includes:["Room-by-room condition tracking","Photo attachment slots","Tenant & landlord signature fields","Keys & items received log","State-agnostic legal language"],
  },
  {
    id:3, title:"Wedding Photography Contract", niche:"Photography", icon:"📸", price:37,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-3",
    preview:"/previews/photography_contract-1.jpg",
    includes:["9 professional clauses","Payment schedule & late fees","Cancellation policy","IP & usage rights","Delivery timeline terms"],
  },
  {
    id:4, title:"12-Week Program Builder", niche:"Personal Training", icon:"💪", price:27,
    formats:"Excel + Google Sheets", gumroad:"https://gumroad.com/l/your-link-4",
    preview:"/previews/pt_12week_program-01.jpg",
    includes:["3 training phases (weeks 1–12)","Client profile & intake form","Sets, reps & rest columns","Progress tracker tab","Printer-friendly client view"],
  },
  {
    id:5, title:"Freelance Service Agreement", niche:"Legal", icon:"⚖️", price:29,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-5",
    preview:"/previews/freelance_service_agreement-1.jpg",
    includes:["Scope of work definition","Payment terms & kill fee","IP ownership clause","Termination provisions","Revision policy section"],
  },
  {
    id:6, title:"Monthly Cash Flow Tracker", niche:"Finance", icon:"💰", price:24,
    formats:"Excel + Google Sheets", gumroad:"https://gumroad.com/l/your-link-6",
    preview:"/previews/cashflow_tracker-1.jpg",
    includes:["12-month income & expense tracker","Auto-calculating totals","Break-even calculator tab","Annual summary dashboard","Year-over-year comparison"],
  },
  {
    id:7, title:"Employee Onboarding Checklist", niche:"HR", icon:"👥", price:22,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-7",
    preview:"/previews/employee_onboarding_checklist-1.jpg",
    includes:["Pre-start checklist for managers","Day 1 schedule template","Week 1 & 30-day milestones","IT & tools setup tracker","Manager & employee signatures"],
  },
  {
    id:8, title:"Subcontractor Agreement", niche:"Contractors", icon:"🔧", price:34,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-8",
    preview:"/previews/subcontractor_agreement-1.jpg",
    includes:["Scope of work & deliverables","Payment schedule & retention","Insurance requirements","Liability & indemnification","Lien waiver included"],
  },
  {
    id:9, title:"Lease Violation Notice Pack", niche:"Property Management", icon:"🏢", price:22,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-9",
    preview:"/previews/lease_violation_notice_pack-1.jpg",
    includes:["Noise/nuisance notice","Late rent / non-payment notice","General lease breach notice","Editable fields throughout","Ready to print and serve"],
  },
  {
    id:10, title:"PT Liability Waiver", niche:"Personal Training", icon:"💪", price:17,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-10",
    preview:"/previews/pt_liability_waiver-1.jpg",
    includes:["Health history disclosure","Risk acknowledgment section","Emergency contact fields","Photo/media consent","Trainer & client signatures"],
  },
  {
    id:11, title:"NDA / Confidentiality Agreement", niche:"Legal", icon:"⚖️", price:24,
    formats:"Word + Google Docs", gumroad:"https://gumroad.com/l/your-link-11",
    preview:"/previews/nda_confidentiality_agreement-1.jpg",
    includes:["Mutual & one-way versions","Definition of confidential info","Permitted disclosure exceptions","Term & termination clause","Governing law section"],
  },
  {
    id:12, title:"Invoice & Receipt Template", niche:"Finance", icon:"💰", price:15,
    formats:"Word + Excel", gumroad:"https://gumroad.com/l/your-link-12",
    preview:"/previews/invoice_receipt_template-1.jpg",
    includes:["Professional invoice layout","Auto-calculating line items","Tax & subtotal rows","Payment terms section","Matching receipt template"],
  },
];

const CATEGORIES = ["All","Roofing","Property Management","Photography","Personal Training","Legal","Finance","HR","Contractors"];

const BUNDLES = [
  { icon:"🏠", title:"Roofing Business Kit", items:["Job Estimate Spreadsheet","Safety Inspection Checklist","Subcontractor Agreement","Invoice Template"], price:67, original:99, gumroad:"https://gumroad.com/l/bundle-roofing" },
  { icon:"🏢", title:"Property Manager Vault", items:["Move-In/Out Checklist","Lease Violation Pack","Tenant Welcome Letter","Maintenance Tracker"], price:79, original:120, gumroad:"https://gumroad.com/l/bundle-property" },
  { icon:"📸", title:"Photographer Starter Pack", items:["Photography Contract","Shot List & Questionnaire","Invoice Template","Model Release Form"], price:57, original:91, gumroad:"https://gumroad.com/l/bundle-photo" },
  { icon:"💪", title:"Personal Trainer Pro Kit", items:["12-Week Program Builder","Liability Waiver","Nutrition Tracker","Session Notes Template"], price:57, original:86, gumroad:"https://gumroad.com/l/bundle-trainer" },
];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<typeof PRODUCTS[0] | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [added, setAdded] = useState<number[]>([]);

  function handleAddToCart(item: CartItem) {
    addToCart(item);
    setAdded(prev => [...prev, item.id]);
    setTimeout(() => setAdded(prev => prev.filter(id => id !== item.id)), 2000);
    window.dispatchEvent(new Event("cart-updated"));
  }

  function handleModalAdd(item: CartItem) {
    addToCart(item);
    setModal(null);
    window.dispatchEvent(new CustomEvent("open-cart"));
  }

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === "All" || p.niche === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.niche.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main style={{ fontFamily:"'DM Sans',sans-serif", background:"#FAFAF8", color:"#1a1a18", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', serif; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        .anim { animation: fadeUp .6s ease both; }
        .anim-2 { animation: fadeUp .6s .12s ease both; }
        .anim-3 { animation: fadeUp .6s .24s ease both; }
        .anim-4 { animation: fadeUp .6s .36s ease both; }
        .float { animation: float 5s ease-in-out infinite; }
        .pcard:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,.1); }
        .pcard { transition: all .25s ease; cursor: pointer; }
        .pill { transition: all .2s ease; cursor: pointer; user-select: none; }
        .pill:hover { background: #1a1a18 !important; color: #fff !important; }
        .btn-gold { transition: all .2s ease; }
        .btn-gold:hover { background: #b07830 !important; transform: translateY(-1px); }
        input:focus { outline: none; border-color: #c8923a !important; }
        .preview-thumb:hover { opacity: 0.85; }
        .preview-thumb { transition: opacity .2s ease; cursor: zoom-in; }
      `}</style>

      {/* HERO */}
      <section style={{ maxWidth:1200, margin:"0 auto", padding:"80px 48px 60px", display:"grid", gridTemplateColumns:"1fr 400px", gap:80, alignItems:"center" }}>
        <div>
          <div className="anim" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 14px", borderRadius:999, border:"1px solid #c8923a", background:"rgba(200,146,58,.08)", marginBottom:24 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#c8923a" }} />
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", color:"#c8923a" }}>250+ Templates · Instant Download</span>
          </div>
          <h1 className="anim-2 serif" style={{ fontSize:"clamp(44px,5vw,72px)", fontWeight:700, lineHeight:1.05, marginBottom:20 }}>
            Every document your<br /><em style={{ color:"#c8923a" }}>business needs.</em>
          </h1>
          <p className="anim-3" style={{ fontSize:16, lineHeight:1.75, color:"#7a7060", maxWidth:460, marginBottom:36 }}>
            Professional templates for contractors, property managers, photographers, trainers, and more. Download instantly and customize in minutes.
          </p>
          <div className="anim-4" style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
            <a href="#templates" className="btn-gold" style={{ background:"#1a1a18", color:"#fff", padding:"14px 28px", borderRadius:8, fontSize:14, fontWeight:600, textDecoration:"none" }}>Browse Templates</a>
            <a href="#pricing" style={{ background:"transparent", color:"#1a1a18", padding:"14px 28px", borderRadius:8, fontSize:14, fontWeight:500, textDecoration:"none", border:"1.5px solid #e8e0d0", transition:"background .2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f0ebe0")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              View pricing →
            </a>
          </div>
          <div className="anim-4" style={{ display:"flex", gap:40 }}>
            {[["12","Templates"],["8","Industries"],["Instant","Download"],["Free","Updates"]].map(([n,l]) => (
              <div key={n}>
                <div className="serif" style={{ fontSize:26, fontWeight:700 }}>{n}</div>
                <div style={{ fontSize:11, color:"#7a7060", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — real preview */}
        <div className="float" style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 20px 80px rgba(0,0,0,.12)", border:"1px solid #e8e0d0" }}>
          <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid #f0ebe0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:12, fontWeight:600, marginBottom:2 }}>Roofing Job Estimate</div>
              <div style={{ fontSize:10, color:"#7a7060" }}>Excel + Google Sheets</div>
            </div>
            <div className="serif" style={{ fontSize:20, fontWeight:700, color:"#c8923a" }}>$27</div>
          </div>
          <div style={{ position:"relative", width:"100%", height:280, background:"#f0ebe0" }}>
            <Image src="/previews/roofing_estimate-1.jpg" alt="Roofing Estimate Preview" fill style={{ objectFit:"cover", objectPosition:"top" }} />
          </div>
          <div style={{ padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:11, color:"#7a7060" }}>Click any template to preview</span>
            <button onClick={() => setModal(PRODUCTS[0])} style={{ background:"#c8923a", color:"#fff", border:"none", padding:"7px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer" }}>Preview →</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background:"#1a1a18", padding:"20px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:48, justifyContent:"center", flexWrap:"wrap" }}>
          {[["4,800+","Businesses served"],["⭐ 4.9","Average rating"],["12","Ready-to-use templates"],["Instant","Delivery after payment"]].map(([n,l]) => (
            <div key={n} style={{ textAlign:"center" }}>
              <div className="serif" style={{ fontSize:24, fontWeight:700, color:"#c8923a" }}>{n}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TEMPLATES */}
      <section id="templates" style={{ maxWidth:1200, margin:"0 auto", padding:"80px 48px" }}>
        <div style={{ marginBottom:40 }}>
          <div style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", color:"#c8923a", border:"1px solid #c8923a", padding:"4px 12px", borderRadius:2, marginBottom:16 }}>Templates</div>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:16 }}>
            <h2 className="serif" style={{ fontSize:"clamp(32px,3vw,44px)", fontWeight:700, lineHeight:1.1 }}>Browse all templates</h2>
            <div style={{ display:"flex", gap:0, border:"1.5px solid #e8e0d0", borderRadius:8, overflow:"hidden", background:"#fff" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates…"
                style={{ padding:"10px 16px", border:"none", fontSize:13, width:220, fontFamily:"'DM Sans',sans-serif", background:"transparent", color:"#1a1a18" }} />
              <button style={{ background:"#1a1a18", color:"#fff", border:"none", padding:"10px 16px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Search</button>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {CATEGORIES.map(c => (
              <div key={c} className="pill" onClick={() => setCategory(c)}
                style={{ padding:"6px 14px", borderRadius:999, fontSize:12, fontWeight:500, border:"1.5px solid #e8e0d0", background: category===c ? "#1a1a18" : "#fff", color: category===c ? "#fff" : "#7a7060" }}>
                {c}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
          {filtered.map(p => (
            <div key={p.id} className="pcard" style={{ background:"#fff", borderRadius:12, overflow:"hidden", border:"1px solid #e8e0d0" }}>
              {/* Preview image */}
              <div onClick={() => setModal(p)} style={{ height:180, background:"#f0ebe0", position:"relative", overflow:"hidden" }}>
                <Image src={p.preview} alt={p.title} fill style={{ objectFit:"cover", objectPosition:"top" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 60%, rgba(0,0,0,.3))", display:"flex", alignItems:"flex-end", padding:"10px 12px" }}>
                  <span style={{ fontSize:10, color:"#fff", fontWeight:600, background:"rgba(0,0,0,.4)", padding:"3px 8px", borderRadius:4 }}>Click to preview</span>
                </div>
              </div>
              <div style={{ padding:18 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#7a7060", marginBottom:6 }}>{p.niche}</div>
                <div className="serif" onClick={() => setModal(p)} style={{ fontSize:17, fontWeight:700, marginBottom:14, lineHeight:1.3 }}>{p.title}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div className="serif" style={{ fontSize:24, fontWeight:700 }}>${p.price}</div>
                    <div style={{ fontSize:10, color:"#7a7060" }}>{p.formats}</div>
                  </div>
                  <button onClick={() => handleAddToCart(p)} className="btn-gold"
                    style={{ background: added.includes(p.id) ? "#2a4a35" : "#c8923a", color:"#fff", border:"none", padding:"9px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                    {added.includes(p.id) ? "✓ Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", color:"#7a7060" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:16, fontWeight:600, color:"#1a1a18", marginBottom:4 }}>No templates found</div>
            <div style={{ fontSize:13 }}>Try a different search or category</div>
          </div>
        )}
      </section>

      {/* BUNDLES */}
      <section id="bundles" style={{ background:"#1a1a18", padding:"80px 48px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ marginBottom:48, textAlign:"center" }}>
            <div style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", color:"#c8923a", border:"1px solid rgba(200,146,58,.4)", padding:"4px 12px", borderRadius:2, marginBottom:16 }}>Bundles</div>
            <h2 className="serif" style={{ fontSize:"clamp(32px,3vw,44px)", fontWeight:700, color:"#fff", marginBottom:8 }}>Industry starter kits</h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.5)" }}>Everything your trade needs — deeply discounted.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:18 }}>
            {BUNDLES.map(b => (
              <div key={b.title} style={{ background:"rgba(255,255,255,.04)", border:"1px solid rgba(200,146,58,.2)", borderRadius:12, padding:26, transition:"all .25s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor="#c8923a"; (e.currentTarget as HTMLDivElement).style.background="rgba(200,146,58,.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor="rgba(200,146,58,.2)"; (e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,.04)"; }}>
                <div style={{ fontSize:32, marginBottom:14 }}>{b.icon}</div>
                <div className="serif" style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:6 }}>{b.title}</div>
                <ul style={{ listStyle:"none", padding:0, marginBottom:20 }}>
                  {b.items.map(item => (
                    <li key={item} style={{ fontSize:12, color:"rgba(255,255,255,.6)", padding:"3px 0", display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ color:"#c8923a", fontWeight:700 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:16 }}>
                  <span className="serif" style={{ fontSize:28, fontWeight:700, color:"#c8923a" }}>${b.price}</span>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,.4)", textDecoration:"line-through" }}>${b.original}</span>
                  <span style={{ fontSize:10, background:"#b84c2a", color:"#fff", padding:"2px 6px", borderRadius:2, fontWeight:700 }}>SAVE {Math.round((1-b.price/b.original)*100)}%</span>
                </div>
                <a href={b.gumroad} target="_blank" rel="noopener noreferrer"
                  style={{ display:"block", textAlign:"center", background:"rgba(200,146,58,.15)", color:"#c8923a", border:"1px solid rgba(200,146,58,.3)", padding:"10px", borderRadius:6, fontSize:13, fontWeight:600, textDecoration:"none", transition:"all .2s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background="#c8923a"; (e.currentTarget as HTMLAnchorElement).style.color="#1a1a18"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background="rgba(200,146,58,.15)"; (e.currentTarget as HTMLAnchorElement).style.color="#c8923a"; }}>
                  Get this bundle →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth:1200, margin:"0 auto", padding:"80px 48px" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"2px", textTransform:"uppercase", color:"#c8923a", border:"1px solid #c8923a", padding:"4px 12px", borderRadius:2, marginBottom:16 }}>Pricing</div>
          <h2 className="serif" style={{ fontSize:"clamp(32px,3vw,44px)", fontWeight:700, marginBottom:8 }}>Simple, transparent pricing</h2>
          <p style={{ fontSize:15, color:"#7a7060" }}>Buy one template or unlock everything.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, maxWidth:900, margin:"0 auto" }}>
          {[
            { name:"Pay Per Template", price:"$15–37", period:"per template", desc:"Buy exactly what you need.", features:["Instant download","Editable in Word/Excel","Free updates forever","Use across your business"], cta:"Browse templates", href:"#templates", highlight:false },
            { name:"Full Access Pass", price:"$29", period:"per month", desc:"Unlimited access to everything.", features:["All 12 templates instantly","New templates monthly","Cancel anytime","Priority support","Commercial use license"], cta:"Get full access", href:"/upgrade", highlight:true },
            { name:"Lifetime Deal", price:"$149", period:"one time", desc:"Pay once, own it forever.", features:["All 12 templates instantly","All future templates free","No subscription","Commercial use license","Priority support"], cta:"Get lifetime access", href:"/upgrade", highlight:false },
          ].map(plan => (
            <div key={plan.name} style={{ borderRadius:12, padding:28, border: plan.highlight ? "2px solid #c8923a" : "1px solid #e8e0d0", background: plan.highlight ? "rgba(200,146,58,.04)" : "#fff", position:"relative" }}>
              {plan.highlight && <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"#c8923a", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 12px", borderRadius:999 }}>Most Popular</div>}
              <div style={{ fontSize:12, color:"#7a7060", marginBottom:4 }}>{plan.name}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
                <span className="serif" style={{ fontSize:36, fontWeight:700 }}>{plan.price}</span>
                <span style={{ fontSize:11, color:"#7a7060" }}>/{plan.period}</span>
              </div>
              <div style={{ fontSize:13, color:"#7a7060", marginBottom:20 }}>{plan.desc}</div>
              <a href={plan.href} className="btn-gold" style={{ display:"block", textAlign:"center", background: plan.highlight ? "#c8923a" : "#1a1a18", color:"#fff", padding:"11px", borderRadius:6, fontSize:13, fontWeight:600, textDecoration:"none", marginBottom:20 }}>{plan.cta}</a>
              {plan.features.map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, padding:"4px 0" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.highlight ? "#c8923a" : "#2a4a35"} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ color:"#7a7060" }}>{f}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"#f0ebe0", padding:"72px 48px", textAlign:"center" }}>
        <h2 className="serif" style={{ fontSize:"clamp(32px,3vw,48px)", fontWeight:700, marginBottom:12 }}>
          Ready to stop starting<br /><em style={{ color:"#c8923a" }}>from scratch?</em>
        </h2>
        <p style={{ fontSize:15, color:"#7a7060", marginBottom:32 }}>Join thousands of business owners who save hours every week with DocVault templates.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="/upgrade" className="btn-gold" style={{ background:"#1a1a18", color:"#fff", padding:"14px 32px", borderRadius:8, fontSize:14, fontWeight:600, textDecoration:"none" }}>Get full access — $29/mo</a>
          <a href="#templates" style={{ background:"#fff", color:"#1a1a18", padding:"14px 32px", borderRadius:8, fontSize:14, fontWeight:500, textDecoration:"none", border:"1.5px solid #e8e0d0" }}>Browse free first</a>
        </div>
        <p style={{ fontSize:11, color:"#7a7060", marginTop:16 }}>No credit card required to browse · Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#1a1a18", padding:"48px 48px 28px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:12 }}>Doc<span style={{ color:"#c8923a" }}>Vault</span></div>
              <p style={{ fontSize:12, color:"rgba(255,255,255,.4)", lineHeight:1.7, maxWidth:240 }}>Professional business templates for every trade and industry. Download once, use forever.</p>
            </div>
            {[
              { title:"Industries", links:["Roofing","Property Mgmt","Photography","Fitness","Construction"] },
              { title:"Templates", links:["Contracts","Estimates","Checklists","Spreadsheets","HR Forms"] },
              { title:"Company", links:["About","Refund Policy","Terms of Use","Privacy Policy","Contact"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#c8923a", marginBottom:14 }}>{col.title}</div>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ display:"block", fontSize:12, color:"rgba(255,255,255,.4)", textDecoration:"none", marginBottom:8, transition:"color .2s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.4)")}>{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.07)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>© 2026 DocVault. All rights reserved.</p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.3)" }}>Instant downloads · Secure checkout · Free updates</p>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL with preview */}
      {modal && (
        <div onClick={() => { setModal(null); setPreviewOpen(false); }} style={{ position:"fixed", inset:0, background:"rgba(26,26,24,.7)", zIndex:998, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(4px)" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:16, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", animation:"fadeUp .25s ease" }}>

            {/* Preview image */}
            <div onClick={() => setPreviewOpen(true)} className="preview-thumb" style={{ position:"relative", width:"100%", height:260, background:"#f0ebe0", borderRadius:"16px 16px 0 0", overflow:"hidden" }}>
              <Image src={modal.preview} alt={modal.title} fill style={{ objectFit:"cover", objectPosition:"top" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.5))", display:"flex", alignItems:"flex-end", padding:16 }}>
                <span style={{ fontSize:12, color:"#fff", fontWeight:600, background:"rgba(0,0,0,.5)", padding:"5px 12px", borderRadius:6 }}>🔍 Click to see full preview</span>
              </div>
              <button onClick={e => { e.stopPropagation(); setModal(null); }} style={{ position:"absolute", top:12, right:14, background:"rgba(0,0,0,.4)", border:"none", color:"#fff", width:30, height:30, borderRadius:"50%", cursor:"pointer", fontSize:14 }}>✕</button>
            </div>

            <div style={{ padding:28 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#c8923a", marginBottom:8 }}>{modal.niche}</div>
              <div className="serif" style={{ fontSize:24, fontWeight:700, marginBottom:10, lineHeight:1.2 }}>{modal.title}</div>

              {/* What's included */}
              <div style={{ background:"#f0ebe0", borderRadius:8, padding:16, marginBottom:20 }}>
                <div style={{ fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", color:"#7a7060", marginBottom:10 }}>What's Included</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                  {modal.includes.map(item => (
                    <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:6, fontSize:12, color:"#1a1a18" }}>
                      <span style={{ color:"#c8923a", fontWeight:700, flexShrink:0 }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                {modal.formats.split(" + ").map(f => (
                  <span key={f} style={{ fontSize:11, background:"#f0ebe0", color:"#1a1a18", padding:"5px 12px", borderRadius:4, fontWeight:500 }}>{f}</span>
                ))}
                <span style={{ fontSize:11, background:"#e8f5e9", color:"#2a4a35", padding:"5px 12px", borderRadius:4, fontWeight:500 }}>✓ Instant Download</span>
                <span style={{ fontSize:11, background:"#e8f5e9", color:"#2a4a35", padding:"5px 12px", borderRadius:4, fontWeight:500 }}>✓ Free Updates</span>
              </div>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <div className="serif" style={{ fontSize:38, fontWeight:700 }}>${modal.price}</div>
                  <div style={{ fontSize:11, color:"#7a7060" }}>One-time purchase · Yours forever</div>
                </div>
                <button onClick={() => handleModalAdd(modal)} className="btn-gold"
                  style={{ background:"#c8923a", color:"#fff", border:"none", padding:"14px 28px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
                  Add to Cart →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL PREVIEW LIGHTBOX */}
      {previewOpen && modal && (
        <div onClick={() => setPreviewOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.92)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:20, cursor:"zoom-out" }}>
          <button onClick={() => setPreviewOpen(false)} style={{ position:"absolute", top:20, right:20, background:"rgba(255,255,255,.15)", border:"none", color:"#fff", width:40, height:40, borderRadius:"50%", cursor:"pointer", fontSize:18 }}>✕</button>
          <div style={{ position:"relative", maxWidth:"90vw", maxHeight:"90vh", width:700 }}>
            <Image src={modal.preview} alt={modal.title} width={700} height={900} style={{ objectFit:"contain", borderRadius:8, maxHeight:"85vh", width:"auto" }} />
          </div>
          <div style={{ position:"absolute", bottom:20, left:"50%", transform:"translateX(-50%)", color:"rgba(255,255,255,.6)", fontSize:12 }}>Click anywhere to close</div>
        </div>
      )}
    </main>
  );
}