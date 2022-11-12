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
            Deprecation Notice - Play Harshlands Instead!
          </Typography>
          <br/>
          <Typography id="modal-modal-description" variant="body" className={classes.bodyText}>
            This tool is no longer maintained. As is well documented on
            {' '}<a className={classes.bodyLink} target="_blank" href="https://reddit.com/r/MUD">r/MUD</a> the staff 
            of Armageddon MUD have a history of being abusive towards players. 
            <br/><br/>
            The creator of this tool now favors a game called 
            {' '}<a className={classes.bodyLink} target="_blank" href="http://harshlands.net/wordpress/">Harshlands</a>, where 
            many former Armageddon MUD players with more sophisitication 
            and integrity than Armageddon MUD staff now play. Come join us!
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
