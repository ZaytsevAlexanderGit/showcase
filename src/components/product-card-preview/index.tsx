import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from '../../app/store';
import {
  addToFavorites,
  deleteProduct,
  getFavoriteProducts,
  // getIsProductsLoading,
  // getProductsPaginationFromServer,
} from '../../app/store/models/products/productSlice.ts';
import { TProductData } from '../../shared/types/store.types.ts';
import { useState } from 'react';
import { DeleteIcon, LikeIcon } from '../../shared/ui/icons';
import { DeleteIconButtonEffects, LikeIconButtonEffects } from './styles.ts';
import { useNavigate } from 'react-router';
import { DialogAlert } from '../index.ts';
import styles from './styles.module.css';

interface IProductCard {
  product: TProductData;
}

export function ProductCardPreview({ product }: IProductCard) {
  const dispatch = useDispatch();
  const productsFavorite = useSelector(getFavoriteProducts);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const navigate = useNavigate();

  return (
    <>
      <Card
        className={styles.nonDrag}
        onClick={() => navigate(`/products/${product.id}`)}
        style={{
          position: 'relative',
          borderRadius: '20px',
        }}
        sx={{
          backgroundColor: prefersDarkMode ? 'white' : 'rgba(18,81,159,0.8)',

          inlineSize: {
            xs: '42vw',
            sm: '22vw',
            lg: 'clamp(140px,14vw,200px)',
          },
          cursor: 'pointer',
          boxShadow: '2px 2px 2px black',
          ':hover': {
            boxShadow: '6px 6px 6px black',
          },
          ':active': { boxShadow: '2px 2px 2px black' },
        }}
        variant={'elevation'}
      >
        <CardMedia
          className={styles.nonDrag}
          component="img"
          loading="lazy"
          sx={{
            blockSize: {
              xs: '45vw',
              sm: '24vw',
              lg: '230px',
            },
            objectFit: 'cover',
          }}
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent
          sx={{
            color: prefersDarkMode ? 'black' : 'white',
            padding: 0.5,
          }}
        >
          <Typography
            variant={'body1'}
            sx={{ fontSize: 'clamp(1rem,2vw,1.25rem)' }}
            noWrap={true}
          >
            {product.title}
          </Typography>
          <Typography
            noWrap={true}
            sx={{ fontSize: 'clamp(1rem,2vw,1.25rem)' }}
          >
            Price:{product.price} $
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 0 }}>
          <IconButton
            sx={{
              ...LikeIconButtonEffects,

              path: {
                fill: productsFavorite.includes(product.id)
                  ? `rgba(255,0,0,0.6)`
                  : '',
              },
            }}
            disableRipple={true}
            onClick={(event) => {
              event.stopPropagation();
              dispatch(addToFavorites(product.id));
            }}
            aria-label="add to favorites"
          >
            <LikeIcon color={'blackOpacity'} size={'24'} />
          </IconButton>
          <IconButton
            sx={DeleteIconButtonEffects}
            disableRipple={true}
            onClick={(event) => {
              event.stopPropagation();
              setDeleteDialogOpen(true);
            }}
            aria-label="delete product"
          >
            <DeleteIcon color={'black'} size={'24'} />
          </IconButton>
        </CardActions>
      </Card>

      <DialogAlert
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        handleClickYes={(event) => {
          event.stopPropagation();
          dispatch(deleteProduct(product.id));
          setDeleteDialogOpen(false);
        }}
      />
    </>
  );
}
