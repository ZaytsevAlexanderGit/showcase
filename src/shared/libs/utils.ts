import { TFilterProductsCategory, TProductData } from '../types/store.types.ts';

export const getFilteredProducts = (
  data: TProductData[],
  favorites: number[],
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
