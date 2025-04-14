import { Box, Card, FormLabel, TextField, Typography } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
  TProductData,
  TProductEssential,
} from '../../shared/types/store.types.ts';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from '../../app/store';
import {
  addProduct,
  editProduct,
  getProducts,
} from '../../app/store/models/products/productSlice.ts';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { onlyNumbers } from '../../shared/libs/utils.ts';
import { useNavigate } from 'react-router';
import { Routes } from '../../shared/config/router.ts';
import { nanoid } from 'nanoid';

interface IProductForm {
  productInformation: TProductEssential;
  modalClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProductForm({ productInformation, modalClose }: IProductForm) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsData = useSelector(getProducts);
  const allCategories = productsData.reduce((acc, el) => {
    if (!acc.includes(el.category.name)) acc.push(el.category.name);
    return acc;
  }, [] as string[]);

  const action = productInformation.id === '' ? 'Create' : 'Edit';

  const [productData, setProductData] = useState<TProductEssential>({
    ...productInformation,
  });

  const [categoryError, setCategoryError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = validateInputs();
    if (valid) {
      const categoryData = productsData!.find(
        (el) => el.category.name === productData.category
      )!.category;
      const ProductForAction: TProductData = {
        id: productData.id !== '' ? productData.id : nanoid(),
        title: productData.title,
        slug: productData.title.toLowerCase(),
        price: productData.price,
        description: productData.description,
        category: categoryData,
        images: [productData.images],
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

  const validateInputs = () => {
    let isValid = true;

    if (productData.category === 'Choose Product Category') {
      isValid = false;
      setCategoryError('Please choose product category');
    } else setCategoryError('');

    if (productData.title.length === 0) {
      isValid = false;
      setTitleError('Please enter product name');
    } else setTitleError('');

    if (productData.description.length === 0) {
      isValid = false;
      setDescriptionError('Please enter product description');
    } else setDescriptionError('');

    if (productData.price.toString() === '0') {
      isValid = false;
      setPriceError('Please enter valid price');
    } else setPriceError('');

    if (
      !productData.images.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&=])*/gm
      )
    ) {
      isValid = false;
      setImageError('Please enter valid URL');
    } else setImageError('');

    return isValid;
  };

  return (
    <Card
      sx={{
        margin: 'auto',
        position: 'relative',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        inlineSize: '50vw',
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
        Create Product
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl
          sx={{
            '& .MuiInputBase-input': {
              padding: '5px',
              textAlign: 'start',
            },
            '& .Mui-error': { margin: 0 },
            display: 'flex',
            gap: '5px',
            input: {
              padding: '5px',
              color: 'black',
            },
          }}
        >
          <FormLabel htmlFor="category">Product Category</FormLabel>
          <Select
            sx={{
              padding: 0,
              margin: 0,
              color: 'black',
            }}
            labelId="category"
            id="category"
            value={productData.category}
            onChange={(event: SelectChangeEvent) => {
              setCategoryError('');
              setProductData({
                ...productData,
                category: event.target.value,
              });
            }}
            error={categoryError.length > 0}
          >
            <MenuItem disabled value={'Choose Product Category'}>
              Choose Product Category
            </MenuItem>
            {allCategories.map((el) => (
              <MenuItem
                value={`${el}`}
                key={el}
                sx={{ fontSize: '1rem', padding: '4px 4px 4px 20px' }}
              >
                {el}
              </MenuItem>
            ))}
          </Select>

          <FormLabel htmlFor="title">Product Name</FormLabel>
          <TextField
            value={productData.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (titleError.length > 0) setTitleError('');
              setProductData({ ...productData, title: event.target.value });
            }}
            id="title"
            type="text"
            name="title"
            placeholder="Product Name"
            required
            error={titleError.length > 0}
            helperText={titleError}
            variant="outlined"
          />

          <FormLabel htmlFor="description">Description</FormLabel>
          <TextField
            slotProps={{
              input: { style: { padding: '5px' } },
              htmlInput: {
                style: {
                  padding: 0,
                  color: 'black',
                },
              },
            }}
            value={productData.description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (descriptionError.length > 0) setDescriptionError('');
              setProductData({
                ...productData,
                description: event.target.value,
              });
            }}
            id="description"
            type="text"
            name="description"
            placeholder="Product Description"
            multiline
            required
            variant="outlined"
            minRows={3}
            maxRows={3}
            error={descriptionError.length > 0}
            helperText={descriptionError}
          />

          <FormLabel htmlFor="price">Price, $</FormLabel>
          <TextField
            name="price"
            value={productData.price}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (onlyNumbers(event.target.value)) {
                if (priceError.length > 0) setPriceError('');
                if (event.target.value.length === 0) {
                  setProductData({
                    ...productData,
                    price: +event.target.value,
                  });
                }
                setProductData({ ...productData, price: +event.target.value });
              }
            }}
            placeholder="Price"
            type="number"
            id="price"
            autoComplete="current-password"
            required
            variant="outlined"
            error={priceError.length > 0}
            helperText={priceError}
          />

          <FormLabel htmlFor="imageURL">Image URL</FormLabel>
          <TextField
            id="imageURL"
            value={productData.images}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (imageError.length > 0) setImageError('');
              setProductData({
                ...productData,
                images: event.target.value,
              });
            }}
            type="text"
            name="imageURL"
            placeholder="Image URL( https://*.* )"
            required
            variant="outlined"
            error={imageError.length > 0}
            helperText={imageError}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          {action} Product
        </Button>
      </Box>
    </Card>
  );
}
