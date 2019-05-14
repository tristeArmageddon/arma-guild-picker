import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Layout from './components/Layout'
import Index from './components/Index'
import GuildPicker from './components/GuildPicker'
import GuildCompare from './components/GuildCompare'
import SkillPicker from './components/SkillPicker'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themeOverrides from './theme.js';
const theme = createMuiTheme(themeOverrides);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Route path="/" exact component={Index} />
          <Route path="/guild-picker/" component={GuildPicker} />
          <Route path="/guild-compare/" component={GuildCompare} />
          <Route path="/skill-picker/" component={SkillPicker} />
        </Layout>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
