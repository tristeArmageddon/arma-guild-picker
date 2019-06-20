import React, { Component }from 'react'
import { withStyles } from '@material-ui/core/styles';
import data from '../data/data.json'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  cell: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      padding: 4,
      fontSize: '0.65rem',
      maxWidth: 65,
      paddingRight: '4px !important'
    },
    [theme.breakpoints.down('sm')]: {
      padding: 8,
    },
  },
  noContent: {
    padding: '1rem',
    textAlign: 'center',
    width: '100%'
  },
});
class RaceTable extends Component {
  render() {
    const {
      classes,
    } = this.props;

    const selectedRace = data.races.human;

    return (
      <Paper square className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>
                {selectedRace.label}
              </TableCell>
              <TableCell className={classes.cell}>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={selectedRace.documentation}
                >
                  Documentation &#8599;
                </Link>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="karma">
              <TableCell className={classes.cell} component="th" scope="row">
                Karma Cost
              </TableCell>
              <TableCell className={classes.cell}>
                {selectedRace.karma}
              </TableCell>
            </TableRow>
            <TableRow key="heightmin">
              <TableCell className={classes.cell} component="th" scope="row">
                Minimum Height (inches)
              </TableCell>
              <TableCell className={classes.cell}>
                {selectedRace.heightmin}
              </TableCell>
            </TableRow>
            <TableRow key="heightmax">
              <TableCell className={classes.cell} component="th" scope="row">
                Maximum Height (inches)
              </TableCell>
              <TableCell className={classes.cell}>
                {selectedRace.heightmax}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(RaceTable);

