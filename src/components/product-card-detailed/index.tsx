import { useDispatch, useSelector } from '../../app/store';
import {
  addToFavorites,
  getFavoriteProducts,
} from '../../app/store/models/products/productSlice.ts';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { LikeIcon, OptionsIcon } from '../../shared/ui/icons';
import { TProductData } from '../../shared/types/store.types.ts';

import styles from './styles.module.css';
import { LikeIconButtonEffects, OptionsIconButtonEffects } from './styles.ts';
import { useState } from 'react';
import { ProductFormHook } from '../product-form-hook';

interface IProductCard {
  product: TProductData;
}

export function ProductCardDetailed({ product }: IProductCard) {
  const dispatch = useDispatch();
  const productsFavorite = useSelector(getFavoriteProducts);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [editHover, setEditHover] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <Card
        className={styles.nonDrag}
        sx={{
          position: 'relative',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          blockSize: {
            xs: '100%',
            sm: '50vh',
            md: '60vh',
          },
          inlineSize: {
            xs: '80%',
            sm: '100%',
          },
          backgroundColor: prefersDarkMode ? 'white' : 'rgba(18,81,159,0.8)',
          boxShadow: '2px 2px 2px black',
        }}
        variant={'elevation'}
      >
        <CardMedia
          className={styles.nonDrag}
          component="img"
          loading="lazy"
          sx={{
            blockSize: { xs: '50vh', sm: '100%' },
            inlineSize: {
              xs: '100%',
              sm: '40vw',
            },
            objectFit: 'cover',
          }}
          image={product.images[0]}
          alt={product.title}
        />
        <CardContent
          sx={{
            color: prefersDarkMode ? 'black' : 'white',
            padding: '32px 8px 8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            textAlign: 'left',
          }}
        >
          <Typography
            variant={'body1'}
            sx={{ fontSize: 'clamp(1.125rem,2.5vw,1.6rem)' }}
          >
            {product.title}
          </Typography>
          <Typography
            sx={{ fontSize: '1.125rem', textDecoration: 'underline' }}
          >
            Details:
          </Typography>
          <Typography sx={{ fontSize: 'clamp(0.75rem,2vw,1rem)' }}>
            {product.description}
          </Typography>
          <Typography sx={{ fontSize: 'clamp(1.125rem,2.5vw,1.6rem)' }}>
            Price: <span style={{ color: 'red' }}>{product.price} $</span>
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
          <Tooltip
            title="Edit"
            disableHoverListener={true}
            open={editHover}
            onMouseEnter={() => setEditHover(true)}
            onMouseLeave={() => setEditHover(false)}
            onClick={() => setEditModalOpen(true)}
          >
            <IconButton
              sx={OptionsIconButtonEffects}
              disableRipple={true}
              aria-label="delete product"
            >
              <OptionsIcon color={'black'} size={'24'} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <Grid
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <title>Edit Product</title>
          <ProductFormHook
            productInformation={{
              id: product.id,
              title: product.title,
              category: product.category.name,
              price: product.price,
              description: product.description,
              images: product.images[0],
            }}
            modalClose={setEditModalOpen}
          />
        </Grid>
      </Modal>
    </>
  );
}
