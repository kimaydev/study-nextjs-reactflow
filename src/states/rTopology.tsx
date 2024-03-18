import { Node } from "reactflow";
import { RecoilEnv, atom } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

// 토폴로지 - 노드
export const rNodes = atom<Node[]>({
  key: "rNodes",
  default: [],
});
