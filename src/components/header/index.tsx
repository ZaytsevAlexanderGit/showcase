import { Link } from 'react-router';
import styles from './styles.module.css';

export function Header() {
  return (
    <>
      <div className={styles.header}>
        <Link to="/products">Products</Link>
        <Link to="/products/124">Some Data</Link>
        <Link to="/create-product">Create Product</Link>
      </div>
    </>
  );
}
