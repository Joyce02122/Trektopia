import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Pets as BearIcon, Pets as EagleIcon, Pets as DeerIcon, Pets as FoxIcon } from '@mui/icons-material';
import { ZoomIn, ZoomOut, MyLocation, PlayArrow, Pause, Replay, FastForward, FastRewind } from '@mui/icons-material';
import type { GridProps } from '@mui/material';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for markers
const createCustomIcon = (color: string, emoji: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="
      background-color: ${color};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border: 2px solid white;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      font-size: 24px;
      font-weight: bold;
    ">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Map controls component
function MapControls() {
  const map = useMap();

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1000,
        bgcolor: 'white',
        borderRadius: 1,
        p: 0.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        boxShadow: 2,
      }}
    >
      <Tooltip title="Zoom In">
        <IconButton size="small" onClick={() => map.zoomIn()}>
          <ZoomIn />
        </IconButton>
      </Tooltip>
      <Tooltip title="Zoom Out">
        <IconButton size="small" onClick={() => map.zoomOut()}>
          <ZoomOut />
        </IconButton>
      </Tooltip>
      <Tooltip title="Center Map">
        <IconButton size="small" onClick={() => map.setView([46.8593, -121.7678], 13)}>
          <MyLocation />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

// Sample data for Mt. Rainier trails
const checkpoints = [
  { 
    id: 1, 
    position: [46.8523, -121.7603], // Paradise Visitor Center
    name: 'Bear Point', 
    time: '09:00', 
    elevation: 1646,
    icon: createCustomIcon('#795548', '🐻')
  },
  { 
    id: 2, 
    position: [46.8583, -121.7653], // Skyline Trail
    name: 'Eagle Nest', 
    time: '10:30', 
    elevation: 2100,
    icon: createCustomIcon('#607D8B', '🦅')
  },
  { 
    id: 3, 
    position: [46.8623, -121.7703], // Panorama Point
    name: 'Deer Valley', 
    time: '12:00', 
    elevation: 2400,
    icon: createCustomIcon('#8D6E63', '🦌')
  },
  { 
    id: 4, 
    position: [46.8663, -121.7753], // Glacier Vista
    name: 'Fox Ridge', 
    time: '14:30', 
    elevation: 2200,
    icon: createCustomIcon('#FF5722', '🦊')
  },
] as const;

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Alex Chen',
    status: 'online',
    position: [46.8523, -121.7603], // Paradise Visitor Center
    batteryLevel: 85,
    signal: 'strong',
    icon: createCustomIcon('#795548', '🐻'),
  },
  {
    id: 2,
    name: 'Sarah Wang',
    status: 'offline',
    position: [46.8583, -121.7653], // Skyline Trail
    batteryLevel: 45,
    signal: 'weak',
    icon: createCustomIcon('#607D8B', '🦅'),
  },
  {
    id: 3,
    name: 'Mike Lin',
    status: 'online',
    position: [46.8623, -121.7703], // Panorama Point
    batteryLevel: 90,
    signal: 'strong',
    icon: createCustomIcon('#8D6E63', '🦌'),
  },
  {
    id: 4,
    name: 'Lisa Wu',
    status: 'sos',
    position: [46.8663, -121.7753], // Glacier Vista
    batteryLevel: 20,
    signal: 'weak',
    icon: createCustomIcon('#FF5722', '🦊'),
  },
];

const elevationData = checkpoints.map((checkpoint) => ({
  time: checkpoint.time,
  elevation: checkpoint.elevation,
}));

const environmentalData = [
  { time: '09:00', temperature: 22, humidity: 65, pressure: 1013 },
  { time: '10:30', temperature: 24, humidity: 70, pressure: 1012 },
  { time: '12:00', temperature: 26, humidity: 75, pressure: 1011 },
  { time: '14:30', temperature: 25, humidity: 72, pressure: 1012 },
];

// Add this new component for the animated route
function AnimatedRoute() {
  const positions = checkpoints.map((cp) => cp.position as [number, number]);
  const currentPosition = positions[Math.floor((progress / 100) * positions.length)];

  return (
    <>
      <Polyline
        positions={positions}
        color="#81c784"
        weight={4}
        opacity={0.7}
        dashArray="5, 10"
      />
      <Circle
        center={currentPosition}
        radius={20}
        pathOptions={{
          fillColor: '#81c784',
          fillOpacity: 0.7,
          color: '#2e7d32',
          weight: 2,
        }}
      />
    </>
  );
}

