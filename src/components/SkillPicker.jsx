import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import data from '../data/data.json';
import Chip from '@material-ui/core/Chip';

const styles = (theme) => ({
  sectionTitle: {
    fontSize: 20,
    padding: 6,
  },
  skillGroupTitle: {
    fontSize: 18,
    padding: 20,
    textTransform: 'capitalize',
  },
  chipContainer: {
    padding: '0 20px'
  },
  chip: {
    margin: '0 4px 4px 0',
  }
});
class SkillPicker extends Component {
  state = {
    selectedSkills: [],
  }

  toggleSelection = event => {
    const {
      selectedSkills
    } = this.state;
  }

  findGuildsForSkills() {

  }

  render () {
    const {
      classes,
    } = this.props;
    return (
      <Grid container justify="center" spacing={16} className={classes.container}>
        <Grid item xs={6}>
          <Paper square>
            <Typography className={classes.sectionTitle}>Skills</Typography>
            {data.skillGroups.map(skillGroup => (
              <>
                <Typography className={classes.skillGroupTitle}>{skillGroup}</Typography>
                <div className={classes.chipContainer}>
                  {Object.keys(data.skills[skillGroup]).map((key) => (
                    <Chip
                      className={classes.chip}
                      data={key}
                      label={data.skills[skillGroup][key]}
                    />
                  ))}
                </div>
              </>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper square>
            <Typography className={classes.sectionTitle}>Matching Guild Combinations</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SkillPicker);