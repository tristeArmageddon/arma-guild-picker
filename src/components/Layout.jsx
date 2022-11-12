import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'
import Grid from '@material-ui/core/Grid';
import DeprecationModal from './DeprecationModal';

const styles = (theme) => ({
  layout: {
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden'
  },
  contentWrapper: {
    [theme.breakpoints.down('lg')]: {
      maxWidth: 1100,
      margin: '0 auto'
    }
  },
});
const Layout = ({
  theme,
  children,
  classes,
}) => {
  return(
    <div>
      <DeprecationModal/>
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
    </div>
  )
}
export default withStyles(styles)(Layout);
