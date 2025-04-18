import { FilterIcon, PlusIcon } from '../../shared/ui/icons';
import { Box, Card, IconButton, TextField, useMediaQuery } from '@mui/material';
import { DialogFilter } from '../dialog-filter';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Routes } from '../../shared/config/router.ts';
import { setFilterSearch } from '../../app/store/models/products/productSlice.ts';
import { useDispatch } from '../../app/store';
import { useDebounce } from '../../shared/libs/utils.ts';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [searchName, setSearchName] = useState('');

  const debouncedSearchTerm = useDebounce(searchName, 500);

  useEffect(() => {
    dispatch(setFilterSearch(debouncedSearchTerm));
  }, [dispatch, debouncedSearchTerm]);

  return location.pathname === Routes.ALL_PRODUCTS ? (
    <Box
      sx={{
        blockSize: { sm: '50px', xs: '75px' },
        position: 'relative',
        display: 'grid',
        gridTemplateAreas: {
          sm: `'add search filter''. . . '`,
          xs: `'add filter'
          'search search'`,
        },
        paddingRight: '0',
        paddingBlockEnd: { xs: '10px', sm: 0 },
      }}
    >
      <IconButton
        disableRipple={true}
        sx={{
          gridArea: 'add',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          padding: 0,
          margin: 0,
          transformOrigin: '16px 16px ',
          ':focus': {
            outline: 'none',
          },
          ':focus-visible': {
            outline: 'none',
          },
          ':active': {
            scale: '1.1',
          },
          filter: 'drop-shadow(2px 2px rgba(0,0,0,0.2))',
        }}
        aria-label="add product"
        onClick={(event) => {
          event.stopPropagation();
          navigate(Routes.CREATE_PRODUCT);
        }}
      >
        <PlusIcon color={prefersDarkMode ? 'white' : 'black'} size={'32'} />
      </IconButton>
      <Card
        sx={{
          gridArea: 'search',
          margin: 'auto',
          position: 'relative',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          inlineSize: { sm: '50vw', xs: '100%' },
          color: 'black1',
          backgroundColor: 'white',
          boxShadow: '0px 0px 2px black',
          '& .MuiInputBase-input': {
            padding: '5px',
            textAlign: 'start',
            color: 'black',
          },
          '& .MuiInputLabel-root': {
            display: 'none',
          },
          '& legend': { display: 'none' },
          '& fieldset': { top: 0 },
          padding: 0,
        }}
        variant={'elevation'}
      >
        <TextField
          id="title"
          type="text"
          value={searchName}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton
                  onClick={() => setSearchName('')}
                  sx={{
                    rotate: '45deg',
                    visibility: searchName ? 'visible' : 'hidden',
                  }}
                >
                  <PlusIcon color={'black'} size={'20'} />
                </IconButton>
              ),
            },
          }}
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
          placeholder="Search Product"
          variant="outlined"
        />
      </Card>
      <Box
        style={{
          gridArea: 'filter',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <IconButton
          disableRipple={true}
          sx={{
            padding: 0,
            margin: 0,
            ':focus': {
              outline: 'none',
            },
            ':focus-visible': {
              outline: 'none',
            },
            ':active': {
              scale: '1.1',
            },
            filter: 'drop-shadow(2px 2px rgba(0,0,0,0.2))',
          }}
          onClick={(event) => {
            event.stopPropagation();
            setFilterOpen(true);
          }}
          aria-label="delete product"
        >
          <FilterIcon color={prefersDarkMode ? 'white' : 'black'} size={'32'} />
        </IconButton>
        <DialogFilter open={isFilterOpen} setOpen={setFilterOpen} />
      </Box>
    </Box>
  ) : (
    <></>
  );
}
