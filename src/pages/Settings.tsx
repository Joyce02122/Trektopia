import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Divider,
  Stack,
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

  const handleChange = (field: string) => (event: any) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Stack spacing={3}>
        {/* Recording Settings */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recording Settings
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography gutterBottom>Checkpoint Interval (minutes)</Typography>
              <Slider
                value={settings.checkpointInterval}
                onChange={handleChange('checkpointInterval')}
                step={5}
                marks
                min={5}
                max={30}
                valueLabelDisplay="auto"
              />
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.recordEnvironmentalData}
                  onChange={handleChange('recordEnvironmentalData')}
                />
              }
              label="Record Environmental Data"
            />
          </Stack>
        </Paper>

        {/* Communication Settings */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Communication Settings
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.loraEnabled}
                  onChange={handleChange('loraEnabled')}
                />
              }
              label="Enable LoRa Communication"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.sosNotifications}
                  onChange={handleChange('sosNotifications')}
                />
              }
              label="Enable SOS Notifications"
            />
            <Box>
              <Typography gutterBottom>
                Warning Threshold (% of battery/signal)
              </Typography>
              <Slider
                value={settings.warningThreshold}
                onChange={handleChange('warningThreshold')}
                step={5}
                marks
                min={10}
                max={50}
                valueLabelDisplay="auto"
              />
            </Box>
          </Stack>
        </Paper>

        {/* Display Settings */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Display Settings
          </Typography>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="map-style-label">Map Style</InputLabel>
              <Select
                labelId="map-style-label"
                value={settings.mapStyle}
                label="Map Style"
                onChange={handleChange('mapStyle')}
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
                />
              }
              label="Show Breadcrumbs"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showElevation}
                  onChange={handleChange('showElevation')}
                />
              }
              label="Show Elevation Data"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showTemperature}
                  onChange={handleChange('showTemperature')}
                />
              }
              label="Show Temperature Data"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.showHumidity}
                  onChange={handleChange('showHumidity')}
                />
              }
              label="Show Humidity Data"
            />
          </Stack>
        </Paper>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="primary">
            Reset to Defaults
          </Button>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Box>
  );
} 