import { useSelector } from '../../app/store';
import { getIsProductsLoading } from '../../app/store/models/products/productSlice.ts';
import { Box, CircularProgress, Grid } from '@mui/material';
import { ProductCardPreview } from '../index';
import { TProductData } from '../../shared/types/store.types.ts';

interface IProductList {
  dataForShow: TProductData[];
  curPage: number;
}

export function ProductsList({ dataForShow, curPage }: IProductList) {
  const isLoading = useSelector(getIsProductsLoading);
  const cardsOnPage =
    Math.min(curPage * 12, dataForShow.length) - (curPage - 1) * 12;

  return (
    <>
      {dataForShow
        .slice((curPage - 1) * 12, curPage * 12)
        .map((product, index) => (
          <Grid
            key={index}
            size={
              cardsOnPage >= 6
                ? { lg: 2, sm: 3, xs: 6 }
                : cardsOnPage >= 4
                  ? { lg: 12 / cardsOnPage, sm: 3, xs: 6 }
                  : cardsOnPage >= 3
                    ? {
                        lg: Math.floor(12 / cardsOnPage),
                        sm: 12 / cardsOnPage,
                        xs: 6,
                      }
                    : { xs: 6 }
            }
          >
            {isLoading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) : (
              <ProductCardPreview product={product} curPage={curPage} />
            )}
          </Grid>
        ))}
    </>
  );
}
