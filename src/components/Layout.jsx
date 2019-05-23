import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  layout: {
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden'
  },
  contentWrapper: {
    [theme.breakpoints.down('xl')]: {
      maxWidth: 1300,
      margin: '0 auto'
    }
  }
});
const Layout = ({
  theme,
  children,
  classes,
}) => {
  return(
    <Grid container className={classes.layout}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.contentWrapper}>
          {children}
        </div>
      </Grid>
    </Grid>
  )
}
export default withStyles(styles)(Layout);
