import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from '@mui/material';
import {
  DirectionsWalk as WalkIcon,
  AccessTime as TimeIcon,
  Terrain as TerrainIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const stats = [
  {
    title: 'Total Distance',
    value: '12.5 km',
    icon: <WalkIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Total Time',
    value: '4h 30m',
    icon: <TimeIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Elevation Gain',
    value: '450m',
    icon: <TerrainIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Team Members',
    value: '4 Active',
    icon: <GroupIcon fontSize="large" color="primary" />,
  },
];

const recentActivities = [
  {
    title: 'GPS Update',
    description: 'Last position updated 5 minutes ago',
    time: '14:30',
  },
  {
    title: 'Checkpoint Reached',
    description: 'Team reached checkpoint B',
    time: '14:15',
  },
  {
    title: 'Weather Alert',
    description: 'Rain expected in 2 hours',
    time: '14:00',
  },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {stat.icon}
              <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                {stat.value}
              </Typography>
              <Typography color="text.secondary">{stat.title}</Typography>
            </Paper>
          </Grid>
        ))}

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentActivities.map((activity) => (
                <Card key={activity.title} variant="outlined">
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="subtitle1" component="div">
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Quick Access */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Access
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardActionArea sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <WalkIcon fontSize="large" color="primary" />
                      <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        Start Journey
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardActionArea sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <GroupIcon fontSize="large" color="primary" />
                      <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        Team Status
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 