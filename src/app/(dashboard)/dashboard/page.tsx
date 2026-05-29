"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState<Array<{ name: string; size: string; type: string; date: string }>>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#2D6FE8] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFiles(Array.from(e.dataTransfer.files));
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(Array.from(e.target.files || []));
  }

  function handleFiles(newFiles: File[]) {
    setUploading(true);
    setTimeout(() => {
      setFiles(prev => [...newFiles.map(f => ({
        name: f.name,
        size: f.size > 1024 * 1024 ? `${(f.size/1024/1024).toFixed(1)} MB` : `${(f.size/1024).toFixed(0)} KB`,
        type: f.name.split(".").pop()?.toUpperCase() || "FILE",
        date: "Just now",
      })), ...prev]);
      setUploading(false);
    }, 1200);
  }

  const typeColor: Record<string, string> = {
    PDF: "#E84040", DOCX: "#2D6FE8", DOC: "#2D6FE8",
    XLSX: "#40B874", XLS: "#40B874", PNG: "#9B59B6",
    JPG: "#9B59B6", JPEG: "#9B59B6", FILE: "#6B7A99",
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
        * { font-family: 'Geist', sans-serif; }
      `}</style>
      <div className="fixed left-0 top-0 bottom-0 w-56 bg-[#0F1623] border-r border-white/[0.07] flex flex-col p-4 z-10">
        <Link href="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="w-7 h-7 rounded-lg bg-[#2D6FE8] flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <span className="font-semibold text-[15px]">DocVault</span>
        </Link>
        <nav className="flex-1 space-y-1">
          {[{ icon: "⊞", label: "Dashboard", active: true }, { icon: "📁", label: "My Files", active: false }, { icon: "🔗", label: "Shared", active: false }, { icon: "⭐", label: "Starred", active: false }, { icon: "🗑️", label: "Trash", active: false }].map(item => (
            <div key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer text-[13px] transition-all ${item.active ? "bg-[#2D6FE8]/15 text-white" : "text-[#6B7A99] hover:bg-white/5 hover:text-white"}`}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
        </nav>
        <div className="border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#2D6FE8] flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium truncate">{session?.user?.name}</div>
              <div className="text-[10px] text-[#6B7A99] truncate">{session?.user?.email}</div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left px-3 py-2 rounded-xl text-[12px] text-[#6B7A99] hover:bg-white/5 hover:text-white transition-all">Sign out</button>
        </div>
      </div>
      <div className="ml-56 p-8">
        <div className="mb-8">
          <h1 className="text-[32px] font-semibold mb-1">Good to see you, {session?.user?.name?.split(" ")[0]} 👋</h1>
          <p className="text-[#6B7A99] text-[14px]">Upload and manage your documents securely.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[{ label: "Total Files", value: files.length.toString(), icon: "📄" }, { label: "Storage Used", value: "0 MB", icon: "💾" }, { label: "Shared Files", value: "0", icon: "🔗" }].map(stat => (
            <div key={stat.label} className="bg-[#0F1623] border border-white/[0.07] rounded-2xl p-5">
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-[28px] font-semibold mb-1">{stat.value}</div>
              <div className="text-[12px] text-[#6B7A99]">{stat.label}</div>
            </div>
          ))}
        </div>
        <div onDrop={handleDrop} onDragOver={e => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-2xl p-10 text-center mb-8 transition-all cursor-pointer ${dragOver ? "border-[#2D6FE8] bg-[#2D6FE8]/10" : "border-white/[0.1] hover:border-[#2D6FE8]/50"}`}
          onClick={() => document.getElementById("fileInput")?.click()}>
          <input id="fileInput" type="file" multiple className="hidden" onChange={handleFileInput} />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#2D6FE8] border-t-transparent rounded-full animate-spin" />
              <p className="text-[14px] text-[#6B7A99]">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2D6FE8]/15 flex items-center justify-center text-2xl">⬆️</div>
              <div>
                <p className="text-[15px] font-medium mb-1">Drop files here or click to upload</p>
                <p className="text-[13px] text-[#6B7A99]">PDF, DOCX, XLSX, PNG, JPG and more</p>
              </div>
            </div>
          )}
        </div>
        {files.length > 0 ? (
          <div className="bg-[#0F1623] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/[0.07] flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Recent Files</h2>
              <span className="text-[12px] text-[#6B7A99]">{files.length} file{files.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-all">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0" style={{ background: `${typeColor[file.type] || "#6B7A99"}20`, color: typeColor[file.type] || "#6B7A99" }}>{file.type}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium truncate">{file.name}</div>
                    <div className="text-[12px] text-[#6B7A99]">{file.size} · {file.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-[12px] text-[#6B7A99] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">Share</button>
                    <button className="text-[12px] text-[#6B7A99] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all">Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-[#6B7A99]">
            <div className="text-4xl mb-3">🗂️</div>
            <p className="text-[15px] font-medium text-white mb-1">No files yet</p>
            <p className="text-[13px]">Upload your first document above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}