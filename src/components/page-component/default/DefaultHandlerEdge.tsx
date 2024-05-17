import React, { useCallback, useEffect, useState } from "react";
import PanelLayout from "@/components/layout/PanelLayout";
import { BsBorderStyle } from "react-icons/bs";
import { DefaultRadioButtonStyled } from "@/styles/page-component/default/defaultStyle";
import { IEdgeOptionsType } from "@/utils/type/interface";
import { Edge, useEdges, useReactFlow } from "reactflow";
import { useRecoilValue } from "recoil";
import { rSelectEdgeId } from "@/utils/states/rReactFlow";
import { valuesType } from "@/hooks/useTrans";

interface IDefaultHandlerEdgeProps {
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}
// 간선 수정 기본값
const initialEdge: IEdgeOptionsType = {
  animated: false,
  data: { baseEdge: "bezier" },
};

const DefaultHandlerEdge = ({ edges, setEdges }: IDefaultHandlerEdgeProps) => {
  const { getEdge } = useReactFlow();
  const getSelectEdgeId = useRecoilValue(rSelectEdgeId);
  const selectEdgeValue = getEdge(getSelectEdgeId);
  // console.log("selectEdgeValue", selectEdgeValue);
  // console.log("선택한 간선의 id", getSelectEdgeId);
  const [editEdge, setEditEdge] = useState<IEdgeOptionsType>(initialEdge);
  // 간선 형태 설정
  const edgePathArr: string[] = ["straight", "step", "smoothstep", "bezier"];
  const handleEdgePath = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditEdge(prev => {
      return {
        ...prev,
        data: {
          ...prev.data,
          baseEdge: value,
        },
      };
    });
  };
  // 애니메이션 효과 설정
  const edgeAnimatedArr: boolean[] = [true, false];
  const handleEdgeAnimated = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = JSON.parse(e.target.value);
    setEditEdge(prev => {
      return {
        ...prev,
        animated: value,
      };
    });
  };
  useEffect(() => {
    const selectEdgeData = selectEdgeValue?.data;
    setEditEdge(prev => {
      return {
        ...prev,
        animated: selectEdgeValue?.animated,
        data: {
          ...prev.data,
          baseEdge: selectEdgeData?.baseEdge,
        },
      };
    });
  }, [getSelectEdgeId]);
  const handleEditEdge = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const selectEdgeId = selectEdgeValue?.id;
      // console.log("selectEdgeId", selectEdgeId);
      setEdges(edges =>
        edges.map(edge => {
          if (edge.id === selectEdgeId) {
            (edge.animated = editEdge.animated),
              (edge.data = {
                ...edge.data,
                baseEdge: editEdge.data.baseEdge,
              });
          }
          return edge;
        }),
      );
    },
    [editEdge, getSelectEdgeId],
  );
  // console.log("editEdge", editEdge);
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
                              checked={editEdge.data.baseEdge === item}
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
              <li>
                <div className="form-box">
                  <span className="form-item-title">애니메이션 효과</span>
                  <DefaultRadioButtonStyled>
                    <ul>
                      {edgeAnimatedArr.map((item, index) => {
                        const transItem = item.toString();
                        const transKR = () => {
                          const values: valuesType = {
                            true: "활성화",
                            false: "비활성화",
                          };
                          return values[transItem];
                        };
                        return (
                          <li key={index}>
                            <input
                              type="radio"
                              name="EdgeAnimated"
                              id={transItem}
                              value={transItem}
                              checked={editEdge.animated === item}
                              onChange={handleEdgeAnimated}
                            />
                            <label htmlFor={transItem}>{transKR()}</label>
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
