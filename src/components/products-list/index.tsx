import { useSelector } from '../../app/store';
import { getProducts } from '../../app/store/models/products/productSlice.ts';
import { Grid } from '@mui/material';
import { ProductCardPreview } from '../index';
// import styles from './styles.module.css';

export function ProductsList() {
  const productsData = useSelector(getProducts);

  return (
    <>
      {productsData.slice(0, 12).map((product, index) => (
        <Grid key={index} size={{ lg: 2, sm: 3, xs: 6 }}>
          <ProductCardPreview product={product} />
        </Grid>
      ))}
    </>
  );
}
