import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography>
          Hey there laughter
        </Typography>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default withStyles(styles)(App);
