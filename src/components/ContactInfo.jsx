import { useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function ContactInfo({ contactInfo }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const items = [
    { icon: Mail, label: contactInfo.email, value: contactInfo.email, type: "copy" },
    { icon: Phone, label: contactInfo.phone, value: contactInfo.phone, type: "copy" },
    { icon: Linkedin, label: "LinkedIn", value: contactInfo.linkedin, type: "link" },
    { icon: Github, label: "GitHub", value: contactInfo.github, type: "link" },
    { icon: MapPin, label: contactInfo.location, value: null, type: "text" },
  ];

  const handleAction = async (item, index) => {
    if (item.type === "copy") {
      await navigator.clipboard.writeText(item.value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else if (item.type === "link") {
      window.open(item.value, "_blank", "noopener,noreferrer");
    }
  };

  const content = (item, index) => {
    const Icon = item.icon;

    return (
      <>
        <div className="rounded-lg border border-[var(--card-border)] bg-[var(--surface-elevated)] p-2 transition-colors duration-300 group-hover:bg-[var(--primary-soft)]">
          <Icon className="h-5 w-5 text-[var(--primary)] transition-transform duration-300 group-hover:scale-110" />
        </div>

        <span className="flex-1 truncate text-left font-semibold">{item.label}</span>

        {item.type === "copy" && (
          <span className="relative" aria-hidden="true">
            <span className={`transition-all duration-300 ${copiedIndex === index ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}>
              <Copy className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--primary)]" />
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${copiedIndex === index ? "scale-100 opacity-100" : "scale-150 opacity-0"}`}>
              <Check className="h-4 w-4 text-[var(--success)]" />
            </span>
          </span>
        )}
      </>
    );
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {items.map((item, index) =>
        item.type === "text" ? (
          <div
            key={item.label}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-[var(--text-secondary)] shadow-sm backdrop-blur-sm"
          >
            {content(item, index)}
          </div>
        ) : (
          <button
            type="button"
            key={item.label}
            onClick={() => handleAction(item, index)}
            aria-label={item.type === "copy" ? `Copiar ${item.label}` : item.label}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-[var(--text-secondary)] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {content(item, index)}
          </button>
        ),
      )}
    </div>
  );
}
