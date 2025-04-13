export const ToolTipStyle = (offset: number) => {
  return {
    popper: {
      disablePortal: true,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, offset],
          },
        },
      ],
    },
  };
};

export const LikeIconButtonEffects = {
  position: 'absolute',

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

export const OptionsIconButtonEffects = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  // ':hover': {
  //   scale: '1.2',
  //   '& path': {
  //     fill: 'red',
  //   },
  // },
  ':focus': {
    outline: 'none',
  },
  ':focus-visible': {
    outline: 'none',
  },
  filter: 'drop-shadow(2px 2px rgba(0,0,0,0.2))',
};
