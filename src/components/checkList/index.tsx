
import './checkList.less';

import _List from './checkList';
import { CheckListItem } from './checkListItem';

export type { CheckListProps } from './checkList';
export type { CheckListItemProps } from './checkListItem';

type CheckListCompoundComponent = {
  Item: typeof CheckListItem;
};
const ListComp: any = _List;
ListComp.Item = CheckListItem;
const CheckList: typeof _List & CheckListCompoundComponent = ListComp;

export default CheckList;
