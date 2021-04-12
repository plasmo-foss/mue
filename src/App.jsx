import React from 'react';

import Background from './components/widgets/background/Background';
import Widgets from './components/widgets/Widgets';
import Modals from './components/modals/Modals';

import EventBus from './modules/helpers/eventbus';
import SettingsFunctions from './modules/helpers/settings';

import { ToastContainer } from 'react-toastify';

export default class App extends React.PureComponent {
  componentDidMount() {
    if (!localStorage.getItem('firstRun')) {
      SettingsFunctions.setDefaultSettings();
    }

    SettingsFunctions.loadSettings();

    EventBus.on('refresh', (data) => {
      if (data === 'other') {
        SettingsFunctions.loadSettings(true);
      }
    });
  }

  render() {
    return (
      <>
        <Background/>
        <ToastContainer position='bottom-right' autoClose={localStorage.getItem('toastDisplayTime') || 2500} newestOnTop={true} closeOnClick pauseOnFocusLoss/>
        <div id='center'>
          <Widgets/>
          <Modals/>
        </div>
      </>
    );
  }
}
