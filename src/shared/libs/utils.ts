import { TFilterProductsCategory, TProductData } from '../types/store.types.ts';
import { useEffect, useState } from 'react';

export const getFilteredProducts = (
  data: TProductData[],
  favorites: (string | number)[],
  filter: TFilterProductsCategory
): TProductData[] => {
  switch (filter) {
    case 'all':
      return data;
    case 'favorites':
      return data.filter((el) => favorites.includes(el.id));
    default:
      return data.filter((el) => el.category.name === filter);
  }
};

export function onlyNumbers(s: string) {
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) < 48 || s.charCodeAt(i) > 57) {
      return false;
    }
  }
  return true;
}

export function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
