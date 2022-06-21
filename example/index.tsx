import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ModalTest } from './components/modal';
import { PayListTest } from './components/payList';
import { PCPayList } from './components/pc/payList';
import MarkTest from './components/mark/markTest';
// import VlcPayCashier from './components/vlc/payCashier'
// import VlcMaterialGoods from './components/vlc/materialGoods'
import VlcPayCashier from './components/vlc/vlc'
import { PaySdk, Toast } from '../src';

PaySdk.init('test', {
  onError: (msg: string) => {
    Toast.show(msg);
  },
});

const App = () => {
  return (
    <div>
       {/* <ModalTest /> */}
      {/* <PayListTest />
      <MarkTest /> */}
      {/* <PCPayList /> */}
      { <VlcPayCashier />}
      {/* { <VlcMaterialGoods />} */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
