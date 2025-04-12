import { getColor, IIconProps } from '../utils.ts';

export const LeftArrowIcon = ({ color, size = '24', ...props }: IIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" />
  </svg>
);
