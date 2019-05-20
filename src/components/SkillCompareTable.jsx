import React, { Component }from 'react'
import { withStyles } from '@material-ui/core/styles';
import data from '../data/data.json'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
  cell: {
    width: '25%',
    [theme.breakpoints.down('xs')]: {
      padding: 4,
      fontSize: '0.65rem',
      maxWidth: 65,
    },
    padding: 8,
  },
  chip: {
    backgroundColor: 'rgb(48, 48, 48)',
    fontSize: 8,
    marginLeft: 8,
    padding: 2,
    height: 16,
    marginTop: -1,
    '&> span': {
      paddingLeft: 4,
      paddingRight: 4,
    },
    '&> span::after': {
      content: '"BRANCH"',
      [theme.breakpoints.down('xs')]: {
          content: '"B"',
      }
    }
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
          [`${guildGroup}SkillBranchesFrom`]: extended && data.skills[group][data[guildGroup][gSelected].branching[sk]],
          group,
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
        const gSelected = guildGroup === `${g1Key}s` ? g1Value : g2Value;
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
      classes,
    } = this.props;
    console.log(this.mungeSkills())
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
                <TableCell
                  className={classes.cell}
                  style={{
                    backgroundColor: row[`${g1Key}sSkillBranchesFrom`] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                  }}
                >
                {
                  row[`${g1Key}sSkillBranchesFrom`] && row[`${g1Key}sSkill`]
                  ? (
                    <Tooltip
                      title={`branches from ${row[`${g1Key}sSkillBranchesFrom`]}`}
                      aria-label={`branches from ${row[`${g1Key}sSkillBranchesFrom`]}`}
                    >
                      <div>
                        {row[`${g1Key}sSkill`]}
                      </div>
                    </Tooltip>
                  ) : row[`${g1Key}sSkill`]
                }
                </TableCell>
                <TableCell
                  className={classes.cell}
                  style={{
                    backgroundColor: row[`${g1Key}sSkillBranchesFrom`] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                  }}
                >
                {
                  row[`${g1Key}sSkillBranchesFrom`]
                  ? (
                    <Tooltip
                      title={`branches from ${row[`${g1Key}sSkillBranchesFrom`]}`}
                      aria-label={`branches from ${row[`${g1Key}sSkillBranchesFrom`]}`}
                    >
                      <div>
                        {row[`${g1Key}sSkillLevel`]}
                        {row[`${g1Key}sSkillBranchesFrom`] && <Chip className={classes.chip} />}
                      </div>
                    </Tooltip>
                  ) : row[`${g1Key}sSkillLevel`]
                }
                </TableCell>
                <TableCell
                  className={classes.cell}
                  style={{
                    backgroundColor: row[`${g2Key}sSkillBranchesFrom`] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                  }}
                >
                {
                  row[`${g2Key}sSkillBranchesFrom`] && row[`${g2Key}sSkill`]
                  ? (
                    <Tooltip
                      title={`branches from ${row[`${g2Key}sSkillBranchesFrom`]}`}
                      aria-label={`branches from ${row[`${g2Key}sSkillBranchesFrom`]}`}
                    >
                      <div>
                        {row[`${g2Key}sSkill`]}
                      </div>
                    </Tooltip>
                  ) : row[`${g2Key}sSkill`]
                }
                </TableCell>
                <TableCell
                  className={classes.cell}
                  style={{
                    backgroundColor: row[`${g2Key}sSkillBranchesFrom`] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                  }}
                >
                {
                  row[`${g2Key}sSkillBranchesFrom`]
                  ? (
                    <Tooltip
                      title={`branches from ${row[`${g2Key}sSkillBranchesFrom`]}`}
                      aria-label={`branches from ${row[`${g2Key}sSkillBranchesFrom`]}`}
                    >
                      <div>
                        {row[`${g2Key}sSkillLevel`]}
                        {row[`${g2Key}sSkillBranchesFrom`] && <Chip className={classes.chip} />}
                      </div>
                    </Tooltip>
                  ) : row[`${g2Key}sSkillLevel`]
                }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(SkillCompareTable);

