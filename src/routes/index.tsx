import { createFileRoute } from "@tanstack/react-router";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import fascia from "@/assets/fascia.webp";
import logo from "@/assets/logo.webp";
import fundoHero from "@/assets/fundo-hero.webp";
import drMauroHero from "@/assets/dr-mauro-hero.webp";
import drMauro from "@/assets/dr-mauro-hero-old.webp";
import coluna from "@/assets/coluna.webp";
import dorLombar from "@/assets/dor-lombar.webp";

const PHONE = "(17) 99666-4636";
const wa = (msg: string) => `https://wa.me/5517996664636?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = wa("Olá, Dr. Mauro! Vi o site do THTC e quero agendar minha consulta.");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alívio da dor com THTC | Dr. Mauro Pedrin" },
      {
        name: "description",
        content:
          "Conheça o THTC, abordagem voltada à fáscia e ao tecido conjuntivo, com o Dr. Mauro Pedrin em São José do Rio Preto – SP. Agende sua consulta.",
      },
      { property: "og:title", content: "THTC com Dr. Mauro Pedrin | São José do Rio Preto" },
      {
        property: "og:description",
        content:
          "Terapia de Hidratação do Tecido Conjuntivo em São José do Rio Preto – SP. Agende pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Cta({
  label,
  msg,
  big,
  whatsapp,
}: {
  label?: string;
  msg?: string | undefined;
  big?: boolean;
  whatsapp?: boolean;
}) {
  label ??= "Agendar uma consulta";
  const href = whatsapp ? (msg ? wa(msg) : WA_DEFAULT) : "#oferta";
  return (
    <a
      href={href}
      {...(whatsapp ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`pulse-cta inline-flex flex-wrap items-center justify-center gap-x-2 rounded-full bg-whatsapp font-semibold text-primary-foreground transition hover:brightness-110 ${big ? "w-full px-8 py-4 text-lg sm:w-auto" : "px-6 py-3"}`}
    >
      {label}
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} data-fade className={`px-5 py-14 md:py-28 ${className}`}>
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

const REELS: string[] = ["DdREjd4p09a", "DetluUktWXt", "DfKiKpPtJXE"];

const TESTIMONIALS = [
  "Dificuldade para andar devido a dor nos joelhos",
  "Dores nas costas que já duram anos",
  "Não consegue se movimentar com leveza",
  "Não dorme a noite devido a fibromialgia",
];

const FAQ = [
  [
    "Onde o Dr Mauro atende?",
    "Em São José do Rio Preto – SP. Chame no WhatsApp para receber endereço e horários.",
  ],
  [
    "Esse procedimento dói?",
    "Não. Além disso, a aplicação é rápida e bem tolerada. O Dr. Mauro explica cada etapa antes de começar.",
  ],
  [
    "Quanto custa cada sessão?",
    "A consulta inicial com a primeira aplicação sai por R$ 570. Para os valores das sessões seguintes, chame no WhatsApp.",
  ],
  [
    "Quantas sessões eu tenho que fazer?",
    "Depende de cada caso. Cada pessoa responde de um jeito, e o Dr. Mauro define o plano na consulta.",
  ],
  [
    "Tenho que pagar pelos cremes?",
    "Não. Todos os cremes e loções usados no tratamento estão inclusos gratuitamente.",
  ],
];

function Index() {
  useScrollFade();
  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      {/* 1. Topo (promessa) */}
      <section
        className="relative flex min-h-[80vh] items-end bg-cover bg-center px-5 pt-10 md:pt-16 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(color-mix(in oklab, var(--background) 80%, transparent), color-mix(in oklab, var(--background) 80%, transparent)), url(${fundoHero})`,
        }}
      >
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-end md:grid-cols-2 md:justify-items-end">
          <div className="hero-fade pb-8 md:pb-16">
            <img
              src={logo}
              alt="Logo THTC – Dr. Mauro Pedrin"
              className="mb-6 h-24 w-auto md:h-28"
            />
            <h1 className="text-3xl font-bold leading-[1.2] md:text-5xl">
              Uma nova abordagem para o alívio das dores
            </h1>
            <p className="mt-6 text-lg leading-relaxed md:text-xl">
              Não deixe a sua dor limitar a sua vida. Ajudo pessoas de todas as idades a aliviar
              dores nas costas, joelhos, fibromialgia e outras condições crônicas.
            </p>
            <p className="mt-4 text-lg mb-8">
              Atendimento presencial em São José do Rio Preto - SP
            </p>
            <div>
              <Cta big />
            </div>
          </div>

          <img
            src={drMauroHero}
            alt="Dr. Mauro Pedrin, médico, sorrindo de jaleco e luvas"
            className="hero-fade hero-fade-image mx-auto w-full max-w-sm self-end rounded-3xl object-cover -mb-3 md:mx-0 md:max-w-lg"
          />
        </div>
      </section>

      {/* 2. A dor */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-20 md:justify-items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold md:text-4xl leading-[1.2]">
              Eu sei que você tem alguma dor que te incomoda
            </h2>
            <p className="mt-6 text-lg leading-relaxed md:text-xl">
              Dores nas costas, joelhos e outras articulações já fazem parte do nosso cotidiano.
              Conforme ganhamos idade, essas dores começam a nos incomodar cada vez mais durante o
              dia-a-dia, até o momento em que surgem as limitações por causa delas.
            </p>
            <p className="mt-6 text-lg leading-relaxed md:text-xl">
              Essa dor tem tratamento e você não precisa lidar com ela para sempre.
            </p>
          </div>

          <img
            src={coluna}
            alt="Homem de costas com a coluna vertebral destacada em vermelho, indicando dor nas costas"
            className="h-72 w-full rounded-3xl object-cover md:h-[30rem] md:w-auto"
          />
        </div>
      </Section>

      {/* 3. Transformação */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <img
            src={drMauro}
            alt="Dr. Mauro Pedrin com os três cremes THTC sobre a mesa"
            width={1280}
            height={896}
            loading="lazy"
            className="mx-auto max-md:order-last w-full max-w-sm object-cover md:max-w-md rounded-xl"
          />
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Eu posso te ajudar com isso</h2>
            <p className="mt-5 text-lg text-muted-foreground">Eu sou o Dr. Mauro Pedrin.</p>
            <p className="mt-5 text-lg text-muted-foreground">
              Sou médico desde 1974. Fui pediatra durante 15 anos e professor de acupuntura durante
              25 anos na Faculdade de Medicina de São José do Rio Preto. No total, são 52 anos de
              experiência na área médica.
            </p>
            <p className="mt-5 mb-8 text-lg text-muted-foreground">
              Hoje atuo em minha clínica própria, ajudando os meus pacientes sentirem alívio das dores
              utilizando a prática da Terapia de Hidratação dos Tecidos Conjuntivos, a THTC.
            </p>
            <Cta big />
          </div>
        </div>
      </Section>

      {/* 4. Oportunidade + 6. Produto */}
      <Section className="bg-secondary">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">O que é a THTC?</h2>
            <p className="mt-5 text-lg">
              A Terapia de Hidratação dos Tecidos Conjuntivos (THTC) é uma abordagem terapêutica
              manual e não invasiva, recomendada para promover o alívio de dores, tensões musculares
              e limitações de movimento.{" "}
            </p>

            <p className="mt-5 text-lg">
              A saúde desse tecido está relacionada à mobilidade e ao conforto do corpo.
            </p>
          </div>
          <img
            src={fascia}
            alt="Imagem ampliada de fibras do tecido conjuntivo hidratadas"
            width={1280}
            height={896}
            loading="lazy"
            className="rounded-[2rem] object-cover shadow-soft"
          />
        </div>
      </Section>

      {/* 5. Prova */}
      <Section className="bg-muted">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <img
            src={dorLombar}
            alt="Mulher idosa sentada na cama com a mão na lombar, sentindo dor"
            loading="lazy"
            className="mx-auto max-md:order-last w-full max-w-md rounded-3xl object-cover md:max-w-xl"
          />
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">Essa terapia funciona comigo?</h2>
            <p className="mt-5 text-lg">Se você apresenta alguma dessas características:</p>

            <ul className="mt-8 space-y-4 text-lg md:text-xl">
              {TESTIMONIALS.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg mb-8">Eu posso te ajudar usando THTC.</p>
            <Cta big />
          </div>
        </div>
      </Section>

      {/* 7. O que recebe */}
      <Section className="bg-secondary">
        <h2 className="text-3xl font-semibold md:text-4xl">Por que esse método vale a pena?</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
          {[
            [
              "⚡",
              "Resultado rápido",
              "O alívio da dor já vem durante a sessão, em poucos minutos.",
            ],
            [
              "🤲",
              "Não invasiva",
              "Não há cortes ou inserção de instrumentos internos durante o procedimento.",
            ],
            ["🎯", "Age na raiz da dor", "Sem rodeios, vamos direto ao ponto onde a dor surge."],
            [
              "⏱️",
              "Sessões curtas",
              "Em menos de uma hora você sente o alívio e passa o resto do dia melhor.",
            ],
          ].map(([i, t, d]) => (
            <div key={t} className="rounded-3xl bg-card p-7">
              <p className="text-4xl">{i}</p>
              <h3 className="mt-4 text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Depoimentos */}
      <Section id="depoimentos">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Vários pacientes aprovam a THTC
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REELS.map((id, i) => (
            <iframe
              key={id}
              src={`https://www.instagram.com/reel/${id}/embed`}
              title={`Depoimento de paciente ${i + 1}`}
              loading="lazy"
              className="aspect-[9/16] w-full rounded-3xl bg-card"
            />
          ))}
        </div>
      </Section>

      {/* Oferta */}
      <Section id="oferta" className="bg-white">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-primary p-6 text-center sm:p-8 md:p-12">
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Consulta inicial + primeira aplicação
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            De <span className="line-through">R$ 850</span> por apenas
          </p>
          <p className="mt-1 text-6xl font-bold text-primary md:text-7xl">R$ 570</p>
          <p className="mt-5 text-lg">Agende agora e garanta seu tratamento!</p>
          <p className="mt-5 text-lg">Atendimento presencial em São José do Rio Preto – SP</p>

          <div className="mt-8">
            <Cta big whatsapp msg="Olá, Dr. Mauro! Quero agendar uma consulta inicial." />
          </div>
        </div>
      </Section>

      {/* 12. Objeções */}
      <Section className="bg-muted">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">Dúvidas frequentes</h2>
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group rounded-2xl bg-card p-5">
              <summary className="cursor-pointer list-none text-lg font-semibold">
                {q} <span className="float-right text-primary group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <footer className="px-5 py-10 text-center text-sm text-muted-foreground">
        Dr. Mauro Pedrin · CRM 22699 · São José do Rio Preto – SP · {PHONE}
      </footer>

      {/* Botão flutuante */}
      {/* <a
        href="#oferta"
        aria-label="Ver oferta e agendar"
        title="Ver oferta"
        className="pulse-cta fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-whatsapp shadow-soft"
      >
        <WhatsAppIcon className="h-8 w-8 text-white" />
      </a> */}
    </main>
  );
}
