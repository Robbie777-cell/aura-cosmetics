"use client";
import { useState } from "react";

const QUESTIONS = [
  {
    id: "q1",
    tag: "Sobre ti",
    num: "01",
    text: "¿Cuántos años tienes?",
    type: "single",
    options: ["18 – 24 años", "25 – 34 años", "35 – 44 años", "45 años o más"],
  },
  {
    id: "q2",
    tag: "Intereses",
    num: "02",
    text: "¿Qué categorías te gustan más?",
    hint: "elige todas las que quieras",
    type: "multi",
    options: [
      "Maquillaje",
      "Skincare / Cuidado de piel",
      "Fragancias y perfumes",
      "Cuidado del cabello",
      "Nail art y uñas",
    ],
  },
  {
    id: "q3",
    tag: "Decisión de compra",
    num: "03",
    text: "¿Qué es lo más importante al comprar cosméticos online?",
    type: "single",
    options: [
      "Precio y ofertas",
      "Marca reconocida",
      "Reseñas y recomendaciones",
      "Envío rápido y seguro",
    ],
  },
  {
    id: "q4",
    tag: "Funcionalidades",
    num: "04",
    text: "¿Qué te gustaría tener en la app/web de AURA?",
    hint: "elige todas las que quieras",
    type: "multi",
    options: [
      "Tutoriales y rutinas de belleza",
      "Lista de favoritos",
      "Comparar productos",
      "Chat de asesoría personalizada",
      "Caja de suscripción mensual",
    ],
  },
  {
    id: "q5",
    tag: "Plataforma",
    num: "05",
    text: "¿Desde dónde prefieres comprar?",
    type: "single",
    options: [
      "App móvil (iOS / Android)",
      "Página web desde el computador",
      "Me da igual, uso ambas",
      "Por WhatsApp directamente",
    ],
  },
  {
    id: "q6",
    tag: "Tu voz",
    num: "06",
    text: "¿Qué producto o marca quisieras ver en AURA?",
    hint: "opcional",
    type: "text",
  },
];

