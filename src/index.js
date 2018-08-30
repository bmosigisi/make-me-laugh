import { create } from 'jss';
import { MuiThemeProvider, jssPreset } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';

import App from './containers/App';
import theme from './lib/theme';
import rootSaga from './sagas';
import buildStore from './store';

const jss = create(jssPreset());
jss.setup({ insertionPoint: document.head });

class Root extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <JssProvider jss={jss}>
          <MuiThemeProvider theme={theme}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </Provider>
    );
  }
}

const store = buildStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <Root
    store={store}
  />,
  document.getElementById('root'),
);
