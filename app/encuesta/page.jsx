"use client";
import { useState, useEffect } from "react";

const QUESTIONS = [
  { id: "q1", tag: "Sobre ti", num: "01", text: "¿Cuántos años tienes?", type: "single", options: ["18 – 24 años", "25 – 34 años", "35 – 44 años", "45 años o más"] },
  { id: "q2", tag: "Intereses", num: "02", text: "¿Qué categorías te gustan más?", hint: "elige todas las que quieras", type: "multi", options: ["Maquillaje", "Skincare / Cuidado de piel", "Fragancias y perfumes", "Cuidado del cabello", "Nail art y uñas"] },
  { id: "q3", tag: "Decisión de compra", num: "03", text: "¿Qué es lo más importante al comprar cosméticos online?", type: "single", options: ["Precio y ofertas", "Marca reconocida", "Reseñas y recomendaciones", "Envío rápido y seguro"] },
  { id: "q4", tag: "Funcionalidades", num: "04", text: "¿Qué te gustaría tener en la app/web de AURA?", hint: "elige todas las que quieras", type: "multi", options: ["Tutoriales y rutinas de belleza", "Lista de favoritos", "Comparar productos", "Chat de asesoría personalizada", "Caja de suscripción mensual"] },
  { id: "q5", tag: "Plataforma", num: "05", text: "¿Desde dónde prefieres comprar?", type: "single", options: ["App móvil (iOS / Android)", "Página web desde el computador", "Me da igual, uso ambas", "Por WhatsApp directamente"] },
  { id: "q6", tag: "Tu voz", num: "06", text: "¿Qué producto o marca quisieras ver en AURA?", hint: "opcional", type: "text" },
];

const SERVICE_ID  = "service_fzhhoek";
const TEMPLATE_ID = "template_rjugw18";
const PUBLIC_KEY  = "1-NhcQ-SY7yolrACn";
const EMAILS = ["carolinamacias507@gmail.com", "robbieacp1016@gmail.com"];

function buildSummary(answers) {
  const labels = { q1: "Edad", q2: "Categorías", q3: "Prioridad", q4: "Funcionalidades", q5: "Plataforma", q6: "Sugerencia" };
  return QUESTIONS.map((q) => {
    const v = answers[q.id];
    const display = Array.isArray(v) ? v.join(", ") : v || "—";
    return `${labels[q.id]}: ${display}`;
  }).join("\n");
}

