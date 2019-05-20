import React, { Component }from 'react'
import { withStyles } from '@material-ui/core/styles';
import data from '../data/data.json'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import SkillCompareTable from './SkillCompareTable';
import PerkCompareTable from './PerkCompareTable';
import LanguageCompareTable from './LanguageCompareTable';

const styles = (theme) => ({
  container: {
    flexGrow: 1,
  },
  formControl: {
    width: 'calc(100% - 1rem)',
    marginRight: '1rem',
  }
});
class GuildCompare extends Component {
  state = {
    guild1: 'enforcer',
    guild2: 'infiltrator',
  }

  toggleSelection = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      classes
    } = this.props;
    const {
      guild1,
      guild2,
    } = this.state;
    const tableConfig = {
      g1Label: "Guild 1",
      g2Label: "Guild 2",
      g1Key: "guild",
      g2Key: "guild",
      g1Value: guild1,
      g2Value: guild2,
    };
    return (
      <>
        <Grid container justify="center" spacing={16} className={classes.container}>
          <Grid item xs={12} sm={6}>
            <FormHelperText>Guild</FormHelperText>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.guild1}
                onChange={this.toggleSelection}
                inputProps={{
                  name: 'guild1',
                  id: 'guild1-select',
                }}
              >
                {Object.keys(data.guilds).map(gKey => (
                  <MenuItem value={gKey}>
                    {data.guilds[gKey].label}
                    {data.guilds[gKey].karma ? ` (${data.guilds[gKey].karma})` : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormHelperText>Subguild</FormHelperText>
            <FormControl className={classes.formControl}>
              <Select
                className={classes.select}
                value={this.state.guild2}
                onChange={this.toggleSelection}
                inputProps={{
                  name: 'guild2',
                  id: 'guild2-select',
                }}
              >
                {Object.keys(data.guilds).map(gKey => (
                  <MenuItem value={gKey}>
                    {data.guilds[gKey].label}
                    {data.guilds[gKey].karma ? ` (${data.guilds[gKey].karma})` : ''}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={16} className={classes.container}>
          <Grid item xs={12} lg={6}>
            <SkillCompareTable
              {...tableConfig}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={16} className={classes.container}>
              <Grid item xs={12}>
                <PerkCompareTable
                  {...tableConfig}
                />
              </Grid>
              <Grid item xs={12}>
                <LanguageCompareTable
                  {...tableConfig}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}
export default withStyles(styles)(GuildCompare);
