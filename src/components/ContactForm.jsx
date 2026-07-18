import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm({ translations, formId }) {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });
  const [fieldError, setFieldError] = useState('');

  const isFormReady =
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.message.trim().length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formId) {
      console.error("Formspree ID not found");
      setStatus('error');
      return;
    }

    if (!isFormReady) {
      setFieldError(translations.validation || 'Revisa tu nombre, correo y mensaje antes de enviar.');
      return;
    }

    setFieldError('');
    setStatus('submitting');

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setFocused({ name: false, email: false, message: false });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
    if (fieldError) setFieldError('');
  };

  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: false });
  };

  const isFloating = (name) => formData[name] || focused[name];

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-2xl shadow-[var(--shadow-card)] flex flex-col gap-8 relative overflow-hidden group/form transition-all duration-500 hover:border-[var(--primary)]" aria-live="polite" aria-busy={status === 'submitting'}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--secondary-soft)] rounded-full blur-[110px] opacity-60 pointer-events-none transition-colors" />

      {/* Success/Error overlays for better feedback */}
      {status === 'success' && (
        <div role="status" className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 text-center animate-modalEnter">
          <div className="w-20 h-20 rounded-full bg-[var(--success-soft)] flex items-center justify-center mb-6 border border-[var(--success)]/30">
            <CheckCircle className="w-10 h-10 text-[var(--success)] animate-bounce" />
          </div>
          <h4 className="text-2xl font-black tracking-tighter mb-2 text-[var(--text-primary)]">{translations.sent}</h4>
          <p className="text-[var(--text-secondary)] text-sm font-medium">{translations.success || 'Gracias por tu mensaje. Responderé pronto.'}</p>
          <button
            onClick={() => setStatus('idle')}
            className="btn-secondary mt-8 px-8 py-2.5 rounded-xl transition-colors text-sm font-bold uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            type="button"
          >
            OK
          </button>
        </div>
      )}

      <div className="relative group/input">
        <label htmlFor="name" className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${isFloating('name') ? '-top-3 text-xs text-[var(--primary)] bg-[var(--surface-elevated)] px-2 rounded-md font-semibold' : 'top-4 text-[var(--text-secondary)] text-sm font-semibold'}`}>
          {translations.name}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          placeholder={focused.name ? translations.namePlaceholder : ""}
          className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-elevated)] p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] transition-all duration-300 font-medium pt-5"
          aria-required="true"
          minLength="2"
          autoComplete="name"
        />
      </div>

      <div className="relative group/input">
        <label htmlFor="email" className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${isFloating('email') ? '-top-3 text-xs text-[var(--primary)] bg-[var(--surface-elevated)] px-2 rounded-md font-semibold' : 'top-4 text-[var(--text-secondary)] text-sm font-semibold'}`}>
          {translations.email}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          autoComplete="email"
          placeholder={focused.email ? translations.emailPlaceholder : ""}
          className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-elevated)] p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] transition-all duration-300 font-medium pt-5"
        />
      </div>

      <div className="relative group/input">
        <label htmlFor="message" className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${isFloating('message') ? '-top-3 text-xs text-[var(--primary)] bg-[var(--surface-elevated)] px-2 rounded-md font-semibold' : 'top-4 text-[var(--text-secondary)] text-sm font-semibold'}`}>
          {translations.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
          minLength="10"
          placeholder={focused.message ? translations.messagePlaceholder : ""}
          className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--surface-elevated)] p-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)] resize-none transition-all duration-300 font-medium pt-5 min-h-[160px]"
        ></textarea>
      </div>

      {(fieldError || status === 'error') && (
        <p id="contact-form-feedback" className="rounded-xl border border-[var(--error)]/30 bg-[var(--error-soft)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)]" role="alert">
          {fieldError || translations.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-describedby={fieldError || status === 'error' ? 'contact-form-feedback' : undefined}
        className="btn-primary group/btn relative w-full py-5 rounded-xl font-black transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

        {status === 'idle' && (
          <>
            <span className="relative z-10 tracking-widest uppercase text-sm">{translations.send}</span>
            <Send className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </>
        )}
        {status === 'submitting' && (
          <Loader2 className="w-6 h-6 animate-spin relative z-10" />
        )}
        {status === 'error' && (
          <>
            <span className="relative z-10">{translations.error}</span>
            <AlertCircle className="w-6 h-6 relative z-10" />
          </>
        )}
      </button>
    </form>
  );
}
