// 노드 추가 타입
export interface INodeType {
  title: string; // 노드명
  desc: string; // 설명글
  alarm: string; // 노드알람
  alarmCount: number; // 노드 알람 갯수
  image: string; // 노드 이미지
  color: string; // 노드 색상
  flow: string; // 트리 구조 방향 설정
  type: string; // 노드 타입 설정
}
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
  // setToggleEditNode: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
}
