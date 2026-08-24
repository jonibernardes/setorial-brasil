import { Link } from "react-router-dom";

export default function Cabecalho({ direita }: { direita?: string }) {
  return (
    <div className="tarja">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center mono text-[11px] tracking-[.16em]"
           style={{ color: "var(--fraco)" }}>
        <Link to="/" className="hover:opacity-80">SETORIAL BRASIL</Link>
        <span>{direita || "ANÁLISE INDEPENDENTE DE SERVIÇOS"}</span>
        <span style={{ color: "var(--ambar)" }}>◆ BRASIL</span>
      </div>
    </div>
  );
}
