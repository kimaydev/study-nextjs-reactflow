// 토폴로지 contextmenu 타입
export interface INodeContextMenuType {
  id: string;
  data: any;
  top: any;
  left: any;
  right: any;
  bottom: any;
}
export interface INodeContextMenuPropsType extends INodeContextMenuType {
  setToggleEditNode: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}
