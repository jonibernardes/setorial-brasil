export default function Rodape() {
  return (
    <footer className="max-w-6xl mx-auto px-6 pb-16 pt-10">
      <div className="border-t pt-5 text-[12.5px]" style={{ borderColor: "var(--linha)", color: "var(--fraco)" }}>
        <p className="mb-2">
          <strong style={{ color: "var(--texto)" }}>Setorial Brasil</strong> reúne dados
          públicos para ajudar quem precisa contratar um serviço. Cada afirmação é cruzada em
          três fontes: o que a empresa declara, o registro público de CNPJ e a reputação em
          canal aberto.
        </p>
        <p>
          Nenhuma empresa paga para aparecer, e a posição não é negociável. Os dados podem
          mudar depois da coleta. Empresa que discordar de qualquer informação pode pedir
          correção, e o pedido fica registrado na página do setor.
        </p>
      </div>
    </footer>
  );
}
