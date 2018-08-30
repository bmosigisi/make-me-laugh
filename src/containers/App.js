import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { categoriesFetching } from '../selectors';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
};

const mapStateToProps = (state) => {
  return {
    loading: categoriesFetching(state),
  };
};

class App extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { classes, loading } = this.props;

    return (
      <div className={classes.root}>
        { loading && <CircularProgress /> }
        { !loading && <Typography> Hey there laughter </Typography> }
      </div>
    );
  }
}

const styledApp = withStyles(styles)(App);
export default connect(mapStateToProps)(styledApp);
