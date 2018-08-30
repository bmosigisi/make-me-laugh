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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: theme.space.unit * 4,
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
        { loading && <CircularProgress /> }
        { !loading && <Categories /> }
      </div>
    );
  }
}

const styledApp = withStyles(styles)(App);
export default connect(mapStateToProps)(styledApp);
