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
        setTimeout(() => setStatus('idle'), 5000);
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
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-text/10 bg-bg/50 backdrop-blur-md shadow-xl flex flex-col gap-6 relative overflow-hidden group" aria-live="polite" aria-busy={status === 'submitting'}>
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Mensaje de estado accesible */}
        {status === 'success' && (
          <div role="status" aria-live="assertive" className="absolute top-2 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg z-10 animate-fade-in">
            {translations.sent}
          </div>
        )}
        {status === 'error' && (
          <div role="alert" aria-live="assertive" className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg z-10 animate-fade-in">
            {translations.error}
          </div>
        )}

        <div className="relative space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-accent ml-1">
            {translations.name}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={translations.namePlaceholder}
            className="w-full rounded-xl border border-text/10 bg-bg/50 p-4 text-text placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
            aria-required="true"
          />
        </div>

      <div className="relative space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-accent ml-1">
          {translations.email}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={translations.emailPlaceholder}
          className="w-full rounded-xl border border-text/10 bg-bg/50 p-4 text-text placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
        />
      </div>

      <div className="relative space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-accent ml-1">
          {translations.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder={translations.messagePlaceholder}
          className="w-full rounded-xl border border-text/10 bg-bg/50 p-4 text-text placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y transition-all duration-300 min-h-[120px]"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className={`
          relative w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden
          ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-accent hover:bg-accent-light hover:scale-[1.02]'}
          ${status === 'error' ? 'bg-red-500 hover:bg-red-600' : ''}
          disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100
        `}
      >
        {status === 'idle' && (
          <>
            {translations.send} <Send className="w-5 h-5" />
          </>
        )}
        {status === 'submitting' && (
          <Loader2 className="w-6 h-6 animate-spin" />
        )}
        {status === 'success' && (
          <>
            {translations.sent} <CheckCircle className="w-6 h-6" />
          </>
        )}
        {status === 'error' && (
          <>
            {translations.error} <AlertCircle className="w-6 h-6" />
          </>
        )}
      </button>
    </form>
  );
}
