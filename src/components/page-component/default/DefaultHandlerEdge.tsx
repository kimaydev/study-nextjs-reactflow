import React, { useCallback, useState } from "react";
import PanelLayout from "@/components/layout/PanelLayout";
import { BsBorderStyle } from "react-icons/bs";
import { DefaultRadioButtonStyled } from "@/styles/page-component/default/defaultStyle";
import { IEdgeOptionsType } from "@/utils/type/interface";
import { Edge, useEdges, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { rSelectEdgeId } from "@/utils/states/rReactFlow";

interface IDefaultHandlerEdgeProps {
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}
// 간선 수정 기본값
const initialEdge: IEdgeOptionsType = {
  baseEdge: "bezier",
};

const DefaultHandlerEdge = ({ edges, setEdges }: IDefaultHandlerEdgeProps) => {
  const { getEdge } = useReactFlow();
  const getSelectEdgeId = useRecoilValue(rSelectEdgeId);
  // console.log("선택한 간선의 id", getSelectEdgeId);
  const [editEdge, setEditEdge] = useState<IEdgeOptionsType>(initialEdge);
  // 간선 형태 설정
  const edgePathArr: string[] = ["straight", "step", "smoothstep", "bezier"];
  const handleEdgePath = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditEdge(prev => {
      return {
        ...prev,
        baseEdge: value,
      };
    });
  };
  // console.log("getEdge", getEdge(getSelectEdgeId));
  const handleEditEdge = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const selectEdgeId = getEdge(getSelectEdgeId);
      // console.log("selectEdgeId", selectEdgeId?.id);
      setEdges(edges =>
        edges.map(edge => {
          if (edge.id === selectEdgeId?.id) {
            edge.data = {
              ...edge.data,
              baseEdge: editEdge.baseEdge,
            };
          }
          return edge;
        }),
      );
    },
    [editEdge, getSelectEdgeId],
  );
  // console.log("edges", edges);
  // console.log("edgeOptions", edgeOptions);
  return (
    <PanelLayout>
      <>
        <h2>
          <i>
            <BsBorderStyle />
          </i>
          간선 수정
        </h2>
        <form onSubmit={handleEditEdge}>
          <div className="form-wrapper">
            <ul>
              <li>
                <div className="form-box">
                  <span className="form-item-title">간선 형태</span>
                  <DefaultRadioButtonStyled>
                    <ul>
                      {edgePathArr.map((item, index) => {
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="EdgeOptions"
                              id={item}
                              value={item}
                              checked={editEdge.baseEdge === item}
                              onChange={handleEdgePath}
                            />
                            <label htmlFor={item}>{item}</label>
                          </li>
                        );
                      })}
                    </ul>
                  </DefaultRadioButtonStyled>
                </div>
              </li>
            </ul>
          </div>
          <button className="submit-button" type="submit">
            간선 수정
          </button>
        </form>
      </>
    </PanelLayout>
  );
};

export default DefaultHandlerEdge;
