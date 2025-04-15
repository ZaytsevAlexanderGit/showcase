import { TProductEssential } from '../../shared/types/store.types.ts';

import { ProductFormHook } from '../../components';
import { Routes } from '../../shared/config/router.ts';
import { LeftArrowIcon } from '../../shared/ui/icons';
import { IconButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router';

interface IProductCreatePage {
  productInformation: TProductEssential;
}

export function ProductCreatePage({ productInformation }: IProductCreatePage) {
  const navigate = useNavigate();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <>
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
          navigate(Routes.ALL_PRODUCTS);
        }}
        aria-label="Back to Products"
      >
        <LeftArrowIcon
          color={prefersDarkMode ? 'white' : 'black'}
          size={'32'}
        />
      </IconButton>
      <ProductFormHook productInformation={productInformation} />
    </>
  );
}
