export type TProductData = {
  id: number;
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
};

export type TFetchPaginationParameters = {
  start: number;
  limit: number;
};

export type TFilterProductsCategory = 'all' | 'favorites' | 'category';

export type TProductsInitialState = {
  isProductsLoading: boolean;
  products: TProductData[];
  favoriteProducts: number[];
  filter: TFilterProductsCategory;
  error: string;
};
