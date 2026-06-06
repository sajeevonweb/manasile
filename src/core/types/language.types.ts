// Supported languages in the application
export type Language = 'en';
// export type Language = 'en' | 'ml';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: Record<Language, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English'
  },
  // ml: {
  //   code: 'ml',
  //   name: 'Malayalam',
  //   nativeName: 'മലയാളം'
  // }
};

// Get language info by code
export function getLanguageInfo(code: Language): LanguageInfo {
  return SUPPORTED_LANGUAGES[code];
}

// Default language
export const DEFAULT_LANGUAGE: Language = 'en';