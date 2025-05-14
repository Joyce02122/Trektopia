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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Chip,
  Divider,
  Avatar,
  AvatarGroup,
  Fade,
  Zoom,
  Slide,
  useTheme,
  alpha,
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
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Pets as BearIcon, Pets as EagleIcon, Pets as DeerIcon, Pets as FoxIcon } from '@mui/icons-material';
import { ZoomIn, ZoomOut, MyLocation, PlayArrow, Pause, Replay, FastForward, FastRewind, Stop } from '@mui/icons-material';
import type { GridProps } from '@mui/material';
import { Bluetooth, Wifi, Usb, SignalCellularAlt, BatteryFull } from '@mui/icons-material';

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

// Update gradient text color to green
const styles = {
  glassCard: {
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  gradientText: {
    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 600,
  },
  statCard: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    },
  },
};

// Map controls component
function MapControls() {
  const map = useMap();
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        right: 16,
        top: 16,
        zIndex: 1000,
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(20px)',
        borderRadius: '12px',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Tooltip title="Zoom In" placement="left">
        <IconButton 
          size="small" 
          onClick={() => map.zoomIn()}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <ZoomIn />
        </IconButton>
      </Tooltip>
      <Tooltip title="Zoom Out" placement="left">
        <IconButton 
          size="small" 
          onClick={() => map.zoomOut()}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <ZoomOut />
        </IconButton>
      </Tooltip>
      <Tooltip title="Center Map" placement="left">
        <IconButton 
          size="small" 
          onClick={() => map.setView([46.8593, -121.7678], 13)}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <MyLocation />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

// Define types for our data
type Participant = {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'sos';
};

type Device = {
  id: number;
  name: string;
  type: 'Bluetooth' | 'HTTP' | 'USB';
  status: 'connected' | 'disconnected';
  batteryLevel: number;
  signalStrength: 'strong' | 'medium' | 'weak';
  owner: string;
  lastSeen: string;
};

type Checkpoint = {
  id: number;
  position: LatLngExpression;
  name: string;
  time: string;
  elevation: number;
  icon: L.DivIcon;
};

type EnvironmentalData = {
  time: string;
  temperature: number;
  humidity: number;
  pressure: number;
};

type Journey = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  distance: string;
  elevation: string;
  checkpoints: Checkpoint[];
  participants: Participant[];
  connectedDevices: Device[];
  environmentalData: EnvironmentalData[];
};

