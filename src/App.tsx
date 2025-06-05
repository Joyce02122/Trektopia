import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import JourneyRecap from './pages/JourneyRecap';
import TeamCollaboration from './pages/TeamCollaboration';
import Settings from './pages/Settings';

// Create a custom theme with green color palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#81c784', // Light green
      light: '#b2dfdb',
      dark: '#4caf50',
    },
    secondary: {
      main: '#66bb6a', // Medium green
      light: '#98ee99',
      dark: '#2e7d32',
    },
    background: {
      default: '#f1f8e9', // Very light green
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#2e7d32',
    },
    h6: {
      fontWeight: 500,
      color: '#2e7d32',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#81c784',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  console.log('App component rendering');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journey" element={<JourneyRecap />} />
            <Route path="/team" element={<TeamCollaboration />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
