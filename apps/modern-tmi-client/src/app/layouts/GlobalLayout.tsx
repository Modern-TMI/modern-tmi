import React, { memo, useState } from 'react';
import {
  Dehaze,
  Home,
  LocalFireDepartment,
  Login,
  Person,
  Today,
} from '@mui/icons-material';
import {
  createTheme,
  Box,
  Popover,
  Button,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';
import { flexbox } from '@mui/system';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  useUserDispatch,
  useUserSelector,
} from '../../common/hooks/useUserStore';
import styled from '@emotion/styled';
import { AppBarProps } from '@mui/material/AppBar';
import { logoutUser } from '../../common/slices/userSlice';

const sideMenuList = [
  {
    menuIcon: <Today />,
    menuName: '오늘의 TMI',
  },
  {
    menuIcon: <LocalFireDepartment />,
    menuName: '화제의 TMI',
  },
];

const GlobalLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >(null);
  const userState = useUserSelector((state) => state);
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  const handleClickPopover = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const popoverList = [
    {
      func: () => navigate('/mypage'),
      menuName: '마이페이지',
    },
    {
      func: () => navigate('/favorite'),
      menuName: '즐겨찾기',
    },
    {
      func: () => {
        closePopover();
        dispatch(logoutUser(userState));
        navigate('/login');
      },
      menuName: '로그아웃',
    },
  ];

  const showPopover = Boolean(anchorEl);

  const drawMenu = () => {
    return (
      <SideBox>
        <HeaderWrapper />
        <ListWrapper>
          <List>
            {sideMenuList.map((item) => (
              <ListItem key={item.menuName}>
                <ListItemIcon>{item.menuIcon}</ListItemIcon>
                <ListItemText>{item.menuName}</ListItemText>
              </ListItem>
            ))}
          </List>
        </ListWrapper>
      </SideBox>
    );
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Box>
      <HeaderWrapper>
        <ToolsContainer>
          <MenuButton onClick={toggleSidebar} />
          <span>Modern TMI</span>
          {userState.id > 0 ? (
            <PersonContainer onClick={(e) => handleClickPopover(e)}>
              <Person />
            </PersonContainer>
          ) : (
            <Login
              onClick={() => {
                navigate('/login');
              }}
            />
          )}
        </ToolsContainer>
      </HeaderWrapper>
      <Drawer open={showSidebar} anchor="left" onClose={toggleSidebar}>
        {drawMenu()}
      </Drawer>
      <Popover
        open={showPopover}
        onClose={closePopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ListWrapper>
          {popoverList.map((item) => (
            <ListItem key={item.menuName}>
              <ListItemText onClick={item.func}>{item.menuName}</ListItemText>
            </ListItem>
          ))}
        </ListWrapper>
      </Popover>
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
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
`;

const MenuButton = styled(Dehaze)``;

const PersonContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const SideBox = styled(Box)`
  height: 100%;
  background-color: white;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
`;

export default memo(GlobalLayout);
