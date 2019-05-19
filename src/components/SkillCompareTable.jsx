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
    width: '25%',
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
class SkillCompareTable extends Component {

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
    gSelected,
    proficiency,
    result = {},
    extended = false
  }) {
    const proficiencyKey = `${extended ? 'ex': ''}${proficiency}`;
    if (data[guildGroup] && data[guildGroup][gSelected][proficiencyKey]) {
      data[guildGroup][gSelected][proficiencyKey].forEach(sk => {
        const {
          group,
          label,
        } = this.findGroupAndLabel(sk);
        result[sk] = {
          [`${guildGroup}Skill`]: label,
          [`${guildGroup}SkillLevel`]: proficiency,
          group,
          branchesFrom: extended && data[guildGroup][gSelected].branching[sk],
          ...result[sk],
        }
      })
    }
    return result;
  }

  mungeSkills() {
    const {
      g1Key,
      g2Key,
      g1Value,
      g2Value,
    } = this.props;

    let result = {};
    for (let proficiency of data.proficiencies) {
      for (let guildGroup of [`${g1Key}s`, `${g2Key}s`]) {
        const gSelected = guildGroup == `${g1Key}s` ? g1Value : g2Value;
        for (let extended of [true, false]) {
          result = this.skillsToObj({result, guildGroup, gSelected, proficiency, extended})
        }
      }
    }
    return Object.values(result);
  }

  render() {
    const {
      g1Label,
      g2Label,
      g1Key,
      g2Key,
      g1Value,
      g2Value,
      classes,
    } = this.props;
    return (
      <Paper square className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>
                {g1Label} Skills
              </TableCell>
              <TableCell className={classes.cell}/>
              <TableCell className={classes.cell}>
                {g2Label} Skills
              </TableCell>
              <TableCell className={classes.cell}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.mungeSkills().map(row => (
              <TableRow key={row.id}>
                <TableCell className={classes.cell} component="th" scope="row">
                  {row[`${g1Key}sSkill`]}
                </TableCell>
                <TableCell className={classes.cell}>{row[`${g1Key}sSkillLevel`]}</TableCell>
                <TableCell className={classes.cell}>{row[`${g2Key}sSkill`]}</TableCell>
                <TableCell className={classes.cell}>{row[`${g2Key}sSkillLevel`]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(SkillCompareTable);

