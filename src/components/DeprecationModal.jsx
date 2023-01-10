import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const styles = (theme) => ({
  modalBody:{
    textAlign: 'center',
    position: 'absolute !important',
    top: 200,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 900,
    minWidth: 200,
    padding: 20,
    bgcolor: 'background.paper',
    border: '2px solid #ff',
    boxShadow: 24,
    p: 4,
  },
  bodyText: {
    size: '1rem'
  },
  bodyLink: {
    color: 'darkOrange'
  }
});
const DeprecationModal = ({
  theme,
  children,
  classes,
}) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return(
    <div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper square className={classes.modalBody}>
          <Typography id="modal-modal-title" variant="h6">
            Deprecation Notice
          </Typography>
          <br/>
          <Typography id="modal-modal-description" variant="body" className={classes.bodyText}>
            This tool is no longer maintained. I've passed the torch to a current player working on another guild picker <a className={classes.bodyLink} href="https://harleyndavis.github.io/ArmClassPicker/" target="_blank">here</a> (hosting may change, will try to keep this up to date).
            <br/>
            <br/>
            Armageddon MUD is a 30-year old telnet based game which was influential to me growing up, but I've quit playing due to disagreements with current staff. Shout out to Sanvean, Calavera, Nauta, ShaLeah, Satansfish, SweetlySiren, Friendly Bee and many other great staff and players I have met either in person or virtually on this game with such an immense legacy. I hope the game becomes an amenable environment to the many great players it has lost so that they might return, and continues to welcome new players.
            <br/>
            <br/>
            Another great RPI MUD to consider besides Armageddon is <a className={classes.bodyLink} target="_blank" href="http://harshlands.net/wordpress/">Harshlands</a>, which has a less Dune/Dark Sun like setting and is more classically me<strong>die</strong>val.
          </Typography>
          <br/><br/>
          <div>
        <Button className={classes.bodyLink} onClick={handleClose}>Close</Button>
          </div>
        </Paper>
      </Modal>
    </div>
  )
}
export default withStyles(styles)(DeprecationModal);