export default function Encuesta() {
  const [step, setStep] = useState(0); // 0-5 = preguntas, 6 = gracias
  const [answers, setAnswers] = useState({});
  const [shake, setShake] = useState(false);

  const q = QUESTIONS[step];
  const total = QUESTIONS.length;

  function pickSingle(qid, val) {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
  }

  function toggleMulti(qid, val) {
    setAnswers((prev) => {
      const curr = prev[qid] || [];
      return {
        ...prev,
        [qid]: curr.includes(val) ? curr.filter((v) => v !== val) : [...curr, val],
      };
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

  function next() {
    if (!canProceed()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => s - 1);
  }

  const isDone = step >= total;

  return (
    <div style={styles.page}>
      {/* Ambient glows */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <a href="/" style={styles.logoWrap}>
            <span style={styles.logo}>AURA</span>
            <span style={styles.logoSub}>Cosmetics</span>
          </a>
          {!isDone && (
            <>
              <p style={styles.headerTitle}>¿Qué quieres ver en AURA?</p>
              <p style={styles.headerDesc}>
                Tu opinión construye la tienda de tus sueños · Solo 2 minutos 💄
              </p>
            </>
          )}
        </div>

        <div style={styles.body}>
          {!isDone ? (
            <>
              {/* Question */}
              <div style={{ ...(shake ? styles.shake : {}) }} key={q.id}>
                <p style={styles.qNum}>{q.num} / {String(total).padStart(2, "0")}</p>
                <p style={styles.qTag}>{q.tag}</p>
                <p style={styles.qText}>
                  {q.text}{" "}
                  {q.hint && <span style={styles.qHint}>({q.hint})</span>}
                </p>

                {q.type === "text" ? (
                  <textarea
                    style={styles.textarea}
                    rows={4}
                    placeholder="Ej: quiero ver Drunk Elephant, envíos express a Barranquilla..."
                    value={answers[q.id] || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                  />
                ) : (
                  <div style={styles.opts}>
                    {q.options.map((opt) => {
                      const sel = isSelected(q.id, opt);
                      return (
                        <div
                          key={opt}
                          style={{
                            ...styles.opt,
                            ...(sel ? styles.optSel : {}),
                          }}
                          onClick={() =>
                            q.type === "multi"
                              ? toggleMulti(q.id, opt)
                              : pickSingle(q.id, opt)
                          }
                        >
                          <div
                            style={{
                              ...styles.chk,
                              ...(q.type === "multi" ? styles.chkSq : {}),
                              ...(sel ? styles.chkSel : {}),
                            }}
                          >
                            {sel && <div style={styles.chkDot} />}
                          </div>
                          <span style={{ ...styles.optLbl, ...(sel ? styles.optLblSel : {}) }}>
                            {opt}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div style={styles.nav}>
                {/* Progress */}
                <div style={styles.progress}>
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.dot,
                        ...(i === step
                          ? styles.dotActive
                          : i < step
                          ? styles.dotDone
                          : {}),
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {step > 0 && (
                    <button style={styles.btnGhost} onClick={back}>
                      Atrás
                    </button>
                  )}
                  <button style={styles.btnPrimary} onClick={next}>
                    {step === total - 1 ? "Enviar" : "Siguiente"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Thank you */
            <div style={styles.thanks}>
              <div style={styles.thanksIcon}>✦</div>
              <p style={styles.thanksTitle}>¡Gracias, hermosa!</p>
              <p style={styles.thanksMsg}>
                Tus respuestas nos ayudan a traer exactamente lo que quieres.
                <br />
                Pronto te tenemos novedades en AURA 🌸
              </p>
              <div style={styles.summary}>
                <p style={styles.summaryTitle}>Resumen de tus respuestas</p>
                {QUESTIONS.map((q) => {
                  const v = answers[q.id];
                  const display = Array.isArray(v)
                    ? v.join(", ")
                    : v || "—";
                  return (
                    <div key={q.id} style={styles.summaryRow}>
                      <span style={styles.summaryKey}>{q.tag}</span>
                      <span style={styles.summaryVal}>{display}</span>
                    </div>
                  );
                })}
              </div>
              <a href="/" style={styles.btnPrimary}>
                Volver a AURA
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0608",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },
  glow1: {
    position: "fixed",
    top: -100,
    right: -100,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(210,120,140,0.10) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  glow2: {
    position: "fixed",
    bottom: -80,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(180,90,110,0.07) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    background: "rgba(20,10,14,0.95)",
    border: "1px solid rgba(210,120,140,0.15)",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    padding: "2.5rem 2rem 1.5rem",
    borderBottom: "1px solid rgba(210,120,140,0.12)",
  },
  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    marginBottom: "1rem",
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 30,
    letterSpacing: 10,
    color: "#e8b4bf",
    fontWeight: 600,
  },
  logoSub: {
    fontSize: 10,
    letterSpacing: 4,
    color: "rgba(232,180,191,0.45)",
    textTransform: "uppercase",
    marginTop: 2,
  },
  headerTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 19,
    color: "#f5e6e9",
    fontStyle: "italic",
    fontWeight: 400,
    margin: "0 0 6px",
  },
  headerDesc: {
    fontSize: 12,
    color: "rgba(245,230,233,0.45)",
    lineHeight: 1.6,
    margin: 0,
  },
  body: {
    padding: "2rem",
  },
  qNum: {
    fontSize: 10,
    color: "rgba(210,120,140,0.45)",
    letterSpacing: 1,
    marginBottom: 10,
  },
  qTag: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "rgba(210,120,140,0.65)",
    marginBottom: 8,
  },
  qText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 17,
    color: "#f5e6e9",
    marginBottom: "1.5rem",
    lineHeight: 1.5,
    fontWeight: 400,
  },
  qHint: {
    fontSize: 11,
    color: "rgba(245,230,233,0.3)",
    fontFamily: "'DM Sans', sans-serif",
    fontStyle: "normal",
  },
  opts: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  opt: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 18px",
    border: "1px solid rgba(210,120,140,0.18)",
    borderRadius: 10,
    cursor: "pointer",
    background: "rgba(255,255,255,0.02)",
    transition: "all 0.18s",
  },
  optSel: {
    borderColor: "rgba(210,120,140,0.65)",
    background: "rgba(210,120,140,0.09)",
  },
  chk: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "1.5px solid rgba(210,120,140,0.3)",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.18s",
  },
  chkSq: {
    borderRadius: 4,
  },
  chkSel: {
    background: "#d2788c",
    borderColor: "#d2788c",
  },
  chkDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#fff",
  },
  optLbl: {
    fontSize: 14,
    color: "rgba(245,230,233,0.75)",
    fontWeight: 300,
  },
  optLblSel: {
    color: "#f5e6e9",
    fontWeight: 400,
  },
  textarea: {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(210,120,140,0.18)",
    borderRadius: 10,
    padding: "14px 16px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "#f5e6e9",
    resize: "vertical",
    lineHeight: 1.6,
    outline: "none",
    boxSizing: "border-box",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid rgba(210,120,140,0.1)",
  },
  progress: {
    display: "flex",
    gap: 7,
    alignItems: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "rgba(210,120,140,0.2)",
    transition: "all 0.2s",
  },
  dotActive: {
    background: "#d2788c",
    width: 18,
    borderRadius: 3,
  },
  dotDone: {
    background: "rgba(210,120,140,0.45)",
  },
  btnPrimary: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    padding: "12px 26px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500,
    background: "linear-gradient(135deg, #c96880, #d2788c)",
    color: "#fff",
    border: "none",
    textDecoration: "none",
    display: "inline-block",
  },
  btnGhost: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    padding: "12px 22px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 400,
    background: "transparent",
    color: "rgba(245,230,233,0.4)",
    border: "1px solid rgba(210,120,140,0.2)",
  },
  shake: {
    animation: "shake 0.35s ease",
  },
  thanks: {
    textAlign: "center",
    padding: "1rem 0",
  },
  thanksIcon: {
    fontSize: 36,
    color: "#d2788c",
    marginBottom: "1rem",
  },
  thanksTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 24,
    color: "#e8b4bf",
    fontStyle: "italic",
    marginBottom: "0.75rem",
  },
  thanksMsg: {
    fontSize: 13,
    color: "rgba(245,230,233,0.5)",
    lineHeight: 1.7,
    marginBottom: "1.75rem",
  },
  summary: {
    background: "rgba(210,120,140,0.06)",
    border: "1px solid rgba(210,120,140,0.15)",
    borderRadius: 12,
    padding: "1.25rem",
    marginBottom: "1.5rem",
    textAlign: "left",
  },
  summaryTitle: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "rgba(210,120,140,0.6)",
    marginBottom: "1rem",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    padding: "6px 0",
    borderBottom: "1px solid rgba(210,120,140,0.08)",
    color: "rgba(245,230,233,0.4)",
    gap: 12,
  },
  summaryKey: {
    flexShrink: 0,
  },
  summaryVal: {
    color: "#e8b4bf",
    fontWeight: 500,
    textAlign: "right",
    fontSize: 11,
  },
};

