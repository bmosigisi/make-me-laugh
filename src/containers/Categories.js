import { List } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiTypography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { categories } from '../selectors';

const styles = {
  root: {},
};

const mapStateToProps = state => ({
  categories: categories(state),
});

class Categories extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    categories: PropTypes.instanceOf(List).isRequired,
  };

  render() {
    const { classes, categories } = this.props;

    return (
      <div className={classes.root}>
        <MuiTypography variant="headline">Select a category</MuiTypography>
        <MuiList>
          { categories.valueSeq().map(category => (
            <MuiListItem button key={category}>
              <MuiListItemText primary={category} />
            </MuiListItem>
          ))}
        </MuiList>
      </div>
    );
  }
}

const styledApp = withStyles(styles)(Categories);
export default connect(mapStateToProps)(styledApp);
