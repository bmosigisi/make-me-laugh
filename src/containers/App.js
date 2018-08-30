import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { categoriesFetching } from '../selectors';
import Categories from '../containers/Categories';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100vh',
    backgroundColor: theme.palette.secondary['600'],
  },
  progressIcon: {
    marginTop: theme.space.unit * 10,
  },
});

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
        { loading && <CircularProgress className={classes.progressIcon} /> }
        { !loading && <Categories /> }
      </div>
    );
  }
}

const styledApp = withStyles(styles)(App);
export default connect(mapStateToProps)(styledApp);
