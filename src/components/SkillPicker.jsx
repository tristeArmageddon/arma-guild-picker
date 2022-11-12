import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import data from '../data/data.json';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

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
  guildOptionText: {
    padding: '0 20px',
  },
  guildOptionLink: {
    color: '#ffffff5e'
  },
  selectedCount: {
    color: '#ffffff5e'
  },
  chipContainer: {
    padding: '0 20px'
  },
  chip: {
    margin: '0 4px 4px 0',
  },
  clearSelected: {
    float: 'right',
  }
});
class SkillPicker extends Component {
  state = {
    selectedSkills: [],
    guilds: [],
    subguilds: [],
  }

  componentWillMount() {
    for (let guildGroup of ['guilds', 'subguilds']) {
      const guilds = data[guildGroup] ? Object.keys(data[guildGroup]) : [];
      const result = [];
      for (let guild of guilds) {
        result.push({
          key: guild,
          label: data[guildGroup][guild].label,
          skills: this.flattenGuild(guildGroup, guild),
          perks: data[guildGroup][guild].perks,
          karma: data[guildGroup][guild].karma,
        });
      }
      this.setState({
        [guildGroup]: result
      })
    }
  }

  flattenGuild = (guildGroup, guild) => {
    let result = [];
    for (let skillPrefix of ['', 'ex']) {
      for (let profLevel of ['languages', ...data.proficiencies]) {
        if (data[guildGroup][guild][`${skillPrefix}${profLevel}`]) {
          result = [...data[guildGroup][guild][`${skillPrefix}${profLevel}`], ...result]
        }
      }
    }
    return result;
  }

  toggleSelection = (event, skill) => {
    const {
      selectedSkills
    } = this.state;

    const itemIndex = selectedSkills.indexOf(skill)
    if (itemIndex === -1) {
      this.setState({ selectedSkills: [skill, ...selectedSkills]})
    } else {
      selectedSkills.splice(itemIndex, 1);
      this.setState({ selectedSkills: [...selectedSkills]})
    }
  }

  clearSelection = () => {
    this.setState({ selectedSkills: [] })
  }

  findGuildsForSkills = () => {
    const result = [];
    for (let guild of this.state.guilds) {
      for (let subguild of this.state.subguilds) {
        let skillsMatched = 0;
        for (let skill of this.state.selectedSkills) {
          if (
            guild.skills.includes(skill)
            || subguild.skills.includes(skill)
            || guild.perks.includes(skill)
            || subguild.perks.includes(skill)
          ) {
            skillsMatched++;
          }
        }

        if (skillsMatched === this.state.selectedSkills.length) {
          const karmaLabel = (guild.karma || subguild.karma) ? ` (${guild.karma + subguild.karma})` : '';
          result.push({
            label: `${guild.label}/${subguild.label}${karmaLabel}`,
            linkTo: `/arma-guild-picker/?guild=${guild.key}&subguild=${subguild.key}`
          })
        }
      }
    }
    return result;
  }

  render () {
    const {
      classes,
    } = this.props;
    const {
      selectedSkills,
    } = this.state;
    return (
      <Grid container justifyContent="center" spacing={2} className={classes.container}>
        <Grid item xs={12} sm={6}>
          <Paper square>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography className={classes.sectionTitle}>
                  Skills
                  {' '}
                  <span className={classes.selectedCount}>({selectedSkills.length} selected)</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {selectedSkills.length > 0 && (<Button
                  size="small"
                  className={classes.clearSelected}
                  onClick={() => this.clearSelection()}
                >
                  Clear
                </Button>)}
              </Grid>
              </Grid>
            {['languages', 'perks', ...data.skillGroups].map(skillGroup => (
              <>
                <Typography className={classes.skillGroupTitle}>{skillGroup}</Typography>
                <div className={classes.chipContainer}>
                  {Object.keys(data.skills[skillGroup]).map((key) => (
                    <Chip
                      className={classes.chip}
                      onClick={(event) => this.toggleSelection(event, key)}
                      label={data.skills[skillGroup][key].label}
                      color={selectedSkills.includes(key) ? 'primary' : ''}
                    />
                  ))}
                </div>
              </>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper square>
            <Typography className={classes.sectionTitle}>
              Matching Guild
              {' '}
              <span className={classes.selectedCount}>(Click to View in Guild Picker)</span>
            </Typography>
            <Grid container justifyContent="center" spacing={2} className={classes.container}>
              {this.findGuildsForSkills().map(guildCombination => (
                <Grid item xs={12} sm={6} className={classes.guildOption}>
                  <Link to={guildCombination.linkTo} className={classes.guildOptionLink}>
                    <Typography className={classes.guildOptionText}>
                      {guildCombination.label}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SkillPicker);
