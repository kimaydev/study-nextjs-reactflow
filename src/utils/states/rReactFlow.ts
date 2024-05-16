import { atom } from "recoil";
import { IEdgeOptionsType } from "../type/interface";

// 간선 스타일 설정
export const rEdgeOptions = atom<IEdgeOptionsType>({
  key: "r_edge_options",
  default: { baseEdge: "bezier" },
});
