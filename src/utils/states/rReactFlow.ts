import { RecoilEnv, atom } from "recoil";
import { IEdgeOptionsType } from "../type/interface";

// Duplicate atom key 에러 메시지 삭제
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// 간선 스타일 설정
export const rEdgeOptions = atom<IEdgeOptionsType>({
  key: "r_edge_options",
  default: { baseEdge: "bezier" },
});
