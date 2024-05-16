import { BackgroundVariant, Position } from "reactflow";

// 노드 추가 타입
export interface INodeType {
  title: string; // 노드명
  desc: string; // 설명글
  alarm: string; // 노드알람
  alarmCount: number; // 노드 알람 갯수
  image: string; // 노드 이미지
  color: string; // 노드 색상
  flow: string; // 트리 구조 방향 설정
  type: string | undefined; // 노드 타입 설정
}
// 토폴로지 contextmenu 타입
interface IContextMenuType {
  top: any;
  left: any;
  right: any;
  bottom: any;
}
export interface INodeContextMenuType extends IContextMenuType {
  id: string;
  data: any;
}
export interface IEdgeContextMenuType extends IContextMenuType {
  // id: string;
  // data: any;
}
// 패널 활성화 옵션 타입
export interface IActivePanelType {
  addNodeActive: boolean;
  editNodeActive: boolean;
  editEdgeActive: boolean;
  backgroundActive: boolean;
}
// 배경 수정 타입
export interface IBackgroundType {
  variant: BackgroundVariant;
  color: string;
  gap: number | [number, number] | undefined;
  style: React.CSSProperties;
}
// 간선 스타일 설정 타입
export interface IEdgeOptionsType {
  baseEdge: string;
}
