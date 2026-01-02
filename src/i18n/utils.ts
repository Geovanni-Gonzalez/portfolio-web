import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang as keyof typeof ui;
}

export function useTranslations(lang: keyof typeof ui) {
  const translations = ui[lang] || ui[defaultLang];

  return function t(key: string): string {
    return (translations as any)[key] || (ui[defaultLang] as any)[key] || `[${key}]`;
  }
}
