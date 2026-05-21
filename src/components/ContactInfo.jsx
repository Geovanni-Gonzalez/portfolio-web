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
        <div className="rounded-lg bg-text/5 p-2 transition-colors duration-300 group-hover:bg-orange-500/10">
          <Icon className="h-5 w-5 text-orange-500 transition-transform duration-300 group-hover:scale-110" />
        </div>

        <span className="flex-1 truncate text-left font-medium">{item.label}</span>

        {item.type === "copy" && (
          <span className="relative" aria-hidden="true">
            <span className={`transition-all duration-300 ${copiedIndex === index ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}>
              <Copy className="h-4 w-4 text-[var(--color-muted)] group-hover:text-orange-500" />
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${copiedIndex === index ? "scale-100 opacity-100" : "scale-150 opacity-0"}`}>
              <Check className="h-4 w-4 text-green-500" />
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
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-text/10 bg-bg/50 p-4 text-[var(--color-muted)] backdrop-blur-sm"
          >
            {content(item, index)}
          </div>
        ) : (
          <button
            type="button"
            key={item.label}
            onClick={() => handleAction(item, index)}
            aria-label={item.type === "copy" ? `Copiar ${item.label}` : item.label}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-text/10 bg-bg/50 p-4 text-[var(--color-muted)] backdrop-blur-sm transition-all duration-300 hover:border-orange-500/50 hover:bg-bg/80 hover:text-[var(--color-text)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            {content(item, index)}
          </button>
        ),
      )}
    </div>
  );
}
