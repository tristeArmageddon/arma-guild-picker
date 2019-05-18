import React, { Component }from 'react'
import { withStyles } from '@material-ui/core/styles';
import data from '../data/data.json'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  cell: {
    [theme.breakpoints.down('xs')]: {
      padding: 4,
      fontSize: '0.65rem',
      maxWidth: 65,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 8,
    },
  }
});
class GuildPicker extends Component {
  state = {
    guild: 'enforcer',
    subguild: 'hunter',
  }

  toggleSelection = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  findGroupAndLabel(skillKey) {
    for (let group of Object.keys(data.skills)) {
      const foundSkill = Object.keys(data.skills[group]).find((k) => k === skillKey)
      if (foundSkill) {
        return {
          group,
          label: data.skills[group][foundSkill],
        }
      }
    }
  }

  skillsToObj({
    guildGroup,
    guildKey,
    proficiency,
    result = {},
    extended = false
  }) {
    const proficiencyKey = `${extended ? 'ex': ''}${proficiency}`;
    if (data[guildGroup] && data[guildGroup][guildKey][proficiencyKey]) {
      data[guildGroup][guildKey][proficiencyKey].forEach(sk => {
        const {
          group,
          label,
        } = this.findGroupAndLabel(sk);
        result[sk] = {
          [`${guildGroup}Skill`]: label,
          [`${guildGroup}SkillLevel`]: proficiency,
          group,
          branchesFrom: extended && data[guildGroup][guildKey].branching[sk],
          ...result[sk],
        }
      })
    }
    return result;
  }

  mungeSkills() {
    const {
      guild,
      subguild,
    } = this.state;
    let result = {};
    for (let proficiency of data.proficiencies) {
      for (let guildGroup of ['guilds', 'subguilds']) {
        const guildKey = guildGroup == 'guilds' ? guild : subguild;
        for (let extended of [true, false]) {
          result = this.skillsToObj({result, guildGroup, guildKey, proficiency, extended})
        }
      }
    }
    return Object.values(result);
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      guild,
      subguild,
    } = this.state;
    return (
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.state.guild}
                      onChange={this.toggleSelection}
                      inputProps={{
                        name: 'guild',
                        id: 'guild-select',
                      }}
                    >
                      {Object.keys(data.guilds).map(guildKey => (
                        <MenuItem value={guildKey}>
                          {data.guilds[guildKey].label}
                          {data.guilds[guildKey].karma ? ` (${data.guilds[guildKey].karma})` : ''}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell className={classes.cell}/>
                <TableCell className={classes.cell}>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.state.subguild}
                      onChange={this.toggleSelection}
                      inputProps={{
                        name: 'subguild',
                        id: 'subguild-select',
                      }}
                    >
                      {Object.keys(data.subguilds).map(subguildKey => (
                        <MenuItem value={subguildKey}>
                          {data.subguilds[subguildKey].label}
                          {data.subguilds[subguildKey].karma ? ` (${data.subguilds[subguildKey].karma})` : ''}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell className={classes.cell}/>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.mungeSkills().map(row => (
                <TableRow key={row.id}>
                  <TableCell className={classes.cell} component="th" scope="row">
                    {row.guildsSkill}
                  </TableCell>
                  <TableCell className={classes.cell}>{row.guildsSkillLevel}</TableCell>
                  <TableCell className={classes.cell}>{row.subguildsSkill}</TableCell>
                  <TableCell className={classes.cell}>{row.subguildsSkillLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }
}
export default withStyles(styles)(GuildPicker);
