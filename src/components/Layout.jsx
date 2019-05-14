import React from 'react'
import { withTheme } from '@material-ui/core/styles';
import NavBar from './NavBar'

const Layout = ({
  theme
}) => {
  const styles = {
    layout: {
      height: '100vh',
      backgroundColor: theme.palette.background.default,
    }
  }
  return(
    <div style={styles.layout}>
      <NavBar />
    </div>
  )
}
export default withTheme()(Layout);
