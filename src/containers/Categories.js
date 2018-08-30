import { List } from 'immutable';
import MuiAvatar from '@material-ui/core/Avatar';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiList from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiTypography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { triggerFetchJoke, triggerOpenDialog } from '../actions';
import Transition from '../components/DialogTransition';
import {
  categories,
  dialogOpen,
  getActiveJokeText,
  getActiveJokeIconUrl,
  getIsFetchingJoke,
} from '../selectors';

const styles = theme => ({
  root: {},
  dialogPaper: {},
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignedLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    margin: theme.space.unit * 4,
  },
});

const mapStateToProps = state => ({
  categories: categories(state),
  dialogOpen: dialogOpen(state),
  activeJoke: getActiveJokeText(state),
  activeJokeIconUrl: getActiveJokeIconUrl(state),
  isFetchingJoke: getIsFetchingJoke(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    triggerFetchJoke: bindActionCreators(triggerFetchJoke, dispatch),
    triggerOpenDialog: bindActionCreators(triggerOpenDialog, dispatch),
  };
};


class Categories extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    categories: PropTypes.instanceOf(List).isRequired,
    activeJoke: PropTypes.string,
    activeJokeIconUrl: PropTypes.string,
    dialogOpen: PropTypes.bool.isRequired,
    isFetchingJoke: PropTypes.bool.isRequired,
    triggerFetchJoke: PropTypes.func.isRequired,
    triggerOpenDialog: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeJoke: '',
    activeJokeIconUrl: '',
  };

  handleListItemClick(category) {
    const { triggerFetchJoke, triggerOpenDialog } = this.props;

    triggerOpenDialog(true);
    triggerFetchJoke(category);
  }

  handleDialogClose() {
    const { triggerOpenDialog } = this.props;

    triggerOpenDialog(false);
  }

  renderJokeDialog() {
    const { classes, dialogOpen, activeJoke, activeJokeIconUrl, isFetchingJoke } = this.props;

    return (
      <MuiDialog
        open={dialogOpen}
        onClose={this.handleDialogClose.bind(this)}
        classes={{
          paper: classes.dialogPaper,
        }}
        TransitionComponent={Transition}
        keepMounted
      >
        <MuiDialogTitle className={classes.centered}>Chuck Norris Fact</MuiDialogTitle>
        <MuiDialogContent className={classes.alignedLeft}>
          {isFetchingJoke && <MuiCircularProgress />}
          {!isFetchingJoke && (
            <Fragment>
              <MuiAvatar
                alt="Chuck Norris"
                src={activeJokeIconUrl}
                className={classes.avatar}
              />
              <MuiDialogContentText>
                {activeJoke}
              </MuiDialogContentText>
            </Fragment>
          )}
        </MuiDialogContent>
      </MuiDialog>
    );
  }

  render() {
    const { classes, categories } = this.props;

    return (
      <div className={classes.root}>
        <MuiTypography variant="headline">Select a category</MuiTypography>
        <MuiList>
          { categories.valueSeq().map(category => (
            <MuiListItem button key={category} onClick={this.handleListItemClick.bind(this, category)}>
              <MuiListItemText primary={category} />
            </MuiListItem>
          ))}
        </MuiList>
        { this.renderJokeDialog() }
      </div>
    );
  }
}

const styledApp = withStyles(styles)(Categories);
export default connect(mapStateToProps, mapDispatchToProps)(styledApp);
