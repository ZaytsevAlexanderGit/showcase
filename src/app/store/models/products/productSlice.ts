import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  TFilterProductsCategory,
  TProductData,
  TProductsInitialState,
} from '../../../../shared/types/store.types.ts';
import {
  getProductsDataApi,
  getProductsPaginationDataApi,
  paginationParameters,
} from '../../../../services/products-api.ts';

// export async function isURLisPicture(data: string) {
//   try {
//     const res = await fetch('https://proxy.cors.sh/' + data, {
//       method: 'HEAD',
//       headers: {
//         'x-cors-api-key': 'temp_6093f581654842f76b43b8b2ab403cf2',
//       },
//     });
//     return res!.headers!.get('Content-type')!.includes('image');
//   } catch {
//     return false;
//   }
// }

export const initialState: TProductsInitialState = {
  isProductsLoading: false,
  products: [],
  favoriteProducts: [],
  filter: 'all',
  error: '',
};

export const getProductsFromServer = createAsyncThunk(
  'data/getProducts',
  async () => {
    const data = await getProductsDataApi();
    return data.filter(
      (el) =>
        !el.images[0].includes('placeimg.com') &&
        !el.images[0].includes('placehold.co')
    );
  }
  // async () => getProductsDataApi()
  // async () => {
  //   const data = await getProductsDataApi();
  //   const isImages = await Promise.all(
  //     data.map((el) => {
  //       return isURLisPicture(el.images[0]);
  //     })
  //   );
  //   return data.filter((_, ind) => isImages[ind] === true);
  // }
);

export const getProductsPaginationFromServer = createAsyncThunk(
  'data/getProductsPagination',
  async (data: paginationParameters) => getProductsPaginationDataApi(data)
);

export const productsSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProductData[]>) => {
      state.products = action.payload;
    },
    setIsProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.isProductsLoading = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<number | string>) => {
      state.favoriteProducts = state.favoriteProducts.includes(action.payload)
        ? state.favoriteProducts.filter((el) => el !== action.payload)
        : [...state.favoriteProducts, action.payload];
    },
    setFilterCategory: (
      state,
      action: PayloadAction<TFilterProductsCategory>
    ) => {
      state.filter = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<number | string>) => {
      state.products = state.products.filter((el) => el.id !== action.payload);
      state.favoriteProducts = state.favoriteProducts.filter(
        (el) => el !== action.payload
      );
    },
    addProduct: (state, action: PayloadAction<TProductData>) => {
      state.products = [action.payload, ...state.products];
    },
    editProduct: (state, action: PayloadAction<TProductData>) => {
      state.products = state.products.map((el) => {
        if (el.id !== action.payload.id) return el;
        else return action.payload;
      });
    },
  },
  selectors: {
    getIsProductsLoading: (state) => state.isProductsLoading,
    getProducts: (state) => state.products,
    getProductByID: (state, id) => state.products.find((el) => el.id === id),
    getFavoriteProducts: (state) => state.favoriteProducts,
    getFilterCategory: (state) => state.filter,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsFromServer.pending, (state) => {
        state.isProductsLoading = true;
        state.error = '';
      })
      .addCase(getProductsFromServer.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsLoading = false;
        state.error = '';
      })
      .addCase(getProductsFromServer.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.error = action.error.message!;
        console.error(action.error.message);
      });
    builder
      .addCase(getProductsPaginationFromServer.pending, (state) => {
        state.isProductsLoading = true;
        state.error = '';
      })
      .addCase(getProductsPaginationFromServer.fulfilled, (state, action) => {
        state.products = [
          ...state.products,
          ...action.payload.filter(
            (el) => !state.products.map((el) => el.id).includes(el.id)
          ),
        ];
        state.isProductsLoading = false;
        state.error = '';
      })
      .addCase(getProductsPaginationFromServer.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.error = action.error.message!;
        console.error(action.error.message);
      });
  },
});

export const {
  getIsProductsLoading,
  getProducts,
  getFavoriteProducts,
  getProductByID,
  getFilterCategory,
} = productsSlice.selectors;
export const {
  setProducts,
  setIsProductsLoading,
  addToFavorites,
  deleteProduct,
  setFilterCategory,
  addProduct,
  editProduct,
} = productsSlice.actions;
