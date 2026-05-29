"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-[#080C14] text-white min-h-screen overflow-x-hidden">
      {/* FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&display=swap');
        :root {
          --serif: 'Instrument Serif', serif;
          --sans: 'Geist', sans-serif;
          --blue: #2D6FE8;
          --blue-light: #5B93FF;
          --slate: #0F1623;
          --border: rgba(255,255,255,0.07);
          --muted: #6B7A99;
        }
        * { font-family: var(--sans); }
        .serif { font-family: var(--serif); }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(45,111,232,0.15); }
          50% { box-shadow: 0 0 80px rgba(45,111,232,0.35); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        .anim-1 { animation: fadeUp 0.7s ease both; }
        .anim-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .anim-3 { animation: fadeUp 0.7s 0.3s ease both; }
        .anim-4 { animation: fadeUp 0.7s 0.45s ease both; }
        .float { animation: float 6s ease-in-out infinite; }
        .float-delay { animation: float 6s 2s ease-in-out infinite; }
        .glow-card { animation: pulse-glow 4s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #5B93FF 50%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .grid-bg {
          background-image:
            linear-gradient(rgba(45,111,232,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,111,232,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .feature-card:hover { background: rgba(45,111,232,0.06); border-color: rgba(45,111,232,0.3); }
        .feature-card { transition: all 0.3s ease; }
        .btn-primary:hover { background: #4080FF; transform: translateY(-1px); box-shadow: 0 8px 32px rgba(45,111,232,0.4); }
        .btn-primary { transition: all 0.2s ease; }
        .btn-ghost:hover { background: rgba(255,255,255,0.06); }
        .btn-ghost { transition: all 0.2s ease; }
        .pricing-card:hover { transform: translateY(-4px); }
        .pricing-card { transition: all 0.3s ease; }
        .nav-blur {
          background: rgba(8,12,20,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(45,111,232,0.6), transparent);
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 nav-blur border-b border-[var(--border)] transition-all duration-300 ${scrollY > 20 ? 'py-3' : 'py-4'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--blue)] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <span className="font-semibold text-[15px] tracking-tight">DocVault</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Security', 'Pricing', 'Docs'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[13px] text-[var(--muted)] hover:text-white transition-colors">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="btn-ghost text-[13px] px-4 py-2 rounded-lg text-[var(--muted)] hover:text-white">Sign in</a>
            <a href="/register" className="btn-primary bg-[var(--blue)] text-[13px] px-4 py-2 rounded-lg font-medium">Get started free</a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4">
            {['Features', 'Security', 'Pricing', 'Docs'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[14px] text-[var(--muted)]">{item}</a>
            ))}
            <a href="/register" className="btn-primary bg-[var(--blue)] text-[13px] px-4 py-2.5 rounded-lg font-medium text-center">Get started free</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center grid-bg pt-20">
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[var(--blue)] opacity-[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[#5B93FF] opacity-[0.05] blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="anim-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--blue)] border-opacity-40 bg-[rgba(45,111,232,0.08)] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue-light)] animate-pulse" />
              <span className="text-[12px] text-[var(--blue-light)] font-medium tracking-wide">HIPAA-conscious · Enterprise-ready</span>
            </div>

            <h1 className="anim-2 serif text-[52px] md:text-[64px] leading-[1.05] mb-6">
              Documents your team can{" "}
              <span className="gradient-text italic">trust with anything.</span>
            </h1>

            <p className="anim-3 text-[16px] text-[var(--muted)] leading-relaxed mb-10 max-w-lg">
              Secure document management with AI-powered intelligence. Upload, organize, share, and extract insights from any file — with enterprise-grade security built in.
            </p>

            <div className="anim-4 flex flex-col sm:flex-row gap-3">
              <a href="/register" className="btn-primary bg-[var(--blue)] px-6 py-3 rounded-xl font-medium text-[14px] text-center">
                Start free — no credit card
              </a>
              <a href="#features" className="btn-ghost border border-[var(--border)] px-6 py-3 rounded-xl text-[14px] text-[var(--muted)] hover:text-white text-center">
                See how it works →
              </a>
            </div>

            <div className="anim-4 flex items-center gap-6 mt-10">
              {[['10k+', 'Documents processed'], ['99.9%', 'Uptime SLA'], ['SOC2', 'Compliant']].map(([n, l]) => (
                <div key={n}>
                  <div className="text-[18px] font-semibold text-white">{n}</div>
                  <div className="text-[11px] text-[var(--muted)]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden md:block">
            <div className="float glow-card relative bg-[var(--slate)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl overflow-hidden">
              <div className="scan-line" />

              {/* Mock file list */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[13px] font-medium mb-0.5">My Documents</div>
                  <div className="text-[11px] text-[var(--muted)]">4 files · 2.3 GB used</div>
                </div>
                <div className="bg-[var(--blue)] text-[11px] px-3 py-1.5 rounded-lg font-medium">+ Upload</div>
              </div>

              {[
                { name: 'Q4_Financial_Report.pdf', size: '2.4 MB', type: 'PDF', color: '#E84040', ai: true },
                { name: 'Patient_Records_2024.xlsx', size: '890 KB', type: 'XLS', color: '#40B874', ai: false },
                { name: 'NDA_Template_v3.docx', size: '124 KB', type: 'DOC', color: '#2D6FE8', ai: true },
                { name: 'Radiology_Scan_001.tiff', size: '14.2 MB', type: 'IMG', color: '#9B59B6', ai: false },
              ].map((file, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl mb-2 ${i === 0 ? 'bg-[rgba(45,111,232,0.12)] border border-[rgba(45,111,232,0.2)]' : 'hover:bg-white/5'} transition-all cursor-pointer`}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ background: `${file.color}20`, color: file.color }}>
                    {file.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium truncate">{file.name}</div>
                    <div className="text-[10px] text-[var(--muted)]">{file.size}</div>
                  </div>
                  {file.ai && (
                    <div className="flex items-center gap-1 bg-[rgba(91,147,255,0.15)] px-2 py-0.5 rounded-full">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue-light)]" />
                      <span className="text-[9px] text-[var(--blue-light)]">AI</span>
                    </div>
                  )}
                </div>
              ))}

              {/* AI summary preview */}
              <div className="mt-4 p-3 bg-[rgba(45,111,232,0.08)] border border-[rgba(45,111,232,0.15)] rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded bg-[var(--blue)] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                  <span className="text-[11px] text-[var(--blue-light)] font-medium">AI Summary</span>
                </div>
                <p className="text-[11px] text-[var(--muted)] leading-relaxed">Revenue increased 23% YoY. Key risks identified in sections 4.2 and 7. Requires CFO signature by Dec 31.</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="float-delay absolute -bottom-4 -left-8 bg-[var(--slate)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[rgba(40,184,116,0.15)] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#40B874" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <div className="text-[11px] font-medium">End-to-end encrypted</div>
                  <div className="text-[10px] text-[var(--muted)]">AES-256 at rest</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-[var(--border)] py-10">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-[12px] text-[var(--muted)] mb-8 tracking-widest uppercase">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-40">
            {['Acme Health', 'Meridian Law', 'Blackrock Legal', 'Northstar Clinic', 'Atlas Finance'].map(name => (
              <span key={name} className="text-[14px] font-medium text-white tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-28 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-[11px] text-[var(--muted)] mb-5 tracking-widest uppercase">Features</div>
          <h2 className="serif text-[42px] md:text-[52px] leading-tight mb-4">
            Everything your team needs.<br />
            <span className="gradient-text italic">Nothing you don't.</span>
          </h2>
          <p className="text-[var(--muted)] text-[16px] max-w-xl mx-auto">Built for healthcare, legal, and finance teams who can't afford to compromise on security or efficiency.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: '⬆️', title: 'Smart Upload', desc: 'Drag & drop any file type. Bulk uploads, folder organization, automatic versioning, and instant preview generation.' },
            { icon: '🔒', title: 'Zero-Trust Security', desc: 'End-to-end encryption, signed URLs, audit logging, role-based access, and session management out of the box.' },
            { icon: '🤖', title: 'AI Document Intelligence', desc: 'Automatic summaries, key data extraction, smart tagging, and natural language search across all your documents.' },
            { icon: '👥', title: 'Team Collaboration', desc: 'Multi-tenant organizations, role-based permissions, secure sharing links, email invites, and download tracking.' },
            { icon: '🔍', title: 'Full-Text OCR Search', desc: 'Every document is indexed and searchable. Find anything in seconds with AI-powered semantic search.' },
            { icon: '📊', title: 'Analytics & Audit', desc: 'Complete audit trail of every action. Storage analytics, AI usage tracking, and compliance-ready reporting.' },
          ].map((f, i) => (
            <div key={i} className="feature-card border border-[var(--border)] rounded-2xl p-6 bg-[rgba(255,255,255,0.01)]">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-[15px] font-semibold mb-2">{f.title}</h3>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section id="security" className="py-24 border-y border-[var(--border)] bg-[var(--slate)]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-[11px] text-[var(--muted)] mb-6 tracking-widest uppercase">Security</div>
            <h2 className="serif text-[40px] leading-tight mb-6">Built for the most<br /><span className="gradient-text italic">sensitive documents.</span></h2>
            <p className="text-[15px] text-[var(--muted)] leading-relaxed mb-8">DocVault is architected with HIPAA-conscious patterns from day one — not bolted on after. Your documents are protected at every layer.</p>
            <div className="space-y-4">
              {[
                ['AES-256 Encryption', 'All files encrypted at rest and in transit'],
                ['Signed URLs', 'Time-limited, user-specific access links'],
                ['Full Audit Trail', 'Every action logged with IP and timestamp'],
                ['Role-Based Access', 'Granular permissions per user and team'],
                ['MFA Support', 'Multi-factor authentication ready'],
                ['Rate Limiting', 'API abuse protection built in'],
              ].map(([title, desc]) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[rgba(40,184,116,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#40B874" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-medium">{title}</div>
                    <div className="text-[12px] text-[var(--muted)]">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-[#080C14] border border-[var(--border)] rounded-2xl p-6 font-mono text-[12px]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="text-[var(--muted)] ml-2 text-[11px]">audit_log.json</span>
              </div>
              {[
                { action: 'FILE_UPLOADED', user: 'dr.chen@clinic.com', time: '2s ago', color: '#40B874' },
                { action: 'FILE_SHARED', user: 'admin@clinic.com', time: '1m ago', color: '#2D6FE8' },
                { action: 'FILE_VIEWED', user: 'jane.smith@clinic.com', time: '3m ago', color: '#5B93FF' },
                { action: 'SHARE_ACCESSED', user: 'external@partner.com', time: '5m ago', color: '#F39C12' },
                { action: 'AI_QUERY', user: 'dr.chen@clinic.com', time: '8m ago', color: '#9B59B6' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[var(--border)] last:border-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: log.color }} />
                  <span style={{ color: log.color }} className="flex-shrink-0">{log.action}</span>
                  <span className="text-[var(--muted)] truncate flex-1">{log.user}</span>
                  <span className="text-[var(--muted)] flex-shrink-0 text-[10px]">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-[11px] text-[var(--muted)] mb-5 tracking-widest uppercase">Pricing</div>
          <h2 className="serif text-[42px] leading-tight mb-4">Simple, transparent pricing.</h2>
          <p className="text-[var(--muted)] text-[16px]">14-day free trial. No credit card required.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Free', price: '$0', period: 'forever',
              desc: 'For individuals getting started.',
              features: ['5 GB storage', '3 team members', '10 AI requests/mo', 'Basic sharing', 'PDF preview'],
              cta: 'Get started free', highlight: false,
            },
            {
              name: 'Pro', price: '$29', period: 'per month',
              desc: 'For growing teams and practices.',
              features: ['100 GB storage', '25 team members', '500 AI requests/mo', 'Advanced sharing', 'OCR indexing', 'Priority support', 'Audit logs'],
              cta: 'Start free trial', highlight: true,
            },
            {
              name: 'Enterprise', price: 'Custom', period: 'contact us',
              desc: 'For large organizations with compliance needs.',
              features: ['1 TB+ storage', 'Unlimited members', '10,000+ AI requests', 'HIPAA BAA', 'SSO / SAML', 'Dedicated support', 'SLA guarantee'],
              cta: 'Contact sales', highlight: false,
            },
          ].map((plan) => (
            <div key={plan.name} className={`pricing-card rounded-2xl p-7 border ${plan.highlight ? 'border-[var(--blue)] bg-[rgba(45,111,232,0.06)]' : 'border-[var(--border)] bg-[rgba(255,255,255,0.01)]'} relative`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--blue)] text-[11px] font-semibold px-3 py-1 rounded-full">Most Popular</div>
              )}
              <div className="text-[13px] text-[var(--muted)] mb-1">{plan.name}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="serif text-[42px] leading-none">{plan.price}</span>
                <span className="text-[12px] text-[var(--muted)]">/{plan.period}</span>
              </div>
              <p className="text-[13px] text-[var(--muted)] mb-6">{plan.desc}</p>
              <a href="/register" className={`block text-center py-2.5 rounded-xl text-[13px] font-medium mb-6 transition-all ${plan.highlight ? 'btn-primary bg-[var(--blue)]' : 'btn-ghost border border-[var(--border)] hover:border-[var(--blue)] hover:text-[var(--blue-light)]'}`}>
                {plan.cta}
              </a>
              <div className="space-y-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-[13px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={plan.highlight ? '#5B93FF' : '#40B874'} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-[var(--muted)]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[var(--blue)] opacity-[0.08] blur-[100px] rounded-full" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="serif text-[48px] leading-tight mb-5">
            Ready to take control<br />
            <span className="gradient-text italic">of your documents?</span>
          </h2>
          <p className="text-[16px] text-[var(--muted)] mb-10">Join thousands of teams who trust DocVault with their most sensitive files.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/register" className="btn-primary bg-[var(--blue)] px-8 py-3.5 rounded-xl font-medium text-[14px]">
              Start free trial
            </a>
            <a href="#pricing" className="btn-ghost border border-[var(--border)] px-8 py-3.5 rounded-xl text-[14px] text-[var(--muted)] hover:text-white">
              View pricing
            </a>
          </div>
          <p className="text-[12px] text-[var(--muted)] mt-5">No credit card required · 14-day free trial · Cancel anytime</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[var(--blue)] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <span className="font-semibold text-[15px]">DocVault</span>
              </div>
              <p className="text-[13px] text-[var(--muted)] leading-relaxed max-w-xs">Secure document management with AI intelligence for healthcare, legal, and finance teams.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Security', 'Pricing', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'HIPAA', 'Security'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-[12px] font-semibold mb-4 tracking-widest uppercase text-[var(--muted)]">{col.title}</h4>
                <div className="space-y-3">
                  {col.links.map(link => (
                    <a key={link} href="#" className="block text-[13px] text-[var(--muted)] hover:text-white transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-[var(--muted)]">© 2026 DocVault. All rights reserved.</p>
            <p className="text-[12px] text-[var(--muted)]">Built with security first · HIPAA-conscious architecture</p>
          </div>
        </div>
      </footer>
    </main>
  );
}