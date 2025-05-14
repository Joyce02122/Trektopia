import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Map as MapIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Park as ParkIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
  { text: 'Journey Recap', icon: <MapIcon />, path: '/journey' },
  { text: 'Team Collaboration', icon: <GroupIcon />, path: '/team' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  console.log('Layout component rendering');
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <ParkIcon sx={{ 
          fontSize: 32, 
          color: 'primary.main',
          transform: 'rotate(-15deg)'
        }} />
        <Box sx={{ 
          fontSize: '1.5rem', 
          fontWeight: 600,
          background: 'linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Trektopia
        </Box>
      </Box>
      <List sx={{ px: 2, pt: 3 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              borderRadius: 2,
              transition: 'all 0.2s ease-in-out',
              bgcolor: location.pathname === item.path ? 'rgba(76, 175, 80, 0.08)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(76, 175, 80, 0.12)',
                transform: 'translateX(4px)',
              },
              '& .MuiListItemIcon-root': {
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                transition: 'color 0.2s ease-in-out',
              },
              '& .MuiListItemText-primary': {
                color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                fontWeight: location.pathname === item.path ? 600 : 400,
                transition: 'all 0.2s ease-in-out',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100%', bgcolor: 'background.default' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: 'none',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease-in-out',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'background.default',
          transition: 'all 0.3s ease-in-out',
          height: '100%',
          overflow: 'auto'
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 