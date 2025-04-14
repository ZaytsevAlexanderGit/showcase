import { TFilterProductsCategory, TProductData } from '../types/store.types.ts';

export const getFilteredProducts = (
  data: TProductData[],
  favorites: number[],
  filter: TFilterProductsCategory
  // setCurPage: () => void
): TProductData[] => {
  // setCurPage(1);
  switch (filter) {
    case 'all':
      return data;
    case 'favorites':
      return data.filter((el) => favorites.includes(el.id));
    default:
      return data.filter((el) => el.category.name === filter);
  }
};
