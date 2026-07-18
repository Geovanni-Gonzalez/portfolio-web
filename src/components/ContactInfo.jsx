import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo({ contactInfo, lang = "es" }) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  const t = {
    copy: lang === "es" ? "Copiar" : "Copy",
    copied: lang === "es" ? "copiado" : "copied",
    copyError:
      lang === "es"
        ? "No se pudo copiar. Selecciona el dato manualmente."
        : "Could not copy. Please select the text manually.",
  };

  const items = [
    {
      icon: Mail,
      label: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      copyValue: contactInfo.email,
    },
    {
      icon: Phone,
      label: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s+/g, "")}`,
      copyValue: contactInfo.phone,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: contactInfo.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      href: contactInfo.github,
      external: true,
    },
    {
      icon: MapPin,
      label: contactInfo.location,
    },
  ];

  const handleCopy = async (item, index, event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.copyValue);
      setCopiedIndex(index);
      setCopyStatus(`${item.label} ${t.copied}`);
    } catch (error) {
      setCopyStatus(t.copyError);
    }
    setTimeout(() => {
      setCopiedIndex(null);
      setCopyStatus("");
    }, 2200);
  };

  const rowClasses =
    "group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-[var(--text-secondary)] shadow-sm backdrop-blur-sm";
  const interactiveClasses =
    " transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] focus-within:border-[var(--primary)]";

  const iconBadge = (Icon) => (
    <span className="rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] p-2 transition-colors duration-300 group-hover:bg-[var(--primary-soft)]">
      <Icon className="h-5 w-5 text-[var(--primary)] transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
    </span>
  );

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="sr-only" aria-live="polite">{copyStatus}</p>

      {items.map((item, index) => {
        if (!item.href) {
          return (
            <div key={item.label} className={rowClasses}>
              {iconBadge(item.icon)}
              <span className="flex-1 truncate text-left font-semibold">{item.label}</span>
            </div>
          );
        }

        return (
          <div key={item.label} className={rowClasses + interactiveClasses}>
            <a
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex min-w-0 flex-1 items-center gap-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              {iconBadge(item.icon)}
              <span className="flex-1 truncate text-left font-semibold">{item.label}</span>
              {/* Extiende el área clicable a toda la fila */}
              <span className="absolute inset-0" aria-hidden="true" />
            </a>

            {item.copyValue && (
              <button
                type="button"
                onClick={(event) => handleCopy(item, index, event)}
                aria-label={`${t.copy}: ${item.label}`}
                className="relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-[var(--success)]" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
