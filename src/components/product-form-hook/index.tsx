import { Box, Card, TextField, Typography } from '@mui/material';

import Button from '@mui/material/Button';
import {
  TProductData,
  TProductEssential,
} from '../../shared/types/store.types.ts';
import { useDispatch, useSelector } from '../../app/store';
import {
  addProduct,
  editProduct,
  getProducts,
} from '../../app/store/models/products/productSlice.ts';

import * as React from 'react';
import { useNavigate } from 'react-router';
import { Routes } from '../../shared/config/router.ts';
import { nanoid } from 'nanoid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectElement } from 'react-hook-form-mui';
import { useEffect } from 'react';

interface IProductForm {
  productInformation: TProductEssential;
  modalClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProductFormHook({
  productInformation,
  modalClose,
}: IProductForm) {
  const { register, handleSubmit, formState, control, reset } = useForm<
    Omit<TProductEssential, 'id'>
  >({
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    reset(productInformation);
  }, [reset]);

  const titleError = formState.errors.title?.message;
  const descriptionError = formState.errors.description?.message;
  const priceError = formState.errors.price?.message;
  const imagesError = formState.errors.images?.message;

  const onSubmit: SubmitHandler<Omit<TProductEssential, 'id'>> = (data) => {
    if (formState.isValid) {
      const categoryData = productsData!.find(
        (el) => el.category.name === data.category
      )!.category;
      const ProductForAction: TProductData = {
        id: productInformation.id !== '' ? productInformation.id : nanoid(),
        title: data.title,
        slug: data.title.toLowerCase(),
        price: data.price,
        description: data.description,
        category: categoryData,
        images: [data.images],
        creationAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (action === 'Create') {
        dispatch(addProduct(ProductForAction));
        navigate(Routes.ALL_PRODUCTS);
      } else {
        dispatch(editProduct(ProductForAction));
        modalClose!(false);
      }
    }
  };

  type TOption = {
    id: string;
    label: string;
  };

  const productsData = useSelector(getProducts);
  const allCategories = productsData.reduce((acc, el) => {
    if (!acc.some((elem) => elem.label === el.category.name))
      acc.push({ id: el.category.name, label: el.category.name });
    return acc;
  }, [] as TOption[]);

  const action = productInformation.id === '' ? 'Create' : 'Edit';

  return (
    <Card
      sx={{
        margin: 'auto',
        position: 'relative',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        inlineSize: { xs: '75vw', sm: '62.5vw', lg: '50vw' },
        padding: 2,
        gap: 1,
        color: 'black',
        backgroundColor: 'white',
        boxShadow: '0px 0px 20px black',
      }}
      variant={'elevation'}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: '100%',
          fontSize: 'clamp(2rem, 10vw, 2.15rem)',
        }}
      >
        {action} Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '25px',
          input: {
            color: 'black',
          },
          '& .MuiInputBase-input': {
            textAlign: 'start',
            color: 'black',
          },
          '& .Mui-error': { margin: 0 },
          '& .MuiFormHelperText-root': {
            marginTop: 0,
            height: 0,
          },
        }}
      >
        <SelectElement
          name="category"
          id="category"
          value={'something'}
          label="Product Category"
          required={true}
          control={control}
          options={allCategories}
          sx={{
            color: 'black',
            fontSize: '1rem',
          }}
        />

        <TextField
          id="title"
          type="text"
          label="Product Title"
          {...register('title', {
            required: 'Title is required',
          })}
          error={titleError !== undefined}
          helperText={titleError}
          variant="outlined"
        />
        <TextField
          id="title"
          type="text"
          multiline
          minRows={3}
          maxRows={3}
          label="Product Description"
          {...register('description', {
            required: 'Description is required',
          })}
          error={descriptionError !== undefined}
          helperText={descriptionError}
          variant="outlined"
        />
        <TextField
          id="title"
          type="number"
          label="Product Price, $"
          {...register('price', {
            required: 'Price is required',
          })}
          error={priceError !== undefined}
          helperText={priceError}
          variant="outlined"
        />
        <TextField
          id="title"
          type="text"
          label="Product Image"
          placeholder="Image URL( https://*.* )"
          {...register('images', {
            required: 'Image is required',
            pattern: {
              value:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&=])*/gm,
              message: 'Invalid URL',
            },
          })}
          error={imagesError !== undefined}
          helperText={imagesError}
          variant="outlined"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!formState.isValid}
        >
          {action} Product
        </Button>
      </Box>
    </Card>
  );
}
