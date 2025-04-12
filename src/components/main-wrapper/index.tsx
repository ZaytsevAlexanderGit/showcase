import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

interface MainWrapperProps {
  children?: ReactNode;
  extClassName?: string;
}

export const MainWrapper: FC<MainWrapperProps> = ({
  children,
  extClassName,
}) => (
  <>
    <div className={classnames`${styles.wrapper} ${extClassName}`}>
      {children}
    </div>
  </>
);
