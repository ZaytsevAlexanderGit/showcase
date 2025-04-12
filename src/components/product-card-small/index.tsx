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

interface IProductCardSmall {
  product: TProductData;
}

export function ProductCardSmall({ product }: IProductCardSmall) {
  const dispatch = useDispatch();
  const productsFavorite = useSelector(getFavoriteProducts);

  const [parentOpen, setParentOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [likeOpen, setLikeOpen] = useState(false);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const navigate = useNavigate();

  return (
    <Tooltip
      open={!likeOpen && !deleteOpen && parentOpen}
      disableHoverListener
      title="Show Details"
      onClick={() => navigate(`/products/${product.id}`)}
      slotProps={ToolTipStyle(-45)}
    >
      <Card
        className={styles.nonDrag}
        onMouseEnter={() => setParentOpen(true)}
        onMouseLeave={() => setParentOpen(false)}
        style={{
          position: 'relative',
          borderRadius: '20px',
        }}
        sx={{
          backgroundColor: prefersDarkMode ? 'white' : 'grey',
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
            height: {
              // xs: '45vw',
              // md: '32vw',
              // lg: '300px',
              xs: '45vw',
              md: '24vw',
              lg: '240px',
            },
            objectFit: 'cover',
          }}
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent
          sx={{
            color: 'black',
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
            onMouseEnter={() => setLikeOpen(true)}
            onMouseLeave={() => setLikeOpen(false)}
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
            onMouseEnter={() => setDeleteOpen(true)}
            onMouseLeave={() => setDeleteOpen(false)}
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
