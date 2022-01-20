import React, { memo, useState } from 'react';
import { Dehaze, Login, Person } from '@mui/icons-material';
import { createTheme, Box, Popover, Button, Theme } from '@mui/material';
import { flexbox } from '@mui/system';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserSelector } from '../../common/hooks/useUserStore';
import styled from '@emotion/styled';
import { AppBarProps } from '@mui/material/AppBar';

const GlobalLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const userState = useUserSelector((state) => state);
  const navigate = useNavigate();
  return (
    <Box>
      <HeaderWrapper>
        <ToolsContainer>
          <MenuButton />
          {userState.id < 0 ? (
            <Person />
          ) : (
            <Login
              onClick={() => {
                navigate('/login');
              }}
            />
          )}
        </ToolsContainer>
      </HeaderWrapper>
      <Outlet />
    </Box>
  );
};

const HeaderWrapper = styled.header`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 52px;
  background-color: #1976d2;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`;

const ToolsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12px;
`;

const MenuButton = styled(Dehaze)``;

interface SideBarProps extends AppBarProps {
  open: boolean;
}

const SideBar = styled('div')<SideBarProps>(({ theme, open }) => ({}));

export default memo(GlobalLayout);