// Update journeys data with proper types
const journeys: Journey[] = [
  {
    id: '1',
    name: 'Mt. Rainier Trail',
    date: '2024-03-15',
    startTime: '09:00',
    endTime: '14:30',
    duration: '5h 30m',
    distance: '12.5 km',
    elevation: '1,200 m',
    participants: [
      { id: 1, name: 'Alex Chen', avatar: '🐻', status: 'online' },
      { id: 2, name: 'Sarah Wang', avatar: '🦅', status: 'offline' },
      { id: 3, name: 'Mike Lin', avatar: '🦌', status: 'online' },
      { id: 4, name: 'Lisa Wu', avatar: '🦊', status: 'sos' },
    ],
    connectedDevices: [
      {
        id: 1,
        name: 'GPS Tracker #1',
        type: 'Bluetooth',
        status: 'connected',
        batteryLevel: 85,
        signalStrength: 'strong',
        owner: 'Alex Chen',
        lastSeen: '2 mins ago',
      },
      {
        id: 2,
        name: 'Weather Station',
        type: 'HTTP',
        status: 'connected',
        batteryLevel: 92,
        signalStrength: 'strong',
        owner: 'Sarah Wang',
        lastSeen: '1 min ago',
      },
    ],
    checkpoints: [
      { 
        id: 1, 
        position: [46.8523, -121.7603] as LatLngExpression,
        name: 'Trailhead', 
        time: '09:00', 
        elevation: 1646,
        icon: createCustomIcon('#795548', '🚶')
      },
      { 
        id: 2, 
        position: [46.8543, -121.7623] as LatLngExpression,
        name: 'First Rest Point', 
        time: '09:30', 
        elevation: 1800,
        icon: createCustomIcon('#607D8B', '🪑')
      },
      { 
        id: 3, 
        position: [46.8563, -121.7643] as LatLngExpression,
        name: 'Bear Point', 
        time: '10:00', 
        elevation: 1950,
        icon: createCustomIcon('#795548', '🐻')
      },
      { 
        id: 4, 
        position: [46.8583, -121.7663] as LatLngExpression,
        name: 'Eagle Nest', 
        time: '10:30', 
        elevation: 2100,
        icon: createCustomIcon('#607D8B', '🦅')
      },
      { 
        id: 5, 
        position: [46.8603, -121.7683] as LatLngExpression,
        name: 'Mountain View', 
        time: '11:00', 
        elevation: 2250,
        icon: createCustomIcon('#8D6E63', '🏔️')
      },
      { 
        id: 6, 
        position: [46.8623, -121.7703] as LatLngExpression,
        name: 'Deer Valley', 
        time: '11:30', 
        elevation: 2400,
        icon: createCustomIcon('#8D6E63', '🦌')
      },
      { 
        id: 7, 
        position: [46.8643, -121.7723] as LatLngExpression,
        name: 'Lunch Spot', 
        time: '12:00', 
        elevation: 2350,
        icon: createCustomIcon('#4CAF50', '🍱')
      },
      { 
        id: 8, 
        position: [46.8663, -121.7743] as LatLngExpression,
        name: 'Fox Ridge', 
        time: '13:00', 
        elevation: 2200,
        icon: createCustomIcon('#FF5722', '🦊')
      },
      { 
        id: 9, 
        position: [46.8683, -121.7763] as LatLngExpression,
        name: 'Sunset Point', 
        time: '13:45', 
        elevation: 2050,
        icon: createCustomIcon('#FF9800', '🌅')
      },
      { 
        id: 10, 
        position: [46.8703, -121.7783] as LatLngExpression,
        name: 'End Point', 
        time: '14:30', 
        elevation: 1900,
        icon: createCustomIcon('#4CAF50', '🏁')
      },
    ],
    environmentalData: [
      { time: '09:00', temperature: 22, humidity: 65, pressure: 1013 },
      { time: '09:30', temperature: 23, humidity: 67, pressure: 1012 },
      { time: '10:00', temperature: 24, humidity: 68, pressure: 1012 },
      { time: '10:30', temperature: 24, humidity: 70, pressure: 1012 },
      { time: '11:00', temperature: 25, humidity: 72, pressure: 1011 },
      { time: '11:30', temperature: 26, humidity: 73, pressure: 1011 },
      { time: '12:00', temperature: 26, humidity: 75, pressure: 1011 },
      { time: '13:00', temperature: 25, humidity: 73, pressure: 1012 },
      { time: '13:45', temperature: 25, humidity: 72, pressure: 1012 },
      { time: '14:30', temperature: 24, humidity: 70, pressure: 1012 },
    ],
  },
  {
    id: '2',
    name: 'Yosemite Valley Loop',
    date: '2024-03-10',
    startTime: '08:00',
    endTime: '12:15',
    duration: '4h 15m',
    distance: '8.2 km',
    elevation: '850 m',
    participants: [
      { id: 1, name: 'Alex Chen', avatar: '🐻', status: 'online' },
      { id: 2, name: 'Sarah Wang', avatar: '🦅', status: 'online' },
    ],
    connectedDevices: [
      {
        id: 3,
        name: 'GPS Tracker #2',
        type: 'Bluetooth',
        status: 'connected',
        batteryLevel: 75,
        signalStrength: 'medium',
        owner: 'Alex Chen',
        lastSeen: '5 mins ago',
      },
    ],
    checkpoints: [
      { 
        id: 1, 
        position: [37.7456, -119.5936] as LatLngExpression,
        name: 'Valley View', 
        time: '08:00', 
        elevation: 1200,
        icon: createCustomIcon('#795548', '🏔️')
      },
      { 
        id: 2, 
        position: [37.7466, -119.5941] as LatLngExpression,
        name: 'Bridalveil Fall', 
        time: '08:30', 
        elevation: 1250,
        icon: createCustomIcon('#607D8B', '💦')
      },
      { 
        id: 3, 
        position: [37.7476, -119.5946] as LatLngExpression,
        name: 'El Capitan View', 
        time: '09:00', 
        elevation: 1300,
        icon: createCustomIcon('#8D6E63', '⛰️')
      },
      { 
        id: 4, 
        position: [37.7486, -119.5951] as LatLngExpression,
        name: 'Mirror Lake', 
        time: '09:30', 
        elevation: 1350,
        icon: createCustomIcon('#607D8B', '🌊')
      },
      { 
        id: 5, 
        position: [37.7496, -119.5956] as LatLngExpression,
        name: 'Half Dome View', 
        time: '10:00', 
        elevation: 1400,
        icon: createCustomIcon('#8D6E63', '⛰️')
      },
      { 
        id: 6, 
        position: [37.7506, -119.5961] as LatLngExpression,
        name: 'Lunch Point', 
        time: '10:30', 
        elevation: 1450,
        icon: createCustomIcon('#4CAF50', '🍱')
      },
      { 
        id: 7, 
        position: [37.7516, -119.5966] as LatLngExpression,
        name: 'Vernal Fall', 
        time: '11:00', 
        elevation: 1500,
        icon: createCustomIcon('#607D8B', '💦')
      },
      { 
        id: 8, 
        position: [37.7526, -119.5971] as LatLngExpression,
        name: 'Nevada Fall', 
        time: '11:30', 
        elevation: 1550,
        icon: createCustomIcon('#607D8B', '💦')
      },
      { 
        id: 9, 
        position: [37.7536, -119.5976] as LatLngExpression,
        name: 'Glacier Point', 
        time: '12:00', 
        elevation: 1600,
        icon: createCustomIcon('#795548', '🏔️')
      },
      { 
        id: 10, 
        position: [37.7546, -119.5981] as LatLngExpression,
        name: 'End Point', 
        time: '12:15', 
        elevation: 1650,
        icon: createCustomIcon('#4CAF50', '🏁')
      },
    ],
    environmentalData: [
      { time: '08:00', temperature: 20, humidity: 60, pressure: 1014 },
      { time: '08:30', temperature: 21, humidity: 62, pressure: 1014 },
      { time: '09:00', temperature: 22, humidity: 63, pressure: 1013 },
      { time: '09:30', temperature: 23, humidity: 65, pressure: 1013 },
      { time: '10:00', temperature: 24, humidity: 66, pressure: 1013 },
      { time: '10:30', temperature: 24, humidity: 67, pressure: 1012 },
      { time: '11:00', temperature: 25, humidity: 68, pressure: 1012 },
      { time: '11:30', temperature: 25, humidity: 69, pressure: 1012 },
      { time: '12:00', temperature: 26, humidity: 70, pressure: 1011 },
      { time: '12:15', temperature: 26, humidity: 70, pressure: 1011 },
    ],
  },
  {
    id: '3',
    name: 'Grand Canyon Rim Trail',
    date: '2024-03-05',
    startTime: '07:00',
    endTime: '13:45',
    duration: '6h 45m',
    distance: '15.8 km',
    elevation: '1,500 m',
    participants: [
      { id: 1, name: 'Alex Chen', avatar: '🐻', status: 'online' },
      { id: 2, name: 'Sarah Wang', avatar: '🦅', status: 'online' },
      { id: 3, name: 'Mike Lin', avatar: '🦌', status: 'online' },
    ],
    connectedDevices: [
      {
        id: 4,
        name: 'GPS Tracker #3',
        type: 'Bluetooth',
        status: 'connected',
        batteryLevel: 60,
        signalStrength: 'weak',
        owner: 'Mike Lin',
        lastSeen: '3 mins ago',
      },
      {
        id: 5,
        name: 'Weather Station #2',
        type: 'HTTP',
        status: 'connected',
        batteryLevel: 88,
        signalStrength: 'strong',
        owner: 'Sarah Wang',
        lastSeen: '1 min ago',
      },
    ],
    checkpoints: [
      { 
        id: 1, 
        position: [36.0544, -112.1401] as LatLngExpression,
        name: 'South Rim', 
        time: '07:00', 
        elevation: 2100,
        icon: createCustomIcon('#795548', '🏜️')
      },
      { 
        id: 2, 
        position: [36.0554, -112.1411] as LatLngExpression,
        name: 'Mather Point', 
        time: '07:45', 
        elevation: 2050,
        icon: createCustomIcon('#607D8B', '👀')
      },
      { 
        id: 3, 
        position: [36.0564, -112.1421] as LatLngExpression,
        name: 'Yavapai Point', 
        time: '08:30', 
        elevation: 2000,
        icon: createCustomIcon('#8D6E63', '🌄')
      },
      { 
        id: 4, 
        position: [36.0574, -112.1431] as LatLngExpression,
        name: 'Ooh Aah Point', 
        time: '09:15', 
        elevation: 1950,
        icon: createCustomIcon('#607D8B', '👀')
      },
      { 
        id: 5, 
        position: [36.0584, -112.1441] as LatLngExpression,
        name: 'Cedar Ridge', 
        time: '10:00', 
        elevation: 1900,
        icon: createCustomIcon('#8D6E63', '🌲')
      },
      { 
        id: 6, 
        position: [36.0594, -112.1451] as LatLngExpression,
        name: 'Lunch Spot', 
        time: '10:45', 
        elevation: 1850,
        icon: createCustomIcon('#4CAF50', '🍱')
      },
      { 
        id: 7, 
        position: [36.0604, -112.1461] as LatLngExpression,
        name: 'Skeleton Point', 
        time: '11:30', 
        elevation: 1800,
        icon: createCustomIcon('#FF5722', '💀')
      },
      { 
        id: 8, 
        position: [36.0614, -112.1471] as LatLngExpression,
        name: 'Tipoff', 
        time: '12:15', 
        elevation: 1750,
        icon: createCustomIcon('#4CAF50', '🎯')
      },
      { 
        id: 9, 
        position: [36.0624, -112.1481] as LatLngExpression,
        name: 'Indian Garden', 
        time: '13:00', 
        elevation: 1700,
        icon: createCustomIcon('#8D6E63', '🌿')
      },
      { 
        id: 10, 
        position: [36.0634, -112.1491] as LatLngExpression,
        name: 'End Point', 
        time: '13:45', 
        elevation: 1650,
        icon: createCustomIcon('#4CAF50', '🏁')
      },
    ],
    environmentalData: [
      { time: '07:00', temperature: 18, humidity: 55, pressure: 1015 },
      { time: '07:45', temperature: 19, humidity: 56, pressure: 1015 },
      { time: '08:30', temperature: 20, humidity: 57, pressure: 1014 },
      { time: '09:15', temperature: 22, humidity: 58, pressure: 1014 },
      { time: '10:00', temperature: 24, humidity: 60, pressure: 1013 },
      { time: '10:45', temperature: 26, humidity: 62, pressure: 1013 },
      { time: '11:30', temperature: 27, humidity: 65, pressure: 1012 },
      { time: '12:15', temperature: 28, humidity: 67, pressure: 1012 },
      { time: '13:00', temperature: 29, humidity: 70, pressure: 1011 },
      { time: '13:45', temperature: 29, humidity: 72, pressure: 1011 },
    ],
  },
];

