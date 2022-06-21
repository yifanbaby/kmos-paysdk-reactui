import { PaySdk } from '@kkb/kmos-paysdk-utils';

import './design';

export { PaySdk };

export { getAppId } from './utils/getAppId';

export { getToken } from './utils/getToken';

export { getPassportAppId } from './utils/getPassportAppId';

export { getHostName } from './utils/getHost';

export { default as pay } from './utils/pay';

export { default as Button } from './components/button';

export { default as Icon } from './components/icon';

export { default as Modal } from './components/modal';

export { default as List } from './components/list';

export { default as CheckList } from './components/checkList';

export { default as Toast } from './components/toast';

export { default as Mask } from './components/mask';

export { default as PayList } from './components/payList';

export { default as VlcPayCashier } from './Vlc/index';

export { default as RightsList } from './components/rightsList';

export { default as PayConfirm } from './components/payConfirm/index';

export { default as VuePayConfirm } from './vue/vuePayConfirm';
export { default as VueModal } from './vue/vueModal';

export * from './pc';
