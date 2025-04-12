import { Grid } from '@mui/material';
import { ProductsList } from '../../components';

export function ProductsPage() {
  return (
    <Grid spacing={2} container>
      <ProductsList />
    </Grid>
  );
}
