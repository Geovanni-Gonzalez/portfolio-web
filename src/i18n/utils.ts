import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    // Si el idioma no existe, usar defaultLang
    const langObj = ui[lang] || ui[defaultLang];
    // Si la clave no existe en el idioma, usar defaultLang
    if (langObj && key in langObj) {
      return langObj[key];
    } else if (key in ui[defaultLang]) {
      return ui[defaultLang][key];
    } else {
      // Devuelve la clave como fallback para debug
      return `[${String(key)}]`;
    }
  }
}
