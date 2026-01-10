import { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Copy, Check } from 'lucide-react';

export default function ContactInfo({ contactInfo }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const items = [
    { icon: Mail, label: contactInfo.email, value: contactInfo.email, type: 'copy' },
    { icon: Phone, label: contactInfo.phone, value: contactInfo.phone, type: 'copy' },
    { icon: Linkedin, label: 'LinkedIn', value: contactInfo.linkedin, type: 'link' },
    { icon: Github, label: 'GitHub', value: contactInfo.github, type: 'link' },
    { icon: MapPin, label: contactInfo.location, value: null, type: 'text' }
  ];

  const handleAction = (item, index) => {
    if (item.type === 'copy') {
      navigator.clipboard.writeText(item.value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } else if (item.type === 'link') {
      window.open(item.value, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => handleAction(item, index)}
            className={`
              group w-full flex items-center gap-4 p-4 rounded-xl border border-text/10 bg-bg/50 backdrop-blur-sm text-muted 
              hover:border-accent/50 hover:text-text hover:bg-bg/80 transition-all duration-300 relative overflow-hidden
              ${item.type !== 'text' ? 'cursor-pointer' : 'cursor-default'}
              dark:text-muted light:text-orange-900/80
            `}
          >
            <div className="p-2 rounded-lg bg-text/5 group-hover:bg-accent/10 transition-colors duration-300">
              <Icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform duration-300" />
            </div>

            <span className="flex-1 text-left font-medium truncate">
              {item.label}
            </span>

            {item.type === 'copy' && (
              <div className="relative">
                <div className={`transition-all duration-300 ${copiedIndex === index ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                  <Copy className="w-4 h-4 text-muted group-hover:text-accent" />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${copiedIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
