import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
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
import {
  DeleteIconButtonEffects,
  LikeIconButtonEffects,
  ToolTipStyle,
} from './styles.ts';
import { useNavigate } from 'react-router';
import styles from './styles.module.css';

interface IProductCard {
  product: TProductData;
}

export function ProductCardPreview({ product }: IProductCard) {
  const dispatch = useDispatch();
  const productsFavorite = useSelector(getFavoriteProducts);

  const [cardHover, setCardHover] = useState(false);
  const [iconHover, setIconHover] = useState(false);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const navigate = useNavigate();

  return (
    <Tooltip
      open={!iconHover && cardHover}
      disableHoverListener
      title="Show Details"
      onClick={() => navigate(`/products/${product.id}`)}
      slotProps={ToolTipStyle(-45)}
    >
      <Card
        className={styles.nonDrag}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
        style={{
          position: 'relative',
          borderRadius: '20px',
        }}
        sx={{
          backgroundColor: prefersDarkMode ? 'white' : 'rgba(19,42,97,0.8)',
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
              // xs: '45vw',
              // md: '32vw',
              // lg: '300px',
              xs: '45vw',
              sm: '24vw',
              lg: '240px',
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
            sx={{ fontSize: '1.25rem' }}
            noWrap={true}
          >
            {product.title}
          </Typography>
          <Typography sx={{ fontSize: '1.25rem' }}>
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
            onMouseEnter={() => setIconHover(true)}
            onMouseLeave={() => setIconHover(false)}
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
            onMouseEnter={() => setIconHover(true)}
            onMouseLeave={() => setIconHover(false)}
            sx={DeleteIconButtonEffects}
            disableRipple={true}
            onClick={(event) => {
              event.stopPropagation();
              dispatch(deleteProduct(product.id));
            }}
            aria-label="delete product"
          >
            <DeleteIcon color={'black'} size={'24'} />
          </IconButton>
        </CardActions>
      </Card>
    </Tooltip>
  );
}
