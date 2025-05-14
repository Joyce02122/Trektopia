import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  Button,
} from '@mui/material';

export default function Settings() {
  const [settings, setSettings] = useState({
    checkpointInterval: 15,
    recordEnvironmentalData: true,
    loraEnabled: true,
    sosNotifications: true,
    warningThreshold: 20,
    mapStyle: 'standard',
    showBreadcrumbs: true,
    showElevation: true,
    showTemperature: true,
    showHumidity: true,
  });

  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [units, setUnits] = useState('metric');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleChange = (field: string) => (event: any) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

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
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3,
            height: 'auto',
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              General Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  label="Language"
                  onChange={(e) => setLanguage(e.target.value)}
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
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="zh">中文</MenuItem>
                  <MenuItem value="ja">日本語</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Theme</InputLabel>
                <Select
                  value={theme}
                  label="Theme"
                  onChange={(e) => setTheme(e.target.value)}
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
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Units</InputLabel>
                <Select
                  value={units}
                  label="Units"
                  onChange={(e) => setUnits(e.target.value)}
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
                  <MenuItem value="metric">Metric (km, m)</MenuItem>
                  <MenuItem value="imperial">Imperial (mi, ft)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3,
            height: 'auto',
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              Notification Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Email Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive updates about your hiking journey via email
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Push Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get real-time alerts on your device
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Paper>
        </Grid>

        {/* Device Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3,
            height: 'auto',
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              Device Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  Checkpoint Interval (minutes)
                </Typography>
                <Slider
                  value={settings.checkpointInterval}
                  onChange={handleChange('checkpointInterval')}
                  min={5}
                  max={60}
                  step={5}
                  marks
                  valueLabelDisplay="auto"
                  sx={{
                    color: 'primary.main',
                    '& .MuiSlider-thumb': {
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 8px rgba(129, 199, 132, 0.16)',
                      },
                    },
                  }}
                />
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.recordEnvironmentalData}
                    onChange={handleChange('recordEnvironmentalData')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Record Environmental Data
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track temperature, humidity, and pressure
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.loraEnabled}
                    onChange={handleChange('loraEnabled')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      LoRa Communication
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enable long-range communication between devices
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Paper>
        </Grid>

        {/* Display Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3,
            height: 'auto',
            borderRadius: 3,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              Display Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Map Style</InputLabel>
                <Select
                  value={settings.mapStyle}
                  label="Map Style"
                  onChange={handleChange('mapStyle')}
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
                  <MenuItem value="standard">Standard</MenuItem>
                  <MenuItem value="satellite">Satellite</MenuItem>
                  <MenuItem value="terrain">Terrain</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.showBreadcrumbs}
                    onChange={handleChange('showBreadcrumbs')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Show Breadcrumbs
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Display your trail path on the map
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Switch
                    checked={settings.showElevation}
                    onChange={handleChange('showElevation')}
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Show Elevation Profile
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Display elevation changes along your route
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 