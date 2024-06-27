import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import store from './redux/store';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';

const theme = createTheme();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Most Starred Repos</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/repository/:owner/:repo" element={<RepositoryDetails />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default App;