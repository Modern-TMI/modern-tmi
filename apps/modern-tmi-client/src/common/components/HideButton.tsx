import { IconButton, InputAdornment } from '@mui/material';
import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
interface IProp {
  onClick: () => void;
  edge?: false | 'end' | 'start' | undefined;
  show: boolean;
}

const HideButton = (props: IProp) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={props.onClick} edge={props.edge || 'end'}>
        {props.show ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

export default HideButton;
