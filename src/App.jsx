import React from 'react';
import './App.css';
import Layout from './components/Layout'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeOverrides from './theme.js';
const theme = createMuiTheme(themeOverrides);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  );
}

export default App;
