import { Grid, Pagination, PaginationItem, useMediaQuery } from '@mui/material';
import { ProductsList } from '../../components';
import { useSelector } from '../../app/store';
import {
  getFavoriteProducts,
  getFilterCategory,
  getProducts,
  getSearchFilter,
} from '../../app/store/models/products/productSlice.ts';
import { getFilteredProducts } from '../../shared/libs/utils.ts';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export function ProductsPage() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const productsData = useSelector(getProducts);
  const favorites = useSelector(getFavoriteProducts);
  const filter = useSelector(getFilterCategory);
  const searchFilter = useSelector(getSearchFilter);
  const location = useLocation();

  const [curPage, setCurPage] = useState(1);
  useEffect(
    () => setCurPage(location.state ? location.state.page : 1),
    [filter]
  );

  let numPages = 1;
  const dataForShow = getFilteredProducts(productsData, favorites, filter);
  const dataDoubleShow = dataForShow.filter(
    (el) => el.title.toLowerCase().indexOf(searchFilter.toLowerCase()) > -1
  );

  if (dataDoubleShow.length > 12)
    numPages = Math.ceil(dataDoubleShow.length / 12);

  const paginationHandleChange = (
    _: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurPage(page);
  };

  return (
    <>
      <Grid spacing={2} container>
        <ProductsList dataForShow={dataDoubleShow} curPage={curPage} />
      </Grid>
      {numPages > 1 ? (
        <Pagination
          sx={{
            paddingTop: '10px',
            margin: '0 auto',
            display: 'inline-flex',
            '& .MuiPaginationItem-colorPrimary': {
              color: prefersDarkMode ? 'white' : 'black',
            },
          }}
          size="medium"
          count={numPages}
          page={curPage}
          onChange={paginationHandleChange}
          color="primary"
          renderItem={(item) => <PaginationItem {...item} />}
        />
      ) : (
        <></>
      )}
    </>
  );
}
