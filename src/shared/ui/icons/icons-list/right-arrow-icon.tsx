import { getColor, IIconProps } from '../utils.ts';

export const RightArrowIcon = ({
  color,
  size = '24',
  ...props
}: IIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill={getColor(color)}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" />
  </svg>
);
