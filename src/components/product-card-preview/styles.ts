export const LikeIconButtonEffects = {
  position: 'absolute',
  padding: 0,
  margin: 0,
  top: '10px',
  left: '10px',
  ':hover': {
    scale: '1.2',
  },
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    outline: 'none',
  },
  ':active': {
    scale: '1.1',
    fill: 'red',
  },
  filter: 'drop-shadow(2px 2px rgba(0,0,0,0.2))',
};

export const DeleteIconButtonEffects = {
  position: 'absolute',
  padding: 0,
  margin: 0,
  right: '10px',
  top: '10px',
  ':hover': {
    scale: '1.2',
    '& path': {
      fill: 'red',
    },
  },
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    outline: 'none',
  },
  filter: 'drop-shadow(2px 2px rgba(0,0,0,0.2))',
};
