export type TProductData = {
  id: number | string;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
};

export type TProductEssential = {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string;
};

export type TFetchPaginationParameters = {
  start: number;
  limit: number;
};

export type TFilterProductsCategory = 'all' | 'favorites' | 'category';

export type TProductsInitialState = {
  isProductsLoading: boolean;
  products: TProductData[];
  favoriteProducts: (number | string)[];
  filter: TFilterProductsCategory;
  filterSearch: string;
  error: string;
};
