import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  Grid as MuiGrid,
  Card,
  CardContent,
  IconButton,
  Badge,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Pets as BearIcon,
  Pets as EagleIcon,
  Pets as DeerIcon,
  Pets as FoxIcon,
  Warning as WarningIcon,
  SignalWifi4Bar as SignalIcon,
  SignalWifiOff as SignalOffIcon,
  Sos as SOSIcon,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Grid = styled(MuiGrid)({});

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

// Sample team data
const teamMembers = [
    {
      id: 1,
      name: 'Alex Chen',
      status: 'online',
      lastUpdate: '2 mins ago',
      position: [46.8523, -121.7603], // Paradise Visitor Center
      batteryLevel: 85,
      signal: 'strong',
      avatar: <BearIcon sx={{ color: '#795548' }} />,
      icon: createCustomIcon('#795548', '🐻'),
    },
    {
      id: 2,
      name: 'Sarah Wang',
      status: 'offline',
      lastUpdate: '15 mins ago',
      position: [46.8583, -121.7653], // Skyline Trail
      batteryLevel: 45,
      signal: 'weak',
      avatar: <EagleIcon sx={{ color: '#607D8B' }} />,
      icon: createCustomIcon('#607D8B', '🦅'),
    },
    {
      id: 3,
      name: 'Mike Lin',
      status: 'online',
      lastUpdate: '1 min ago',
      position: [46.8623, -121.7703], // Panorama Point
      batteryLevel: 90,
      signal: 'strong',
      avatar: <DeerIcon sx={{ color: '#8D6E63' }} />,
      icon: createCustomIcon('#8D6E63', '🦌'),
    },
    {
      id: 4,
      name: 'Lisa Wu',
      status: 'sos',
      lastUpdate: 'Just now',
      position: [46.8663, -121.7753], // Glacier Vista
      batteryLevel: 20,
      signal: 'weak',
      avatar: <FoxIcon sx={{ color: '#FF5722' }} />,
      icon: createCustomIcon('#FF5722', '🦊'),
    },
  ];

const recentMessages = [
  {
    id: 1,
    sender: 'Lisa Wu',
    message: 'Need assistance! Low battery and weak signal.',
    time: 'Just now',
    type: 'sos',
  },
  {
    id: 2,
    sender: 'System',
    message: 'Sarah Wang disconnected from the network.',
    time: '15 mins ago',
    type: 'warning',
  },
  {
    id: 3,
    sender: 'Mike Lin',
    message: 'Reached checkpoint C, all good here.',
    time: '30 mins ago',
    type: 'info',
  },
];

export default function TeamCollaboration() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      case 'sos':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (signal: string) => {
    return signal === 'strong' ? <SignalIcon /> : <SignalOffIcon />;
  };

  return (
    <Box sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width: '100%',
      flex: 1
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3, ml: 2, mt: 2 }}>
        Team Collaboration
      </Typography>

      {/* Alert Section */}
      {teamMembers.some((member) => member.status === 'sos') && (
        <Alert severity="error" sx={{ width: '100%' }}>
          <strong>SOS Alert:</strong> Team member requires immediate assistance!
        </Alert>
      )}

      <Grid container spacing={2} sx={{ flex: 1, width: '100%' }}>
        {/* Team Members List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Team Members
            </Typography>
            <List>
              {teamMembers.map((member) => (
                <ListItem
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor:
                      selectedMember === member.id ? 'action.selected' : 'inherit',
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        member.status === 'sos' ? (
                          <SOSIcon color="error" />
                        ) : undefined
                      }
                    >
                      <Avatar sx={{ bgcolor: 'primary.light' }}>
                        {member.avatar}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {member.name}
                        <Chip
                          size="small"
                          label={member.status.toUpperCase()}
                          color={getStatusColor(member.status) as any}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        Last update: {member.lastUpdate}
                        <IconButton size="small">
                          {getStatusIcon(member.signal)}
                        </IconButton>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Map Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ 
            height: '100%',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
        <MapContainer
  center={[46.8593, -121.7678]}
  zoom={13}
  style={{ height: '100%', width: '100%' }}
>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  {teamMembers.map((member) => (
    <Marker
      key={member.id}
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
</MapContainer>
          </Paper>
        </Grid>

        {/* Recent Messages */}
        <Grid item xs={12}>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Messages
              </Typography>
              <List>
                {recentMessages.map((message) => (
                  <ListItem key={message.id}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {message.type === 'sos' && (
                            <SOSIcon color="error" fontSize="small" />
                          )}
                          {message.type === 'warning' && (
                            <WarningIcon color="warning" fontSize="small" />
                          )}
                          <Typography
                            component="span"
                            variant="body1"
                            color={message.type === 'sos' ? 'error' : 'inherit'}
                          >
                            {message.sender}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          {message.message}
                          <br />
                          <Typography variant="caption" color="text.secondary">
                            {message.time}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 