// Add trail colors for different participants
const trailColors = {
  '🐻': '#795548', // Brown for Bear
  '🦅': '#607D8B', // Blue Grey for Eagle
  '🦌': '#8D6E63', // Brown for Deer
  '🦊': '#FF5722', // Deep Orange for Fox
};

// Update TeamMemberTrail component
function TeamMemberTrail({ 
  member, 
  progress, 
  checkpoints 
}: { 
  member: Participant;
  progress: number;
  checkpoints: Checkpoint[];
}) {
  // Create unique trail positions for each participant
  const getTrailPositions = (avatar: string) => {
    const basePositions = checkpoints.map(checkpoint => checkpoint.position as [number, number]);
    const offset = 0.001; // Small offset for trail separation
    
    switch (avatar) {
      case '🐻':
        return basePositions.map(([lat, lng]) => [lat + offset, lng - offset] as [number, number]);
      case '🦅':
        return basePositions.map(([lat, lng]) => [lat - offset, lng + offset] as [number, number]);
      case '🦌':
        return basePositions.map(([lat, lng]) => [lat + offset, lng + offset] as [number, number]);
      case '🦊':
        return basePositions.map(([lat, lng]) => [lat - offset, lng - offset] as [number, number]);
      default:
        return basePositions;
    }
  };

  const positions = getTrailPositions(member.avatar);
  const currentPosition = positions[Math.floor(progress * (positions.length - 1))];
  const currentCheckpoint = checkpoints[Math.floor(progress * (checkpoints.length - 1))];
  const trailColor = trailColors[member.avatar as keyof typeof trailColors] || '#4CAF50';

  return (
    <>
      <Polyline
        positions={positions}
        color={trailColor}
        weight={4}
        opacity={0.7}
        dashArray="5, 10"
      />
      <Circle
        center={currentPosition}
        radius={30}
        pathOptions={{
          color: trailColor,
          fillColor: trailColor,
          fillOpacity: 0.2,
        }}
      />
      <Marker
        position={currentPosition}
        icon={createCustomIcon(
          member.status === 'sos' ? '#f44336' : 
          member.status === 'offline' ? '#9e9e9e' : trailColor,
          member.avatar
        )}
      >
        <Popup>
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {member.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {member.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Current Location: {currentCheckpoint.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time: {currentCheckpoint.time}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Elevation: {currentCheckpoint.elevation}m
            </Typography>
          </Box>
        </Popup>
      </Marker>
    </>
  );
}

// Update PlaybackControls with Apple-like design
function PlaybackControls({ onPlay, onPause, onReplay, isPlaying }: { 
  onPlay: () => void, 
  onPause: () => void, 
  onReplay: () => void,
  isPlaying: boolean 
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        p: 1.5,
        display: 'flex',
        gap: 2,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Tooltip title="Replay">
        <IconButton 
          onClick={onReplay}
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <Replay />
        </IconButton>
      </Tooltip>
      <Tooltip title={isPlaying ? 'Pause' : 'Play'}>
        <IconButton 
          onClick={isPlaying ? onPause : onPlay}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default function JourneyRecap() {
  const theme = useTheme();
  const [selectedJourneyId, setSelectedJourneyId] = useState(journeys[0].id);
  const [dataType, setDataType] = useState<'elevation' | 'environmental'>('elevation');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const selectedJourney = journeys.find(j => j.id === selectedJourneyId);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReplay = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  const handleDataTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newDataType: string | null
  ) => {
    if (newDataType !== null) {
      setDataType(newDataType as 'elevation' | 'environmental');
    }
  };

  useEffect(() => {
    let animationFrame: number;
    if (isPlaying) {
      const animate = () => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 0.01;
        });
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isPlaying]);

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      width: '100%',
      flex: 1,
      p: 3,
    }}>
      <Fade in timeout={500}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
        }}>
          <Typography 
            variant="h4" 
            sx={styles.gradientText}
          >
            Journey Recap
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Select Journey</InputLabel>
              <Select
                value={selectedJourneyId}
                label="Select Journey"
                onChange={(e) => setSelectedJourneyId(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                {journeys.map((journey) => (
                  <MenuItem key={journey.id} value={journey.id}>
                    {journey.name} ({journey.date})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Playback Speed</InputLabel>
              <Select
                value={playbackSpeed}
                label="Playback Speed"
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <MenuItem value={0.5}>0.5x</MenuItem>
                <MenuItem value={1}>1x</MenuItem>
                <MenuItem value={2}>2x</MenuItem>
                <MenuItem value={4}>4x</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        {/* Map Section */}
        <Grid item xs={12} md={8}>
          <Zoom in timeout={500}>
            <Paper sx={{ 
              p: 3,
              height: '600px',
              ...styles.glassCard,
            }}>
              <MapContainer
                center={[46.8593, -121.7678]}
                zoom={13}
                style={{ height: '100%', width: '100%', borderRadius: '16px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapControls />
                {selectedJourney?.participants.map((member) => (
                  <TeamMemberTrail
                    key={member.id}
                    member={member}
                    progress={progress}
                    checkpoints={selectedJourney.checkpoints}
                  />
                ))}
                <PlaybackControls
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onReplay={handleReplay}
                  isPlaying={isPlaying}
                />
              </MapContainer>
            </Paper>
          </Zoom>
        </Grid>

        {/* Stats Section */}
        <Grid item xs={12} md={4}>
          <Slide direction="left" in timeout={500}>
            <Paper sx={{ 
              p: 3,
              height: '600px',
              ...styles.glassCard,
              overflow: 'auto',
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  letterSpacing: '-0.5px',
                  ...styles.gradientText,
                }}
              >
                Journey Statistics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  {
                    label: 'Date & Time',
                    value: `${selectedJourney?.date} (${selectedJourney?.startTime} - ${selectedJourney?.endTime})`,
                    icon: '📅',
                  },
                  {
                    label: 'Total Distance',
                    value: selectedJourney?.distance,
                    icon: '📍',
                  },
                  {
                    label: 'Duration',
                    value: selectedJourney?.duration,
                    icon: '⏱️',
                  },
                  {
                    label: 'Elevation Gain',
                    value: selectedJourney?.elevation,
                    icon: '⛰️',
                  },
                  {
                    label: 'Checkpoints',
                    value: selectedJourney?.checkpoints.length,
                    icon: '🎯',
                  },
                ].map((stat, index) => (
                  <Card 
                    key={index}
                    sx={{
                      ...styles.statCard,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h4" sx={{ opacity: 0.8 }}>
                          {stat.icon}
                        </Typography>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {stat.value}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2,
                  letterSpacing: '-0.5px',
                  ...styles.gradientText,
                }}
              >
                Participants
              </Typography>
              <AvatarGroup 
                max={4} 
                sx={{ 
                  mb: 3,
                  '& .MuiAvatar-root': {
                    width: 48,
                    height: 48,
                    fontSize: '1.4rem',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                {selectedJourney?.participants.map((participant) => (
                  <Avatar 
                    key={participant.id}
                    sx={{ 
                      bgcolor: participant.status === 'sos' ? 'error.main' : 
                              participant.status === 'offline' ? 'grey.500' : 'primary.main',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {participant.avatar}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Paper>
          </Slide>
        </Grid>

        {/* Data Visualization Section */}
        <Grid item xs={12}>
          <Fade in timeout={500}>
            <Paper sx={{ 
              p: 3,
              ...styles.glassCard,
            }}>
              <Box sx={{ mb: 3 }}>
                <ToggleButtonGroup
                  value={dataType}
                  exclusive
                  onChange={handleDataTypeChange}
                  aria-label="data type"
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      },
                    },
                  }}
                >
                  <ToggleButton value="elevation" aria-label="elevation">
                    Elevation
                  </ToggleButton>
                  <ToggleButton value="environmental" aria-label="environmental">
                    Environmental
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  {dataType === 'elevation' ? (
                    <LineChart data={selectedJourney?.checkpoints.map(cp => ({
                      time: cp.time,
                      elevation: cp.elevation,
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                      <XAxis 
                        dataKey="time" 
                        stroke={theme.palette.text.secondary}
                        tick={{ fill: theme.palette.text.secondary }}
                      />
                      <YAxis 
                        stroke={theme.palette.text.secondary}
                        tick={{ fill: theme.palette.text.secondary }}
                      />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: alpha(theme.palette.background.paper, 0.9),
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="elevation"
                        stroke={theme.palette.primary.main}
                        strokeWidth={2}
                        dot={{ 
                          fill: theme.palette.primary.main,
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ 
                          fill: theme.palette.primary.main,
                          strokeWidth: 2,
                          r: 6,
                        }}
                      />
                    </LineChart>
                  ) : (
                    <LineChart data={selectedJourney?.environmentalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.1)} />
                      <XAxis 
                        dataKey="time" 
                        stroke={theme.palette.text.secondary}
                        tick={{ fill: theme.palette.text.secondary }}
                      />
                      <YAxis 
                        stroke={theme.palette.text.secondary}
                        tick={{ fill: theme.palette.text.secondary }}
                      />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: alpha(theme.palette.background.paper, 0.9),
                          borderRadius: '12px',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke={theme.palette.error.main}
                        strokeWidth={2}
                        dot={{ 
                          fill: theme.palette.error.main,
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ 
                          fill: theme.palette.error.main,
                          strokeWidth: 2,
                          r: 6,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="humidity"
                        stroke={theme.palette.info.main}
                        strokeWidth={2}
                        dot={{ 
                          fill: theme.palette.info.main,
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ 
                          fill: theme.palette.info.main,
                          strokeWidth: 2,
                          r: 6,
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pressure"
                        stroke={theme.palette.secondary.main}
                        strokeWidth={2}
                        dot={{ 
                          fill: theme.palette.secondary.main,
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{ 
                          fill: theme.palette.secondary.main,
                          strokeWidth: 2,
                          r: 6,
                        }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
} 