import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from '../../app/store';
import { getProductByID } from '../../app/store/models/products/productSlice.ts';
import { Grid, IconButton, useMediaQuery } from '@mui/material';
import { ProductCardDetailed } from '../../components';
import { Routes } from '../../shared/config/router.ts';
import { LeftArrowIcon } from '../../shared/ui/icons';

export function ProductInfoPage() {
  const { id } = useParams();
  const location = useLocation();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const navigate = useNavigate();
  const product = useSelector((state) => getProductByID(state, id));

  return product !== undefined ? (
    <>
      <title>Product Info</title>
      <IconButton
        sx={{
          position: 'absolute',
          padding: 0,
          margin: 0,
          top: 0,
          left: 0,
        }}
        disableRipple={true}
        onClick={(event) => {
          event.stopPropagation();
          navigate(Routes.ALL_PRODUCTS, {
            state: { page: location.state ? location.state.page : 1 },
          });
        }}
        aria-label="Back to Products"
      >
        <LeftArrowIcon
          color={prefersDarkMode ? 'white' : 'black'}
          size={'32'}
        />
      </IconButton>
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <ProductCardDetailed product={product} />
      </Grid>
    </>
  ) : (
    <Navigate to={Routes.ALL_PRODUCTS}></Navigate>
  );
}
