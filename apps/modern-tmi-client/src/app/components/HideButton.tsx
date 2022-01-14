import { IconButton } from '@mui/material';
import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
interface IProp {
  onClick: () => void;
  edge?: false | 'end' | 'start' | undefined;
  onMouseDown?: () => void;
  show: boolean;
}

const HideButton = (props: IProp) => {
  return (
    <IconButton
      onClick={props.onClick}
      edge={props.edge || 'end'}
      onMouseDown={props?.onMouseDown}
    >
      {props.show ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
};

export default HideButton;
