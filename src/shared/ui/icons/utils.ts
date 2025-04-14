type TIconColor = 'blue' | 'white' | 'black' | 'red' | 'blackOpacity';

export const getColor = (color: TIconColor) => {
  switch (color) {
    case 'blue':
      return 'rgba(19,42,97,0.8)';
    case 'white':
      return '#ffffff';
    case 'black':
      return '#000000';
    case 'red':
      // return '#FF0000';
      return 'rgba(255,0,0,0.6)';
    case 'blackOpacity':
      return 'rgba(0,0,0,0.5)';
    default:
      return '#212226';
  }
};

export interface IIconProps<T = '24'> {
  color: TIconColor;
  size?: T | '14' | '20' | '24' | '32' | '46' | '48' | '54' | '101' | '196';
  width?: string;
  height?: string;
  className?: string;
  onClick?:
    | (() => void)
    | ((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void);
}
