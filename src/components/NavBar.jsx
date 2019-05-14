import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withTheme } from '@material-ui/core/styles';

const NavBar = ({
  theme,
}) => {
  const styles = {
    appBar: {
      ...theme.appBar
    }
  }
  return(
    <>
      <AppBar position="static">
        <Toolbar style={styles.appBar}>
          <Typography variant="title" color="inherit">
            Guild Picker
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default withTheme()(NavBar);
