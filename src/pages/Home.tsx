import { Box, Typography, Paper, Grid, Card, CardContent, Button, List, ListItem, ListItemText, ListItemIcon, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, FormControl, InputLabel, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Map as MapIcon, Group as GroupIcon, Settings as SettingsIcon, Add as AddIcon, Bluetooth as BluetoothIcon, Wifi as WifiIcon, Usb as UsbIcon, SignalCellularAlt as SignalIcon, BatteryFull as BatteryIcon } from '@mui/icons-material';
import { useState } from 'react';

export default function Home() {
  console.log('Home component rendering');
  
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [connectionType, setConnectionType] = useState('http');
  const [connectionAddress, setConnectionAddress] = useState('');

  // Sample connected devices data
  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: 'GPS Tracker #1',
      type: 'bluetooth',
      status: 'connected',
      battery: 85,
      signal: 'strong',
      lastSeen: '2 mins ago'
    },
    {
      id: 2,
      name: 'Weather Station',
      type: 'http',
      status: 'connected',
      battery: 92,
      signal: 'strong',
      lastSeen: '1 min ago'
    }
  ]);

  const handleAddDevice = () => {
    if (connectionAddress) {
      const newDevice = {
        id: connectedDevices.length + 1,
        name: `Device ${connectedDevices.length + 1}`,
        type: connectionType,
        status: 'connected',
        battery: 100,
        signal: 'strong',
        lastSeen: 'just now'
      };
      setConnectedDevices([...connectedDevices, newDevice]);
      setOpenDialog(false);
      setConnectionAddress('');
    }
  };

  const features = [
    {
      title: 'Journey Recap',
      description: 'Review your hiking journey with detailed maps and statistics.',
      icon: <MapIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/journey'
    },
    {
      title: 'Team Collaboration',
      description: 'Stay connected with your hiking team in real-time.',
      icon: <GroupIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/team'
    },
    {
      title: 'Settings',
      description: 'Customize your Trektopia experience.',
      icon: <SettingsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      path: '/settings'
    }
  ];

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      width: '100%',
      flex: 1
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'primary.main',
          fontWeight: 600,
          letterSpacing: '-0.5px',
          mb: 1
        }}
      >
        Dashboard
      </Typography>
      
      <Paper sx={{ 
        p: 3, 
        bgcolor: 'background.paper', 
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        }
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'primary.dark', 
            fontWeight: 600,
            letterSpacing: '-0.5px',
            mb: 2
          }}
        >
          Your Smart Hiking Journey Recap Platform
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.6,
            mb: 2
          }}
        >
          Trektopia is a companion platform to TrailGuard, designed to help you relive and reflect on your hiking adventures.
        </Typography>
        <Typography 
          variant="body1"
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.6
          }}
        >
          After your trip, simply upload data collected by TrailGuard to visualize your route, review team communication, 
          and document key moments.
        </Typography>
      </Paper>

      {/* Connected Devices Section */}
      <Paper sx={{ 
        p: 3, 
        width: '100%',
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        }
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              letterSpacing: '-0.5px'
            }}
          >
            Connected Devices
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ 
              bgcolor: 'primary.main',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            New Connection
          </Button>
        </Box>
        <Grid container spacing={3}>
          {connectedDevices.map((device) => (
            <Grid item xs={12} sm={6} md={4} key={device.id}>
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                },
              }}>
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2, 
                    gap: 1 
                  }}>
                    {device.type === 'bluetooth' ? 
                      <BluetoothIcon sx={{ color: 'primary.main' }} /> :
                     device.type === 'http' ? 
                      <WifiIcon sx={{ color: 'primary.main' }} /> :
                      <UsbIcon sx={{ color: 'primary.main' }} />
                    }
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600,
                        letterSpacing: '-0.5px',
                        flex: 1 
                      }}
                    >
                      {device.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        size="small" 
                        label={device.status} 
                        color={device.status === 'connected' ? 'success' : 'error'}
                        sx={{ 
                          height: 24,
                          borderRadius: 1.5,
                          fontWeight: 500,
                          '& .MuiChip-label': {
                            px: 1.5
                          }
                        }}
                      />
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        bgcolor: 'rgba(76, 175, 80, 0.08)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1.5
                      }}>
                        <SignalIcon 
                          fontSize="small" 
                          color={device.signal === 'strong' ? 'success' : 'warning'} 
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            textTransform: 'capitalize',
                            fontWeight: 500,
                            color: device.signal === 'strong' ? 'success.main' : 'warning.main'
                          }}
                        >
                          {device.signal}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          minWidth: 80,
                          fontWeight: 500
                        }}
                      >
                        Type:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          textTransform: 'capitalize',
                          fontWeight: 500
                        }}
                      >
                        {device.type}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          minWidth: 80,
                          fontWeight: 500
                        }}
                      >
                        Battery:
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        bgcolor: 'rgba(76, 175, 80, 0.08)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1.5
                      }}>
                        <BatteryIcon 
                          fontSize="small" 
                          color={device.battery > 20 ? 'success' : 'error'}
                          sx={{ transform: 'rotate(90deg)' }}
                        />
                        <Typography 
                          variant="body2"
                          sx={{ 
                            fontWeight: 500,
                            color: device.battery > 20 ? 'success.main' : 'error.main'
                          }}
                        >
                          {device.battery}%
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          minWidth: 80,
                          fontWeight: 500
                        }}
                      >
                        Last seen:
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          fontWeight: 500,
                          color: 'text.secondary'
                        }}
                      >
                        {device.lastSeen}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ flex: 1, mb: 0 }}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card 
              sx={{ 
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <CardContent sx={{ 
                flexGrow: 1, 
                textAlign: 'center',
                p: 3,
                '&:last-child': {
                  pb: 3
                }
              }}>
                <Box sx={{ 
                  mb: 2,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1,
                    fontWeight: 600,
                    letterSpacing: '-0.5px'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  {feature.description}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate(feature.path)}
                  sx={{ 
                    bgcolor: 'primary.main',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* New Connection Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 600,
          letterSpacing: '-0.5px'
        }}>
          New Connection
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Connection Type</InputLabel>
            <Select
              value={connectionType}
              label="Connection Type"
              onChange={(e) => setConnectionType(e.target.value)}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <MenuItem value="http">HTTP (IP Address/Hostname)</MenuItem>
              <MenuItem value="bluetooth">Bluetooth</MenuItem>
              <MenuItem value="serial">Serial Port</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label={connectionType === 'http' ? 'IP Address/Hostname' : 
                   connectionType === 'bluetooth' ? 'Device Name' : 
                   'Port Name'}
            type="text"
            fullWidth
            variant="outlined"
            value={connectionAddress}
            onChange={(e) => setConnectionAddress(e.target.value)}
            sx={{
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddDevice} 
            variant="contained"
            sx={{ 
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              borderRadius: 2,
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 