import { useSelector } from '../../app/store';
import { getProducts } from '../../app/store/models/products/productSlice.ts';
import { Grid } from '@mui/material';
import { ProductCardSmall } from '../product-card-small';
// import styles from './styles.module.css';

export function ProductsList() {
  const productsData = useSelector(getProducts);

  return (
    <>
      {productsData.slice(0, 12).map((product, index) => (
        // <Grid key={index} size={{ lg: 3, md: 4, xs: 6 }}>
        <Grid key={index} size={{ lg: 2, md: 3, xs: 6 }}>
          <ProductCardSmall product={product} />
        </Grid>
      ))}
    </>
  );
}
