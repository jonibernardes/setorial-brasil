import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SETORES, CATEGORIAS } from "../data/setores";
import Cabecalho from "../components/Cabecalho";

export default function Home() {
  const [busca, setBusca] = useState("");
  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return SETORES;
    return SETORES.filter((s) =>
      (s.titulo + " " + s.categoria + " " + s.resumo).toLowerCase().includes(q));
  }, [busca]);

  const publicados = SETORES.filter((s) => s.estado === "publicado").length;
  const empresas = SETORES.reduce((a, s) => a + s.rastreadas, 0);

  return (
    <>
      <Cabecalho />
      <header className="grade">
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-12">
          <h1 className="display uppercase text-[46px] md:text-[64px] leading-[1.02] m-0">
            Quem contratar,<br />
            <span style={{ color: "var(--ouro)" }}>sem apostar no escuro</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px]" style={{ color: "var(--fraco)" }}>
            Analisamos empresas setor por setor e publicamos a conta aberta: o que cada uma
            promete, o que dá para verificar no registro público e como ela responde quando
            algo dá errado.
          </p>

          <div className="mt-8 max-w-2xl">
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Que serviço você precisa contratar?"
              className="w-full painel rounded px-5 py-4 text-[16px] outline-none focus:border-[#3a4a5e]"
              style={{ color: "var(--texto)" }}
            />
            <div className="flex gap-2 flex-wrap mt-3">
              {["planilha", "site", "tráfego", "contabilidade", "mudança", "solar"].map((t) => (
                <button key={t} onClick={() => setBusca(t)}
                  className="chip mono text-[11px] tracking-[.08em] rounded px-3 py-1.5 hover:opacity-80"
                  style={{ color: "var(--fraco)" }}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mt-8">
            <span className="chip mono text-[11px] tracking-[.08em] rounded px-3 py-1.5" style={{ color: "var(--fraco)" }}>
              SETORES <b style={{ color: "var(--texto)" }}>{SETORES.length}</b>
            </span>
            <span className="chip mono text-[11px] tracking-[.08em] rounded px-3 py-1.5" style={{ color: "var(--fraco)" }}>
              DOSSIÊS PUBLICADOS <b style={{ color: "var(--texto)" }}>{publicados}</b>
            </span>
            <span className="chip mono text-[11px] tracking-[.08em] rounded px-3 py-1.5" style={{ color: "var(--fraco)" }}>
              EMPRESAS RASTREADAS <b style={{ color: "var(--texto)" }}>{empresas}</b>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {CATEGORIAS.map((cat) => {
          const doGrupo = filtrados.filter((s) => s.categoria === cat);
          if (!doGrupo.length) return null;
          return (
            <section key={cat}>
              <h2 className="display uppercase text-[20px] tracking-[.06em] flex items-center gap-3 mt-12 mb-4 h2linha">
                {cat}
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {doGrupo.map((s) => (
                  <Link key={s.slug} to={`/br/${s.slug}`}
                        className="painel rounded p-5 block hover:border-[#3a4a5e] transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="display text-[21px] m-0">{s.titulo}</h3>
                      {s.estado === "publicado" ? (
                        <span className="mono text-[10px] tracking-[.12em] px-2 py-1 rounded e-sim border">
                          {s.rastreadas} EMPRESAS
                        </span>
                      ) : (
                        <span className="mono text-[10px] tracking-[.12em] px-2 py-1 rounded border"
                              style={{ borderColor: "var(--linha)", color: "var(--fraco)" }}>
                          EM ANÁLISE
                        </span>
                      )}
                    </div>
                    <p className="text-[13.5px] mt-2 mb-0" style={{ color: "var(--fraco)" }}>{s.resumo}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {!filtrados.length && (
          <div className="painel rounded p-8 mt-12 text-center">
            <p className="display text-[20px] m-0">Ainda não cobrimos esse setor</p>
            <p className="text-[13.5px] mt-2 mb-0" style={{ color: "var(--fraco)" }}>
              Estamos abrindo dossiês novos toda semana. Tente outro termo, ou olhe a lista completa
              limpando a busca.
            </p>
          </div>
        )}

        <section className="painel rounded p-6 md:p-8 mt-14">
          <h2 className="display uppercase text-[19px] tracking-[.06em] m-0">Como avaliamos</h2>
          <p className="text-[13.5px] mt-2" style={{ color: "var(--fraco)" }}>
            A nota vai de 0 a 100 e é a soma de seis eixos, com peso declarado. Nenhum deles
            mede tamanho de empresa ou beleza de site.
          </p>
          <div className="grid gap-3 md:grid-cols-3 mt-5">
            {SETORES[0].eixos.map((e) => (
              <div key={e.nome} className="rounded p-4 border" style={{ borderColor: "var(--linha)" }}>
                <div className="flex justify-between items-baseline">
                  <strong className="text-[14px]">{e.nome}</strong>
                  <span className="display text-[19px]" style={{ color: "var(--ouro)" }}>{e.peso}</span>
                </div>
                <p className="text-[12.5px] mt-1 mb-0" style={{ color: "var(--fraco)" }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
