export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export * from './services'
export * from './store'
export * from './jotai'