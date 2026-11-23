import { useEffect, useRef, useState } from "react";
import { useLang, LANGS } from "../i18n";
import { Reveal } from "../components/Reveal";
import type { Route } from "../router";

type RoleId = "driver" | "courier" | "merchant" | "fleet";
type Step = "role" | "phone" | "code" | "personal" | "vehicle" | "company" | "docs" | "done";

const VEHICLE_ROLES: RoleId[] = ["driver", "courier"];
const COMPANY_ROLES: RoleId[] = ["merchant", "fleet"];

interface DocSlot { key: string; label: string; file: string | null; expiry: string; readable: boolean }

export function OnboardingPage({ navigate }: { navigate: (r: Route) => void }) {
  const { t, lang, setLang } = useLang();
  const j = t.join;
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<RoleId | null>(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);
  const [resends, setResends] = useState(0);
  const [form, setForm] = useState({ first: "", last: "", referral: "", fleetOwner: false, make: "", year: "", plate: "", color: "", entity: "company", reg: "", tax: "", vat: "no", holder: "", iban: "", swift: "" });
  const [docs, setDocs] = useState<DocSlot[]>([]);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  const pickRole = (r: RoleId) => { setRole(r); setStep("phone"); };

  const sendCode = () => {
    if (!phone.trim()) return;
    setResendIn(30);
    setStep("code");
  };

  const resend = () => {
    if (resends >= 3) { setCodeError(j.resendLimit); return; }
    setResends((r) => r + 1);
    setResendIn(30);
    setCodeError(null);
  };

  const verify = () => {
    if (code.replace(/\D/g, "").length === 6) {
      setCodeError(null);
      setStep("personal");
    } else {
      setCodeError(j.wrongCode);
    }
  };

  const docLabels = (): { key: string; label: string }[] => {
    const base = [
      { key: "idFront", label: j.docIdFront },
      { key: "idBack", label: j.docIdBack },
      { key: "bank", label: j.docBank },
    ];
    if (role === "driver" || role === "courier") base.push({ key: "license", label: j.docLicense });
    if (role === "merchant") base.push({ key: "hygiene", label: j.docHygiene });
    if (role === "fleet") base.push({ key: "vehicleReg", label: j.docVehicleRegistration });
    return base;
  };

  // (Re)build doc slots whenever the vehicle/company step is reached
  const enterDocs = () => {
    if (docs.length === 0) {
      setDocs(docLabels().map((d) => ({ ...d, file: null, expiry: "", readable: false })));
    }
    setStep("docs");
  };

  const setDoc = (key: string, patch: Partial<DocSlot>) =>
    setDocs((ds) => ds.map((d) => (d.key === key ? { ...d, ...patch } : d)));

  const onFile = (key: string, file: File | undefined) => {
    if (file) setDoc(key, { file: file.name });
  };

  const afterPersonal = () => setStep(role && VEHICLE_ROLES.includes(role) ? "vehicle" : "company");
  const afterVehicle = () => enterDocs();
  const afterCompany = () => enterDocs();

  const progressIdx = step === "done" ? j.steps.length : ["role", "phone", "code", "personal", "vehicle", "company", "docs"].indexOf(step) + 1;

  return (
    <section className="page-hero join-hero">
      <div className="container">
        <Reveal>
          <h1 className="display">{j.title}</h1>
          <p className="page-sub">{j.sub}</p>
        </Reveal>

        <div className="join-steps">
          {j.steps.map((s, i) => {
            const idx = i + 1;
            const active = progressIdx === idx;
            const done = progressIdx > idx || step === "done";
            const hidden = (i === 4 && role && COMPANY_ROLES.includes(role)) || (i === 5 && role && VEHICLE_ROLES.includes(role));
            if (hidden) return null;
            return <span key={s} className={`join-step${active ? " active" : ""}${done ? " done" : ""}`}>{s}</span>;
          })}
        </div>

        <div className="join-panel">
          {step === "role" && (
            <div className="join-body">
              <h2>{j.roleTitle}</h2>
              <div className="join-roles">
                {(["driver", "courier", "merchant", "fleet"] as RoleId[]).map((id) => {
                  const r = j.roles.find((x) => x.id === id)!;
                  return (
                    <button key={id} className="join-role" onClick={() => pickRole(id)}>
                      <img src={r.img} alt="" />
                      <strong>{r.title}</strong>
                      <span>{r.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "phone" && (
            <div className="join-body">
              <h2>{j.phoneTitle}</h2>
              <p className="join-sub">{j.phoneSub}</p>
              <label className="join-field">
                <span>{j.phoneTitle}</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={j.phonePlaceholder} inputMode="tel" dir="ltr" />
              </label>
              <div className="join-actions">
                <button className="btn btn-ghost" onClick={() => setStep("role")}>{j.back}</button>
                <button className="btn btn-primary" onClick={sendCode}>{j.sendCode}</button>
              </div>
            </div>
          )}

          {step === "code" && (
            <div className="join-body">
              <h2>{j.codeTitle}</h2>
              <p className="join-sub">{j.codeSub.replace("{phone}", phone)}</p>
              <label className="join-field">
                <input
                  value={code}
                  onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setCodeError(null); }}
                  placeholder={j.codePlaceholder}
                  inputMode="numeric"
                  maxLength={6}
                  dir="ltr"
                  className="join-code"
                />
              </label>
              {codeError && <p className="join-error">{codeError}</p>}
              <div className="join-actions">
                <button className="btn btn-ghost" onClick={resend} disabled={resendIn > 0}>
                  {resendIn > 0 ? j.resendIn.replace("{s}", String(resendIn)) : j.resend}
                </button>
                <button className="btn btn-primary" onClick={verify}>{j.verify}</button>
              </div>
            </div>
          )}

          {step === "personal" && (
            <div className="join-body">
              <h2>{j.personalTitle}</h2>
              <div className="join-grid">
                <label className="join-field"><span>{j.firstName}</span><input value={form.first} onChange={(e) => set("first", e.target.value)} /></label>
                <label className="join-field"><span>{j.lastName}</span><input value={form.last} onChange={(e) => set("last", e.target.value)} /></label>
                <label className="join-field">
                  <span>{j.language}</span>
                  <select value={lang} onChange={(e) => setLang(e.target.value as never)}>
                    {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                  </select>
                </label>
                <label className="join-field"><span>{j.referral}</span><input value={form.referral} onChange={(e) => set("referral", e.target.value)} dir="ltr" /></label>
              </div>
              <label className="join-check">
                <input type="checkbox" checked={form.fleetOwner} onChange={(e) => set("fleetOwner", e.target.checked)} />
                <span>{j.fleetOwner}</span>
              </label>
              <div className="join-actions">
                <button className="btn btn-ghost" onClick={() => setStep("code")}>{j.back}</button>
                <button className="btn btn-primary" onClick={afterPersonal} disabled={!form.first.trim() || !form.last.trim()}>{j.continue}</button>
              </div>
            </div>
          )}

          {step === "vehicle" && (
            <div className="join-body">
              <h2>{j.vehicleTitle}</h2>
              <div className="join-grid">
                <label className="join-field"><span>{j.make}</span><input value={form.make} onChange={(e) => set("make", e.target.value)} placeholder="Toyota / Lada / Hyundai…" /></label>
                <label className="join-field"><span>{j.year}</span><input value={form.year} onChange={(e) => set("year", e.target.value)} inputMode="numeric" placeholder="2020" /></label>
                <label className="join-field"><span>{j.plate}</span><input value={form.plate} onChange={(e) => set("plate", e.target.value)} placeholder="11-AA-123" dir="ltr" /></label>
                <label className="join-field"><span>{j.color}</span><input value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="White" /></label>
              </div>
              <div className="join-actions">
                <button className="btn btn-ghost" onClick={() => setStep("personal")}>{j.back}</button>
                <button className="btn btn-primary" onClick={afterVehicle} disabled={!form.make.trim() || !form.plate.trim()}>{j.continue}</button>
              </div>
            </div>
          )}

          {step === "company" && (
            <div className="join-body">
              <h2>{j.companyTitle}</h2>
              <div className="join-grid">
                <label className="join-field">
                  <span>{j.entityType}</span>
                  <select value={form.entity} onChange={(e) => set("entity", e.target.value)}>
                    <option value="company">{j.entityCompany}</option>
                    <option value="sole">{j.entitySole}</option>
                  </select>
                </label>
                <label className="join-field"><span>{j.regNumber}</span><input value={form.reg} onChange={(e) => set("reg", e.target.value)} dir="ltr" /></label>
                <label className="join-field"><span>{j.taxId}</span><input value={form.tax} onChange={(e) => set("tax", e.target.value)} dir="ltr" /></label>
                <label className="join-field">
                  <span>{j.vat}</span>
                  <select value={form.vat} onChange={(e) => set("vat", e.target.value)}>
                    <option value="no">{j.vatNo}</option>
                    <option value="yes">{j.vatYes}</option>
                  </select>
                </label>
                <label className="join-field"><span>{j.bankHolder}</span><input value={form.holder} onChange={(e) => set("holder", e.target.value)} /></label>
                <label className="join-field"><span>{j.iban}</span><input value={form.iban} onChange={(e) => set("iban", e.target.value)} dir="ltr" placeholder="AM00 0000 0000 0000 0000 0000" /></label>
                <label className="join-field"><span>{j.swift}</span><input value={form.swift} onChange={(e) => set("swift", e.target.value)} dir="ltr" /></label>
              </div>
              <div className="join-actions">
                <button className="btn btn-ghost" onClick={() => setStep("personal")}>{j.back}</button>
                <button className="btn btn-primary" onClick={afterCompany} disabled={!form.reg.trim() || !form.holder.trim() || !form.iban.trim()}>{j.continue}</button>
              </div>
            </div>
          )}

          {step === "docs" && (
            <div className="join-body">
              <h2>{j.docsTitle}</h2>
              <p className="join-sub">{j.docsSub}</p>
              <div className="join-docs">
                {docs.map((d) => (
                  <div className="join-doc" key={d.key}>
                    <strong>{d.label}</strong>
                    <input
                      ref={(el) => { fileRefs.current[d.key] = el; }}
                      type="file"
                      accept="image/*,.pdf"
                      hidden
                      onChange={(e) => onFile(d.key, e.target.files?.[0])}
                    />
                    <button type="button" className={`join-drop${d.file ? " has-file" : ""}`} onClick={() => fileRefs.current[d.key]?.click()}>
                      {d.file ?? j.dropzone}
                    </button>
                    <label className="join-field" style={{ marginTop: 10 }}>
                      <span>{j.expiry}</span>
                      <input type="date" value={d.expiry} onChange={(e) => setDoc(d.key, { expiry: e.target.value })} />
                    </label>
                    <label className="join-check">
                      <input type="checkbox" checked={d.readable} onChange={(e) => setDoc(d.key, { readable: e.target.checked })} />
                      <span>{j.readable}</span>
                    </label>
                  </div>
                ))}
              </div>
              <div className="join-actions">
                <button className="btn btn-ghost" onClick={() => setStep(role && VEHICLE_ROLES.includes(role) ? "vehicle" : "company")}>{j.back}</button>
                <button className="btn btn-primary" onClick={() => setStep("done")}>{j.submit}</button>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="join-body join-done">
              <div className="join-done-ic">✓</div>
              <h2>{j.doneTitle}</h2>
              <p className="join-sub">{j.doneText}</p>
              <div className="join-actions" style={{ justifyContent: "center" }}>
                <button className="btn btn-primary" onClick={() => navigate("/earn")}>{j.doneCta}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
