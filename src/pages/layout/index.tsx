import { Outlet } from 'react-router';
import { PageLayout } from '../../components/page-layout';
import { MainWrapper } from '../../components/main-wrapper';
import { useDispatch } from '../../app/store';
import { useEffect } from 'react';
import {
  getProductsFromServer,
  // getProductsPaginationFromServer,
} from '../../app/store/models/products/productSlice.ts';
import { Header } from '../../components/header';

export function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsFromServer());
    //   dispatch(getProductsPaginationFromServer({ start: 0, limit: 9 }));
  }, []);

  return (
    <MainWrapper>
      <Header />
      <main
        style={{
          position: 'relative',
          blockSize: 'calc(100dvh - 60px)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <PageLayout content={<Outlet />} />
      </main>
    </MainWrapper>
  );
}
