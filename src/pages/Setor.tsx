import { useParams, Link } from "react-router-dom";
import { getSetor } from "../data/setores";
import Cabecalho from "../components/Cabecalho";

const corNota = (n: number) =>
  n >= 70 ? "var(--verde)" : n >= 45 ? "var(--ambar)" : "var(--vermelho)";
const corMedalha = ["var(--ouro)", "var(--prata)", "var(--bronze)"];
const rotulo = ["★ PRIMEIRO LUGAR", "◆ SEGUNDO LUGAR", "◆ TERCEIRO LUGAR"];

export default function Setor() {
  const { slug } = useParams();
  const s = getSetor(slug || "");

  if (!s) return (
    <>
      <Cabecalho />
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="display text-[26px]">Dossiê não encontrado</p>
        <Link to="/" className="mono text-[12px]" style={{ color: "var(--ouro)" }}>← VOLTAR</Link>
      </div>
    </>
  );

  if (s.estado === "em-analise") return (
    <>
      <Cabecalho direita={s.titulo.toUpperCase()} />
      <div className="grade">
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10">
          <h1 className="display uppercase text-[42px] leading-[1.05] m-0">{s.titulo}</h1>
          <p className="mt-3 max-w-2xl text-[15px]" style={{ color: "var(--fraco)" }}>{s.resumo}</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="painel rounded p-8">
          <div className="carimbo inline-block display text-[13px] tracking-[.2em] px-3 py-1.5 mb-4">
            DOSSIÊ EM ABERTO
          </div>
          <p className="text-[14.5px] m-0">
            Este setor já está na fila. Estamos rastreando as empresas, conferindo CNPJ em
            registro público e levantando reputação no Google e no Reclame Aqui.
          </p>
          <p className="text-[13.5px] mt-3 mb-0" style={{ color: "var(--fraco)" }}>
            Um dossiê só é publicado quando cada afirmação tiver sido confirmada em pelo menos
            duas fontes. Enquanto isso, ele fica aqui, aberto e sem nota.
          </p>
        </div>
        <Link to="/" className="mono text-[12px] inline-block mt-6" style={{ color: "var(--ouro)" }}>
          ← TODOS OS SETORES
        </Link>
      </div>
    </>
  );

  const podio = s.empresas.slice(0, 3);
  const ordemPodio = [1, 0, 2];

  return (
    <>
      <Cabecalho direita={s.titulo.toUpperCase()} />

      <div className="grade">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-11">
          <div className="mono text-[11px] tracking-[.16em] pb-2 mb-4 tarja flex justify-between"
               style={{ color: "var(--fraco)" }}>
            <span>DOSSIÊ SETORIAL</span><span>BRASIL · AGOSTO 2026</span>
            <span style={{ color: "var(--ambar)" }}>◆ ANÁLISE INDEPENDENTE</span>
          </div>
          <h1 className="display uppercase text-[46px] md:text-[58px] leading-[1.02] m-0">
            {s.titulo}
          </h1>
          <p className="mt-3 max-w-2xl text-[15px]" style={{ color: "var(--fraco)" }}>{s.resumo}</p>
          <div className="flex gap-2 flex-wrap mt-6">
            <span className="chip mono text-[11px] tracking-[.08em] rounded px-3 py-1.5" style={{ color: "var(--fraco)" }}>
              RASTREADAS <b style={{ color: "var(--texto)" }}>{s.rastreadas}</b></span>
            <span className="chip mono text-[11px] tracking-[.08em] rounded px-3 py-1.5" style={{ color: "var(--fraco)" }}>
              ANALISADAS <b style={{ color: "var(--texto)" }}>{s.analisadas}</b></span>
            <span className="chip mono text-[11px] tracking-[.08em] rounded px-3 py-1.5" style={{ color: "var(--fraco)" }}>
              FONTES CRUZADAS <b style={{ color: "var(--texto)" }}>3</b></span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 pb-4">
        {s.alertas.length > 0 && (
          <>
            <h2 className="display uppercase text-[22px] tracking-[.06em] flex items-center gap-3 mt-11 mb-1 h2linha">Alerta</h2>
            <p className="text-[13px] mb-4" style={{ color: "var(--fraco)" }}>
              Não é sobre nota baixa. É sobre risco de não ter para quem reclamar depois.
            </p>
            <div className="rounded p-6" style={{ border: "1px solid #40201f", background: "linear-gradient(180deg,rgba(224,82,79,.09),rgba(224,82,79,.02))" }}>
              <div className="carimbo inline-block display text-[13px] tracking-[.2em] px-3 py-1.5 mb-3">
                ATENÇÃO REDOBRADA
              </div>
              {s.alertas.map((a) => (
                <div key={a.nome} className="pl-4 my-5" style={{ borderLeft: "2px solid var(--vermelho)" }}>
                  <div className="display text-[19px] flex items-baseline gap-3">
                    {a.nome}
                    <span className="mono text-[12px] px-2 py-0.5 rounded"
                          style={{ color: "var(--vermelho)", border: "1px solid #40201f" }}>{a.nota} / 100</span>
                  </div>
                  <ul className="mt-2 mb-0 pl-4 text-[13.5px]" style={{ color: "#c3cedb" }}>
                    {a.pontos.map((p, i) => <li key={i} className="mb-1">{p}</li>)}
                  </ul>
                  {a.rodape && <p className="text-[12.5px] italic mt-2 mb-0" style={{ color: "var(--fraco)" }}>{a.rodape}</p>}
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="display uppercase text-[22px] tracking-[.06em] flex items-center gap-3 mt-12 mb-1 h2linha">Pódio</h2>
        <p className="text-[13px] mb-4" style={{ color: "var(--fraco)" }}>
          Pontuação de 0 a 100 em seis eixos, detalhados no fim do dossiê.
        </p>
        <div className="grid gap-3 md:grid-cols-[1fr_1.16fr_1fr] items-end">
          {ordemPodio.map((idx) => {
            const e = podio[idx]; if (!e) return null;
            const primeiro = idx === 0;
            return (
              <div key={e.nome} className="painel rounded relative overflow-hidden"
                   style={{ padding: primeiro ? "28px 18px 26px" : "20px 18px", borderColor: primeiro ? "#3a2f18" : "var(--linha)" }}>
                <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: corMedalha[idx] }} />
                <div className="display text-[12px] tracking-[.19em]" style={{ color: corMedalha[idx] }}>{rotulo[idx]}</div>
                <p className="display m-0 mt-2" style={{ fontSize: primeiro ? 27 : 23 }}>{e.nome}</p>
                <div className="mono text-[11px] mt-1 mb-3" style={{ color: "var(--fraco)" }}>
                  {e.local.toUpperCase()}{e.anos ? ` · ${e.anos} ANOS` : ""}{e.cnpj ? " · CNPJ ATIVO" : ""}
                </div>
                <div className="display leading-none" style={{ fontSize: primeiro ? 54 : 42, color: primeiro ? "var(--ouro)" : "var(--texto)" }}>
                  {e.nota}
                </div>
                <div className="mono text-[10px] tracking-[.14em]" style={{ color: "var(--fraco)" }}>DE 100</div>
              </div>
            );
          })}
        </div>

        <h2 className="display uppercase text-[22px] tracking-[.06em] flex items-center gap-3 mt-12 mb-1 h2linha">Fichas</h2>
        <p className="text-[13px] mb-4" style={{ color: "var(--fraco)" }}>
          Cada linha abaixo foi lida na fonte, não deduzida.
        </p>
        {s.empresas.map((e, i) => (
          <div key={e.nome} className="painel rounded mb-3 flex">
            <div className="w-14 flex-none flex items-center justify-center display text-[26px]"
                 style={{ borderRight: "1px solid var(--linha)", color: "var(--fraco)" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 px-5 py-4">
              <div className="flex justify-between gap-4 flex-wrap items-baseline">
                <div>
                  <p className="display text-[21px] m-0">{e.nome}</p>
                  <div className="mono text-[11px] mt-1" style={{ color: "var(--fraco)" }}>
                    {e.cnpj ? `CNPJ ${e.cnpj} · ` : ""}{e.local.toUpperCase()}
                  </div>
                </div>
                <div className="display text-[30px]" style={{ color: corNota(e.nota) }}>{e.nota}</div>
              </div>
              <div className="flex gap-2 flex-wrap my-3">
                {e.fontes.map((f) => (
                  <span key={f.rotulo}
                        className={`mono text-[11.5px] rounded px-2.5 py-1.5 border ${f.tom === "bom" ? "f-bom" : f.tom === "ruim" ? "f-ruim" : "f-vazio"}`}
                        style={{ borderColor: "var(--linha)", color: f.tom === "ruim" ? undefined : "var(--fraco)" }}>
                    {f.rotulo} · <b style={{ color: f.tom === "ruim" ? undefined : "var(--texto)" }}>{f.valor}</b>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {e.evidencias.map((ev, k) => (
                  <span key={k} className={`text-[12px] px-2.5 py-0.5 rounded border ${ev.tom === "sim" ? "e-sim" : ev.tom === "nao" ? "e-nao" : "e-aviso"}`}>
                    {ev.texto}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {s.precos && (
          <>
            <h2 className="display uppercase text-[22px] tracking-[.06em] flex items-center gap-3 mt-12 mb-1 h2linha">Quanto custa</h2>
            <p className="text-[13px] mb-4" style={{ color: "var(--fraco)" }}>
              Quem declara valor em algum lugar do site. As demais só informam sob consulta.
            </p>
            <div className="painel rounded overflow-hidden">
              <table className="w-full mono text-[12px]">
                <thead><tr style={{ background: "#0e141c" }}>
                  {["Empresa", "Ponto de partida", "Faixa declarada", "Prazo"].map((h) => (
                    <th key={h} className="text-left px-2.5 py-2.5 text-[10.5px] tracking-[.11em] uppercase"
                        style={{ color: "var(--fraco)", borderBottom: "1px solid var(--linha)" }}>{h}</th>))}
                </tr></thead>
                <tbody>
                  {s.precos.map((p) => (
                    <tr key={p.empresa}>
                      <td className="px-2.5 py-2.5" style={{ borderBottom: "1px solid rgba(30,39,51,.55)" }}>{p.empresa}</td>
                      <td className="px-2.5 py-2.5 text-center" style={{ borderBottom: "1px solid rgba(30,39,51,.55)" }}>{p.partida}</td>
                      <td className="px-2.5 py-2.5 text-center" style={{ borderBottom: "1px solid rgba(30,39,51,.55)" }}>{p.faixa}</td>
                      <td className="px-2.5 py-2.5 text-center" style={{ borderBottom: "1px solid rgba(30,39,51,.55)" }}>{p.prazo}</td>
                    </tr>))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {s.fora && (
          <>
            <h2 className="display uppercase text-[22px] tracking-[.06em] flex items-center gap-3 mt-12 mb-1 h2linha">Fora do dossiê</h2>
            <p className="text-[13px] mb-4" style={{ color: "var(--fraco)" }}>
              Empresas rastreadas que não entram neste ranking, e o motivo.
            </p>
            <div className="painel rounded p-5 text-[13.5px]">
              <ul className="m-0 pl-4" style={{ color: "#b8c4d2" }}>
                {s.fora.map((f) => (
                  <li key={f.nome} className="mb-2"><strong style={{ color: "var(--texto)" }}>{f.nome}</strong> — {f.motivo}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        <h2 className="display uppercase text-[22px] tracking-[.06em] flex items-center gap-3 mt-12 mb-1 h2linha">Como a nota é calculada</h2>
        <p className="text-[13px] mb-4" style={{ color: "var(--fraco)" }}>A fórmula é pública e a mesma para todas.</p>
        <div className="painel rounded p-5 md:p-6">
          {s.eixos.map((e) => (
            <div key={e.nome} className="flex justify-between items-start gap-6 py-2.5"
                 style={{ borderBottom: "1px solid rgba(30,39,51,.5)" }}>
              <div>
                <strong className="text-[13.5px]">{e.nome}</strong>
                <p className="text-[12.5px] m-0" style={{ color: "var(--fraco)" }}>{e.desc}</p>
              </div>
              <span className="display text-[17px] flex-none" style={{ color: "var(--ouro)" }}>{e.peso}</span>
            </div>
          ))}
        </div>

        <Link to="/" className="mono text-[12px] inline-block mt-8" style={{ color: "var(--ouro)" }}>
          ← TODOS OS SETORES
        </Link>
      </main>
    </>
  );
}
