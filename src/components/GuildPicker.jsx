import React from 'react'
import { withTheme } from '@material-ui/core/styles';
import data from '../data/data.json'

const GuildPicker = () => JSON.stringify(data)
export default withTheme()(GuildPicker);
