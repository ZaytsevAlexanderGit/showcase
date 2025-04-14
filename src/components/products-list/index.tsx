import { useSelector } from '../../app/store';
import { getIsProductsLoading } from '../../app/store/models/products/productSlice.ts';
import { Box, CircularProgress, Grid } from '@mui/material';
import { ProductCardPreview } from '../index';
import { TProductData } from '../../shared/types/store.types.ts';
// import styles from './styles.module.css';

interface IProductList {
  dataForShow: TProductData[];
  curPage: number;
}

export function ProductsList({ dataForShow, curPage }: IProductList) {
  const isLoading = useSelector(getIsProductsLoading);

  return (
    <>
      {dataForShow
        .slice((curPage - 1) * 12, curPage * 12)
        .map((product, index) => (
          <Grid
            key={index}
            size={
              dataForShow.length >= 6
                ? { lg: 2, sm: 3, xs: 6 }
                : { sm: Math.floor(12 / dataForShow.length), xs: 6 }
            }
          >
            {isLoading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              <ProductCardPreview product={product} />
            )}
          </Grid>
        ))}
    </>
  );
}
