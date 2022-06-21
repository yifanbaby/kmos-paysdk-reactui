import './list.less';

import { List as _List } from './list';
import { Item } from './listItem';

export type { ListProps } from './list';
export type { ListItemProps } from './listItem';

type ListCompoundComponent = {
  Item: typeof Item;
};
const ListComp: any = _List;
ListComp.Item = Item;
const List: typeof _List & ListCompoundComponent = ListComp;

export default List;
