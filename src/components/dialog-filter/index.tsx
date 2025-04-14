import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from '../../app/store';
import {
  getFilterCategory,
  getProducts,
  // getProductsCategories,
  setFilterCategory,
} from '../../app/store/models/products/productSlice.ts';

import { TFilterProductsCategory } from '../../shared/types/store.types.ts';
import { InputBase, ListSubheader, styled, useMediaQuery } from '@mui/material';

interface IDialogFilterActions {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    fontSize: '1rem',
    padding: '10px 26px 10px 12px',
  },
}));

export function DialogFilter({ open, setOpen }: IDialogFilterActions) {
  const dispatch = useDispatch();

  const productsData = useSelector(getProducts);
  const filterCategory = useSelector(getFilterCategory);
  const allCategories = productsData.reduce((acc, el) => {
    if (!acc.includes(el.category.name)) acc.push(el.category.name);
    return acc;
  }, [] as string[]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const handleChange = (event: SelectChangeEvent<TFilterProductsCategory>) => {
    dispatch(setFilterCategory(event.target.value as TFilterProductsCategory));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl variant="standard" size="small">
        <Select
          sx={{
            padding: 0,
            margin: 0,
            color: prefersDarkMode ? 'white' : 'black',
          }}
          labelId="filter-select-label"
          id="filter-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={filterCategory}
          label="Filter"
          onChange={handleChange}
          input={<CustomInput />}
        >
          <MenuItem value={'all'} sx={{ fontSize: '1rem', padding: '4px' }}>
            All Products
          </MenuItem>
          <MenuItem
            value={'favorites'}
            sx={{ fontSize: '1rem', padding: '4px' }}
          >
            Favorites
          </MenuItem>
          <ListSubheader
            sx={{
              fontSize: '1rem',
              padding: '4px',
              textDecoration: 'underline',
            }}
          >
            Categories:
          </ListSubheader>
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
      </FormControl>
    </div>
  );
}
