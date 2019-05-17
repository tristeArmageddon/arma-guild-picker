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

const styles = (theme) => ({});
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
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
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
                      <MenuItem value={guildKey}>{data.guilds[guildKey].label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell/>
              <TableCell>
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
                      <MenuItem value={subguildKey}>{data.subguilds[subguildKey].label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.mungeSkills().map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.guildsSkill}
                </TableCell>
                <TableCell>{row.guildsSkillLevel}</TableCell>
                <TableCell>{row.subguildsSkill}</TableCell>
                <TableCell>{row.subguildsSkillLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(GuildPicker);
