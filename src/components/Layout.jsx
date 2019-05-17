import React from 'react'
import { withTheme } from '@material-ui/core/styles';
import NavBar from './NavBar'
import Grid from '@material-ui/core/Grid';

const Layout = ({
  theme,
  children
}) => {
  const styles = {
    layout: {
      height: '100vh',
      backgroundColor: theme.palette.background.default,
    }
  }
  return(
    <Grid container style={styles.layout}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  )
}
export default withTheme()(Layout);