export default function Encuesta() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [shake, setShake] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailjsReady, setEmailjsReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/browser/emailjs.min.js";
    script.onload = () => {
      window.emailjs.init(PUBLIC_KEY);
      setEmailjsReady(true);
    };
    document.head.appendChild(script);
  }, []);

  const q = QUESTIONS[step];
  const total = QUESTIONS.length;
  const isDone = step >= total;

  function pickSingle(qid, val) { setAnswers((p) => ({ ...p, [qid]: val })); }
  function toggleMulti(qid, val) {
    setAnswers((p) => {
      const curr = p[qid] || [];
      return { ...p, [qid]: curr.includes(val) ? curr.filter((v) => v !== val) : [...curr, val] };
    });
  }
  function isSelected(qid, val) {
    const a = answers[qid];
    if (!a) return false;
    return Array.isArray(a) ? a.includes(val) : a === val;
  }
  function canProceed() {
    if (!q) return true;
    if (q.type === "text") return true;
    if (q.type === "multi") return (answers[q.id] || []).length > 0;
    return !!answers[q.id];
  }

  async function next() {
    if (!canProceed()) { setShake(true); setTimeout(() => setShake(false), 400); return; }
    if (step === total - 1) {
      const finalAnswers = { ...answers, q6: answers.q6 || "—" };
      setSending(true);
      const summary = buildSummary(finalAnswers);
      try {
        for (const email of EMAILS) {
          await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, { to_email: email, message: summary });
        }
      } catch (e) { console.error("EmailJS error:", e); }
      setSending(false);
      setStep(total);
    } else {
      setStep((s) => s + 1);
    }
  }

  function back() { setStep((s) => s - 1); }

  return (
    <div style={S.page}>
      <div style={S.glow1} /><div style={S.glow2} />
      <div style={S.card}>
        <div style={S.header}>
          <a href="/" style={S.logoWrap}>
            <span style={S.logo}>AURA</span>
            <span style={S.logoSub}>Cosmetics</span>
          </a>
          {!isDone && <>
            <p style={S.headerTitle}>¿Qué quieres ver en AURA?</p>
            <p style={S.headerDesc}>Tu opinión construye la tienda de tus sueños · Solo 2 minutos 💄</p>
          </>}
        </div>
        <div style={S.body}>
          {!isDone ? (
            <>
              <div style={shake ? { animation: "shake 0.35s ease" } : {}} key={q.id}>
                <p style={S.qNum}>{q.num} / {String(total).padStart(2, "0")}</p>
                <p style={S.qTag}>{q.tag}</p>
                <p style={S.qText}>{q.text} {q.hint && <span style={S.qHint}>({q.hint})</span>}</p>
                {q.type === "text" ? (
                  <textarea style={S.textarea} rows={4} placeholder="Ej: quiero ver Drunk Elephant, envíos express a Barranquilla..."
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((p) => ({ ...p, [q.id]: e.target.value }))} />
                ) : (
                  <div style={S.opts}>
                    {q.options.map((opt) => {
                      const sel = isSelected(q.id, opt);
                      return (
                        <div key={opt} style={{ ...S.opt, ...(sel ? S.optSel : {}) }}
                          onClick={() => q.type === "multi" ? toggleMulti(q.id, opt) : pickSingle(q.id, opt)}>
                          <div style={{ ...S.chk, ...(q.type === "multi" ? S.chkSq : {}), ...(sel ? S.chkSel : {}) }}>
                            {sel && <div style={S.chkDot} />}
                          </div>
                          <span style={{ ...S.optLbl, ...(sel ? S.optLblSel : {}) }}>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div style={S.nav}>
                <div style={S.progress}>
                  {QUESTIONS.map((_, i) => (
                    <div key={i} style={{ ...S.dot, ...(i === step ? S.dotActive : i < step ? S.dotDone : {}) }} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {step > 0 && <button style={S.btnGhost} onClick={back}>Atrás</button>}
                  <button style={S.btnPrimary} onClick={next} disabled={sending}>
                    {sending ? "Enviando..." : step === total - 1 ? "Enviar" : "Siguiente"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={S.thanks}>
              <div style={S.thanksIcon}>✦</div>
              <p style={S.thanksTitle}>¡Gracias, hermosa!</p>
              <p style={S.thanksMsg}>Tus respuestas nos ayudan a traer exactamente lo que quieres.<br />Pronto te tenemos novedades en AURA 🌸</p>
              <div style={S.summary}>
                <p style={S.summaryTitle}>Resumen de tus respuestas</p>
                {QUESTIONS.map((q) => {
                  const v = answers[q.id];
                  const display = Array.isArray(v) ? v.join(", ") : v || "—";
                  return (
                    <div key={q.id} style={S.summaryRow}>
                      <span style={S.summaryKey}>{q.tag}</span>
                      <span style={S.summaryVal}>{display}</span>
                    </div>
                  );
                })}
              </div>
              <a href="https://aura-cosmetics-mu.vercel.app" style={S.btnPrimary}>Volver a AURA</a>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }`}</style>
    </div>
  );
}

const S = {
  page: { minHeight:"100vh", background:"#0a0608", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem 1rem", position:"relative", overflow:"hidden", fontFamily:"'DM Sans',sans-serif" },
  glow1: { position:"fixed", top:-100, right:-100, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(210,120,140,0.10) 0%,transparent 70%)", pointerEvents:"none" },
  glow2: { position:"fixed", bottom:-80, left:-80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(180,90,110,0.07) 0%,transparent 70%)", pointerEvents:"none" },
  card: { width:"100%", maxWidth:520, background:"rgba(20,10,14,0.95)", border:"1px solid rgba(210,120,140,0.15)", borderRadius:20, overflow:"hidden", position:"relative", zIndex:1 },
  header: { textAlign:"center", padding:"2.5rem 2rem 1.5rem", borderBottom:"1px solid rgba(210,120,140,0.12)" },
  logoWrap: { display:"flex", flexDirection:"column", alignItems:"center", textDecoration:"none", marginBottom:"1rem" },
  logo: { fontFamily:"'Playfair Display',serif", fontSize:30, letterSpacing:10, color:"#e8b4bf", fontWeight:600 },
  logoSub: { fontSize:10, letterSpacing:4, color:"rgba(232,180,191,0.45)", textTransform:"uppercase", marginTop:2 },
  headerTitle: { fontFamily:"'Playfair Display',serif", fontSize:19, color:"#f5e6e9", fontStyle:"italic", fontWeight:400, margin:"0 0 6px" },
  headerDesc: { fontSize:12, color:"rgba(245,230,233,0.45)", lineHeight:1.6, margin:0 },
  body: { padding:"2rem" },
  qNum: { fontSize:10, color:"rgba(210,120,140,0.45)", letterSpacing:1, marginBottom:10 },
  qTag: { fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(210,120,140,0.65)", marginBottom:8 },
  qText: { fontFamily:"'Playfair Display',serif", fontSize:17, color:"#f5e6e9", marginBottom:"1.5rem", lineHeight:1.5, fontWeight:400 },
  qHint: { fontSize:11, color:"rgba(245,230,233,0.3)", fontFamily:"'DM Sans',sans-serif", fontStyle:"normal" },
  opts: { display:"flex", flexDirection:"column", gap:10 },
  opt: { display:"flex", alignItems:"center", gap:14, padding:"14px 18px", border:"1px solid rgba(210,120,140,0.18)", borderRadius:10, cursor:"pointer", background:"rgba(255,255,255,0.02)" },
  optSel: { borderColor:"rgba(210,120,140,0.65)", background:"rgba(210,120,140,0.09)" },
  chk: { width:18, height:18, borderRadius:"50%", border:"1.5px solid rgba(210,120,140,0.3)", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" },
  chkSq: { borderRadius:4 },
  chkSel: { background:"#d2788c", borderColor:"#d2788c" },
  chkDot: { width:7, height:7, borderRadius:"50%", background:"#fff" },
  optLbl: { fontSize:14, color:"rgba(245,230,233,0.75)", fontWeight:300 },
  optLblSel: { color:"#f5e6e9", fontWeight:400 },
  textarea: { width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(210,120,140,0.18)", borderRadius:10, padding:"14px 16px", fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#f5e6e9", resize:"vertical", lineHeight:1.6, outline:"none", boxSizing:"border-box" },
  nav: { display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"2rem", paddingTop:"1.5rem", borderTop:"1px solid rgba(210,120,140,0.1)" },
  progress: { display:"flex", gap:7, alignItems:"center" },
  dot: { width:5, height:5, borderRadius:"50%", background:"rgba(210,120,140,0.2)", transition:"all 0.2s" },
  dotActive: { background:"#d2788c", width:18, borderRadius:3 },
  dotDone: { background:"rgba(210,120,140,0.45)" },
  btnPrimary: { fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:2, textTransform:"uppercase", padding:"12px 26px", borderRadius:8, cursor:"pointer", fontWeight:500, background:"linear-gradient(135deg,#c96880,#d2788c)", color:"#fff", border:"none", textDecoration:"none", display:"inline-block" },
  btnGhost: { fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:2, textTransform:"uppercase", padding:"12px 22px", borderRadius:8, cursor:"pointer", fontWeight:400, background:"transparent", color:"rgba(245,230,233,0.4)", border:"1px solid rgba(210,120,140,0.2)" },
  thanks: { textAlign:"center", padding:"1rem 0" },
  thanksIcon: { fontSize:36, color:"#d2788c", marginBottom:"1rem" },
  thanksTitle: { fontFamily:"'Playfair Display',serif", fontSize:24, color:"#e8b4bf", fontStyle:"italic", marginBottom:"0.75rem" },
  thanksMsg: { fontSize:13, color:"rgba(245,230,233,0.5)", lineHeight:1.7, marginBottom:"1.75rem" },
  summary: { background:"rgba(210,120,140,0.06)", border:"1px solid rgba(210,120,140,0.15)", borderRadius:12, padding:"1.25rem", marginBottom:"1.5rem", textAlign:"left" },
  summaryTitle: { fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(210,120,140,0.6)", marginBottom:"1rem" },
  summaryRow: { display:"flex", justifyContent:"space-between", fontSize:12, padding:"6px 0", borderBottom:"1px solid rgba(210,120,140,0.08)", color:"rgba(245,230,233,0.4)", gap:12 },
  summaryKey: { flexShrink:0 },
  summaryVal: { color:"#e8b4bf", fontWeight:500, textAlign:"right", fontSize:11 },
};