// Add this new component for team member trails
function TeamMemberTrail({ member, progress }: { member: typeof teamMembers[0], progress: number }) {
  const [trail, setTrail] = useState<[number, number][]>([]);
  
  useEffect(() => {
    // Generate a trail that follows the checkpoints with some random variation
    const baseTrail = checkpoints.map((cp) => cp.position as [number, number]);
    const randomVariation = baseTrail.map((pos) => [
      pos[0] + (Math.random() - 0.5) * 0.001,
      pos[1] + (Math.random() - 0.5) * 0.001,
    ] as [number, number]);
    
    setTrail(randomVariation);
  }, []);

  const currentPosition = trail[Math.floor((progress / 100) * trail.length)] || member.position;

  return (
    <>
      <Polyline
        positions={trail}
        color={member.status === 'sos' ? '#f44336' : '#81c784'}
        weight={2}
        opacity={0.5}
        dashArray="3, 6"
      />
      <Circle
        center={currentPosition as [number, number]}
        radius={15}
        pathOptions={{
          fillColor: member.status === 'sos' ? '#f44336' : '#81c784',
          fillOpacity: 0.7,
          color: member.status === 'sos' ? '#d32f2f' : '#2e7d32',
          weight: 2,
        }}
      />
    </>
  );
}

// Add this new component for playback controls
function PlaybackControls({ onPlay, onPause, onReplay, isPlaying }: { 
  onPlay: () => void, 
  onPause: () => void, 
  onReplay: () => void,
  isPlaying: boolean 
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 10,
        bottom: 10,
        zIndex: 1000,
        bgcolor: 'white',
        borderRadius: 1,
        p: 0.5,
        display: 'flex',
        gap: 0.5,
        boxShadow: 2,
      }}
    >
      <Tooltip title="Replay">
        <IconButton size="small" onClick={onReplay}>
          <Replay />
        </IconButton>
      </Tooltip>
      {isPlaying ? (
        <Tooltip title="Pause">
          <IconButton size="small" onClick={onPause}>
            <Pause />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Play">
          <IconButton size="small" onClick={onPlay}>
            <PlayArrow />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default function JourneyRecap() {
  const [dataType, setDataType] = useState('elevation');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          return next >= 100 ? 0 : next;
        });
      }, 50);
    }
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReplay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  const handleDataTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newDataType: string | null
  ) => {
    if (newDataType !== null) {
      setDataType(newDataType);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Journey Recap
      </Typography>

      {/* Map Section */}
      <Paper sx={{ 
        height: '600px', 
        mb: 3,
        width: '100%',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'relative',
      }}>
        <MapContainer
          center={[46.8593, -121.7678]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
          {/* Checkpoints */}
          {checkpoints.map((checkpoint) => (
            <Marker
              key={`checkpoint-${checkpoint.id}`}
              position={checkpoint.position as [number, number]}
              icon={checkpoint.icon}
            >
              <Popup>
                <Typography variant="subtitle1" fontWeight="bold">
                  {checkpoint.name}
                </Typography>
                <Typography variant="body2">
                  Time: {checkpoint.time}
                  <br />
                  Elevation: {checkpoint.elevation}m
                  <br />
                  Location: Mt. Rainier National Park
                </Typography>
              </Popup>
            </Marker>
          ))}
          {/* Team Members */}
          {teamMembers.map((member) => (
            <Marker
              key={`member-${member.id}`}
              position={member.position as [number, number]}
              icon={member.icon}
            >
              <Popup>
                <Typography variant="subtitle1" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="body2">
                  Status: {member.status}
                  <br />
                  Battery: {member.batteryLevel}%
                  <br />
                  Signal: {member.signal}
                  <br />
                  Location: Mt. Rainier National Park
                </Typography>
              </Popup>
            </Marker>
          ))}
          <AnimatedRoute />
          {teamMembers.map((member) => (
            <TeamMemberTrail key={`trail-${member.id}`} member={member} progress={progress} />
          ))}
          <MapControls />
        </MapContainer>
        <PlaybackControls
          onPlay={handlePlay}
          onPause={handlePause}
          onReplay={handleReplay}
          isPlaying={isPlaying}
        />
      </Paper>

      <Grid container spacing={3}>
        {/* Data Visualization Section */}
        <Grid item xs={12} md={8} component="div">
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ mb: 2 }}>
              <ToggleButtonGroup
                value={dataType}
                exclusive
                onChange={handleDataTypeChange}
                aria-label="data visualization type"
              >
                <ToggleButton value="elevation" aria-label="elevation">
                  Elevation
                </ToggleButton>
                <ToggleButton value="temperature" aria-label="temperature">
                  Temperature
                </ToggleButton>
                <ToggleButton value="humidity" aria-label="humidity">
                  Humidity
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataType === 'elevation' ? elevationData : environmentalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <RechartsTooltip />
                  {dataType === 'elevation' && (
                    <Line
                      type="monotone"
                      dataKey="elevation"
                      stroke="#81c784"
                      name="Elevation (m)"
                    />
                  )}
                  {dataType === 'temperature' && (
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#66bb6a"
                      name="Temperature (°C)"
                    />
                  )}
                  {dataType === 'humidity' && (
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke="#98ee99"
                      name="Humidity (%)"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Journey Summary */}
        <Grid item xs={12} md={4} component="div">
          <Paper sx={{ p: 2, height: '100%' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Journey Summary
                </Typography>
                <Typography variant="body1">
                  Total Distance: 2.5 km
                  <br />
                  Duration: 5h 30m
                  <br />
                  Max Elevation: 2400m
                  <br />
                  Min Elevation: 1646m
                  <br />
                  Checkpoints Reached: 4
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 