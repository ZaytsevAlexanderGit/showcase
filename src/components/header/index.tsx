import styles from './styles.module.css';
import { FilterIcon } from '../../shared/ui/icons';
import { IconButton, useMediaQuery } from '@mui/material';
import { DialogFilter } from '../dialog-filter';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Routes } from '../../shared/config/router.ts';

export function Header() {
  const location = useLocation();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isFilterOpen, setFilterOpen] = useState(false);

  return (
    <div className={styles.header}>
      {location.pathname === Routes.ALL_PRODUCTS ? (
        <>
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
            <FilterIcon
              color={prefersDarkMode ? 'white' : 'black'}
              size={'32'}
            />
          </IconButton>
          <DialogFilter open={isFilterOpen} setOpen={setFilterOpen} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
