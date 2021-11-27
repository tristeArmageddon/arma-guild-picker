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
      paddingRight: '4px !important'
    },
    padding: 8,
  },
  titleCell: {
    textTransform: 'capitalize',
    padding: 8,
    backgroundColor: '#aaaaaa21',
    [theme.breakpoints.down('xs')]: {
      padding: 4,
      fontSize: '0.65rem',
      maxWidth: 65,
      paddingRight: '4px !important'
    },
  },
  chip: {
    backgroundColor: 'rgb(48, 48, 48)',
    fontSize: 8,
    marginLeft: 8,
    padding: 2,
    height: 16,
    marginTop: -1,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 3,
      fontSize: 7,
      height: 13,
    },
    '&> span': {
      paddingLeft: 4,
      paddingRight: 4,
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 2,
        paddingRight: 2
      }
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
          label: data.skills[group][foundSkill].label,
        }
      }
    }
  }

  findBranchesFrom({extended, sk, guildGroup, gSelected }) {
    if (!extended) return;
    const branchesFromSk = data[guildGroup][gSelected].branching[sk];
    const {
      group,
      label,
    } = this.findGroupAndLabel(branchesFromSk);
    return data.skills[group][branchesFromSk].label
  }

  skillsToObj({
    guildGroup,
    gSelected,
    proficiency,
    result = {},
    extended = false,
    gNumber = 1,
  }) {
    const proficiencyKey = `${extended ? 'ex': ''}${proficiency}`;
    if (data[guildGroup] && data[guildGroup][gSelected][proficiencyKey]) {
      data[guildGroup][gSelected][proficiencyKey].forEach(sk => {
        const {
          group,
          label,
        } = this.findGroupAndLabel(sk);

        result[group] = result[group] || {};
        result[group][sk] = {
          [`g${gNumber}Skill`]: label,
          [`g${gNumber}SkillLevel`]: proficiency,
          [`g${gNumber}SkillBranchesFrom`]: this.findBranchesFrom({ extended, sk, guildGroup, gSelected }),
          group,
          ...result[group][sk],
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
      for (var i = 0; i < 2; i++) {
        const guildGroup = `${i === 0 ? g1Key : g2Key}s`
        const gSelected = i === 0 ? g1Value : g2Value;
        const gNumber = i + 1;
        for (let extended of [true, false]) {
          result = this.skillsToObj({result, guildGroup, gSelected, proficiency, extended, gNumber})
        }
      }
    }
    return result;
  }

  render() {
    const {
      g1Label,
      g2Label,
      g1Key,
      g2Key,
      classes,
    } = this.props;
    const mungedSkills = this.mungeSkills();
    return (
      <Paper square elevation={3} m={3} className={classes.root}>
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
            {data.skillGroups.map(skillGroup => (
              <>
                <TableRow key={skillGroup}>
                  <TableCell className={classes.titleCell}>
                    {skillGroup}
                  </TableCell>
                  <TableCell className={classes.titleCell} />
                  <TableCell className={classes.titleCell} />
                  <TableCell className={classes.titleCell} />
                </TableRow>
                {mungedSkills[skillGroup] && Object.values(mungedSkills[skillGroup]).map(row => (
                  <TableRow key={row.id}>
                    <TableCell
                      className={classes.cell}
                      style={{
                        backgroundColor: row['g1SkillBranchesFrom'] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                      }}
                    >
                    {
                      row['g1SkillBranchesFrom'] && row['g1Skill']
                      ? (
                        <Tooltip
                          disableFocusListener disableTouchListener 
                          title={`branches from ${row['g1SkillBranchesFrom']}`}
                          aria-label={`branches from ${row['g1SkillBranchesFrom']}`}
                        >
                          <div>
                            {row['g1Skill']}
                          </div>
                        </Tooltip>
                      ) : row['g1Skill']
                    }
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      style={{
                        backgroundColor: row['g1SkillBranchesFrom'] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                      }}
                    >
                    {
                      row['g1SkillBranchesFrom']
                      ? (
                        <Tooltip
                          disableFocusListener disableTouchListener 
                          title={`branches from ${row['g1SkillBranchesFrom']}`}
                          aria-label={`branches from ${row['g1SkillBranchesFrom']}`}
                        >
                          <div>
                            {row['g1SkillLevel']}
                            {row['g1SkillBranchesFrom'] && <Chip className={classes.chip} />}
                          </div>
                        </Tooltip>
                      ) : row['g1SkillLevel']
                    }
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      style={{
                        backgroundColor: row['g2SkillBranchesFrom'] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                      }}
                    >
                    {
                      row['g2SkillBranchesFrom'] && row['g2Skill']
                      ? (
                        <Tooltip
                          disableFocusListener disableTouchListener 
                          title={`branches from ${row['g2SkillBranchesFrom']}`}
                          aria-label={`branches from ${row['g2SkillBranchesFrom']}`}
                        >
                          <div>
                            {row['g2Skill']}
                          </div>
                        </Tooltip>
                      ) : row['g2Skill']
                    }
                    </TableCell>
                    <TableCell
                      className={classes.cell}
                      style={{
                        backgroundColor: row['g2SkillBranchesFrom'] ? 'rgba(255, 236, 179, 0.2)' : 'inherit'
                      }}
                    >
                    {
                      row['g2SkillBranchesFrom']
                      ? (
                        <Tooltip
                          disableFocusListener disableTouchListener 
                          title={`branches from ${row['g2SkillBranchesFrom']}`}
                          aria-label={`branches from ${row['g2SkillBranchesFrom']}`}
                        >
                          <div>
                            {row['g2SkillLevel']}
                            {row['g2SkillBranchesFrom'] && <Chip className={classes.chip} />}
                          </div>
                        </Tooltip>
                      ) : row['g2SkillLevel']
                    }
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
export default withStyles(styles)(SkillCompareTable);

