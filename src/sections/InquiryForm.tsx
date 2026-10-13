import { useId, useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import {
  BUDGET_RANGES,
  CONTACT_METHODS,
  DIAL_CODES,
  EVENT_TYPES,
  GUEST_RANGES,
} from '../data/content';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  dialCode: string;
  phone: string;
  eventType: string;
  location: string;
  date: string;
  functions: string;
  guests: string;
  budget: string;
  details: string;
  contactMethod: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  dialCode: '+91',
  phone: '',
  eventType: '',
  location: '',
  date: '',
  functions: '',
  guests: '',
  budget: '',
  details: '',
  contactMethod: 'Email',
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please tell us your name.';
  if (!f.email.trim()) e.email = 'An email lets us reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = 'That email doesn’t look quite right.';
  if (!f.phone.trim()) e.phone = 'A number helps us reach you.';
  else if (!/^[\d\s-]{6,15}$/.test(f.phone.trim()))
    e.phone = 'Enter a valid phone number.';
  if (!f.eventType) e.eventType = 'Which celebration is this?';
  if (!f.location.trim()) e.location = 'Where will it be held?';
  return e;
}

export default function InquiryForm() {
  const reduced = useReducedMotion();
  const uid = useId();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMsg, setServerMsg] = useState<string>('');

  // Configurable integration point. No secrets are ever embedded here — the
  // endpoint is injected at build time via an env var and the request carries
  // no keys. When unset, the form runs in preview mode (see note below).
  const endpoint = import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return; // guard duplicates

    const found = validate(form);
    if (Object.keys(found).length) {
      setErrors(found);
      // Move focus to the first invalid field for accessibility.
      const first = Object.keys(found)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus('submitting');
    setServerMsg('');

    const payload = {
      ...form,
      phone: `${form.dialCode} ${form.phone}`.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
      } else {
        // Preview mode: no live service is connected yet.
        await new Promise((r) => setTimeout(r, 900));
        setServerMsg(
          'Preview mode: this inquiry was validated but not sent — no submission service is connected yet.'
        );
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setServerMsg('Something went wrong sending your inquiry. Please try again, or email us directly.');
    }
  }

  return (
    <section id="inquiry" className="relative bg-charcoal py-24 text-ivory sm:py-32">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left column — invitation + assurances */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Start the Conversation"
            title="Plan your event"
            intro="Tell us a little about your celebration. We design a limited number of weddings each season so every couple has our full attention — share your vision and we'll be in touch."
            tone="light"
          />
          <ul className="flex flex-col gap-4 text-sm text-ivory/70">
            {[
              'A personal response, not an auto-reply.',
              'Design, decor, florals, staging and coordination under one roof.',
              'Destination and multi-day weddings welcome.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg className="mt-0.5 shrink-0 text-champagne" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8.5l3 3 7-8" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-ivory/45">
            <strong className="font-medium text-ivory/60">Privacy:</strong> your details are used
            only to respond to this inquiry and plan your event. We never sell or share them with
            third parties.
          </p>
        </div>

        {/* Right column — the form / success state */}
        <Reveal from="up" className="w-full">
          <div className="rounded-2xl bg-ivory p-6 text-charcoal shadow-2xl sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal text-champagne">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="display text-4xl">Thank you.</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-charcoal/70">
                    Your inquiry has reached us. We'll review the details of your celebration and
                    reply personally, usually within two working days.
                  </p>
                  {serverMsg && (
                    <p className="max-w-sm rounded-lg bg-sand/60 px-4 py-3 text-xs leading-relaxed text-charcoal/60">
                      {serverMsg}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY);
                      setErrors({});
                      setServerMsg('');
                      setStatus('idle');
                    }}
                    className="btn btn-ghost mt-2 text-charcoal"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field uid={uid} name="name" label="Full name" error={errors.name}>
                      <input
                        id={`${uid}-name`}
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        className={inputCls(!!errors.name)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                      />
                    </Field>

                    <Field uid={uid} name="email" label="Email address" error={errors.email}>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) => set('email', e.target.value)}
                        className={inputCls(!!errors.email)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                      />
                    </Field>
                  </div>

                  <Field uid={uid} name="phone" label="Phone number" error={errors.phone}>
                    <div className="flex gap-2">
                      <select
                        aria-label="Country dial code"
                        value={form.dialCode}
                        onChange={(e) => set('dialCode', e.target.value)}
                        className="w-28 shrink-0 cursor-pointer rounded-lg border border-clay/35 bg-white px-3 py-3 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                      >
                        {DIAL_CODES.map((d) => (
                          <option key={d.label} value={d.code}>
                            {d.label}
                          </option>
                        ))}
                      </select>
                      <input
                        id={`${uid}-phone`}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="98765 43210"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        className={`${inputCls(!!errors.phone)} min-w-0 flex-1`}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                      />
                    </div>
                  </Field>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field uid={uid} name="eventType" label="Event type" error={errors.eventType}>
                      <select
                        id={`${uid}-eventType`}
                        value={form.eventType}
                        onChange={(e) => set('eventType', e.target.value)}
                        className={selectCls(!!errors.eventType)}
                        aria-invalid={!!errors.eventType}
                        aria-describedby={errors.eventType ? `${uid}-eventType-err` : undefined}
                      >
                        <option value="" disabled>
                          Select…
                        </option>
                        {EVENT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field uid={uid} name="location" label="Location / destination" error={errors.location}>
                      <input
                        id={`${uid}-location`}
                        type="text"
                        placeholder="City or venue"
                        value={form.location}
                        onChange={(e) => set('location', e.target.value)}
                        className={inputCls(!!errors.location)}
                        aria-invalid={!!errors.location}
                        aria-describedby={errors.location ? `${uid}-location-err` : undefined}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field uid={uid} name="date" label="Tentative date" hint="Optional">
                      <input
                        id={`${uid}-date`}
                        type="date"
                        value={form.date}
                        onChange={(e) => set('date', e.target.value)}
                        className={inputCls(false)}
                      />
                    </Field>

                    <Field uid={uid} name="functions" label="Number of functions" hint="Optional">
                      <input
                        id={`${uid}-functions`}
                        type="number"
                        min={1}
                        max={20}
                        inputMode="numeric"
                        placeholder="e.g. 4"
                        value={form.functions}
                        onChange={(e) => set('functions', e.target.value)}
                        className={inputCls(false)}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field uid={uid} name="guests" label="Estimated guests" hint="Optional">
                      <select
                        id={`${uid}-guests`}
                        value={form.guests}
                        onChange={(e) => set('guests', e.target.value)}
                        className={selectCls(false)}
                      >
                        <option value="">Select…</option>
                        {GUEST_RANGES.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field uid={uid} name="budget" label="Budget range" hint="Optional">
                      <select
                        id={`${uid}-budget`}
                        value={form.budget}
                        onChange={(e) => set('budget', e.target.value)}
                        className={selectCls(false)}
                      >
                        <option value="">Select…</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field uid={uid} name="details" label="Tell us about your celebration" hint="Optional">
                    <textarea
                      id={`${uid}-details`}
                      rows={4}
                      placeholder="Your vision, themes, must-haves, anything on your mind…"
                      value={form.details}
                      onChange={(e) => set('details', e.target.value)}
                      className={`${inputCls(false)} resize-y`}
                    />
                  </Field>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="mb-1 text-xs uppercase tracking-wide2 text-charcoal/60">
                      Preferred contact method
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {CONTACT_METHODS.map((m) => {
                        const on = form.contactMethod === m;
                        return (
                          <label
                            key={m}
                            className={`cursor-pointer rounded-full border px-4 py-2 text-xs tracking-wide2 transition ${
                              on
                                ? 'border-ink bg-ink text-ivory'
                                : 'border-clay/40 text-charcoal/70 hover:border-ink'
                            }`}
                          >
                            <input
                              type="radio"
                              name="contactMethod"
                              value={m}
                              checked={on}
                              onChange={() => set('contactMethod', m)}
                              className="sr-only"
                            />
                            {m}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {status === 'error' && (
                    <p role="alert" className="rounded-lg bg-rose/15 px-4 py-3 text-sm text-rose">
                      {serverMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
                  </button>

                  {!endpoint && (
                    <p className="text-center text-[0.7rem] leading-relaxed text-charcoal/45">
                      Note: a submission service is not yet connected. The form validates and is
                      ready to post to an endpoint (set <code className="text-charcoal/60">VITE_INQUIRY_ENDPOINT</code>)
                      or email integration.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// --- Field primitives ---------------------------------------------------

function inputCls(invalid: boolean) {
  return `w-full rounded-lg border bg-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal/35 focus:border-gold focus:ring-2 focus:ring-gold/30 ${
    invalid ? 'border-rose' : 'border-clay/35'
  }`;
}

function selectCls(invalid: boolean) {
  // Keep the native disclosure arrow for accessibility and cross-platform fit.
  return `${inputCls(invalid)} cursor-pointer pr-9`;
}

function Field({
  uid,
  name,
  label,
  error,
  hint,
  children,
}: {
  uid: string;
  name: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`${uid}-${name}`} className="flex items-center justify-between text-xs uppercase tracking-wide2 text-charcoal/60">
        <span>{label}</span>
        {hint && <span className="text-[0.65rem] normal-case tracking-normal text-charcoal/35">{hint}</span>}
      </label>
      {children}
      {error && (
        <span id={`${uid}-${name}-err`} role="alert" className="text-xs text-rose">
          {error}
        </span>
      )}
    </div>
  );
}
