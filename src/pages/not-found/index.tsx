import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Routes } from '../../shared/config/router.ts';

export function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate(Routes.ALL_PRODUCTS), 2000);
  }, []);

  return (
    <>
      <title>Not Found</title>
      <Typography variant="h3">There is no page with this address</Typography>
    </>
  );
}
