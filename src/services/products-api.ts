import { API_URL } from '../shared/config/api-config.ts';
import { TProductData } from '../shared/types/store.types.ts';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getProductsDataApi = () =>
  fetch(`${API_URL}/products`)
    .then((res) => checkResponse<TProductData[]>(res))
    .then((data) => {
      if (data) {
        return data;
      }
      return Promise.reject(data);
    });

export type paginationParameters = {
  start: number;
  limit: number;
};

export const getProductsPaginationDataApi = (data: paginationParameters) =>
  fetch(`${API_URL}/products?offset=${data.start}&limit=${data.limit}`)
    .then((res) => checkResponse<TProductData[]>(res))
    .then((data) => {
      if (data) {
        return data;
      }
      return Promise.reject(data);
    });
