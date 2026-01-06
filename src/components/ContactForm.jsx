import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm({ translations, formId }) {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formId) {
      console.error("Formspree ID not found");
      return;
    }

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
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-[2rem] border border-white/5 bg-bg/40 backdrop-blur-2xl shadow-2xl flex flex-col gap-8 relative overflow-hidden group/form transition-all duration-500 hover:border-orange-500/20" aria-live="polite" aria-busy={status === 'submitting'}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none group-hover/form:bg-orange-500/10 transition-colors" />

      {/* Success/Error overlays for better feedback */}
      {status === 'success' && (
        <div role="status" className="absolute inset-0 bg-bg/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 text-center animate-modalEnter">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30">
            <CheckCircle className="w-10 h-10 text-green-500 animate-bounce" />
          </div>
          <h4 className="text-2xl font-black tracking-tighter mb-2">{translations.sent}</h4>
          <p className="text-zinc-500 text-sm font-light">Gracias por tu mensaje. Responderé pronto.</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-8 px-8 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-widest"
            type="button"
          >
            Cerrar
          </button>
        </div>
      )}

      <div className="relative group/input">
        <label htmlFor="name" className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${formData.name ? '-top-3 text-[10px] text-orange-500 bg-bg px-2 rounded-md font-black tracking-widest' : 'top-4 text-zinc-500 text-sm'}`}>
          {translations.name}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={formData.name ? "" : translations.namePlaceholder}
          className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-text placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-300 font-medium pt-5"
          aria-required="true"
        />
      </div>

      <div className="relative group/input">
        <label htmlFor="email" className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${formData.email ? '-top-3 text-[10px] text-orange-500 bg-bg px-2 rounded-md font-black tracking-widest' : 'top-4 text-zinc-500 text-sm'}`}>
          {translations.email}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={formData.email ? "" : translations.emailPlaceholder}
          className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-text placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all duration-300 font-medium pt-5"
        />
      </div>

      <div className="relative group/input">
        <label htmlFor="message" className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${formData.message ? '-top-3 text-[10px] text-orange-500 bg-bg px-2 rounded-md font-black tracking-widest' : 'top-4 text-zinc-500 text-sm'}`}>
          {translations.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder={formData.message ? "" : translations.messagePlaceholder}
          className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-text placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] resize-none transition-all duration-300 font-medium pt-5 min-h-[160px]"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group/btn relative w-full py-5 rounded-2xl font-black text-white bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)] transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0"
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
