import { RecoilEnv, atom } from "recoil";

// Duplicate atom key 에러 메시지 삭제
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// 선택한 간선의 id값 저장
export const rSelectEdgeId = atom<string>({
  key: "r_select_edge_id",
  default: "",
});
