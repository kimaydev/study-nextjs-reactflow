export type valuesType = {
  [key: string]: string;
};
// 노드 이미지, alt
export const getImage = (value: string) => {
  const values: valuesType = {
    demoOne: "icon_demo_001.png",
    demoTwo: "icon_demo_002.png",
    demoThree: "icon_demo_003.png",
  };
  return values[value];
};
export const getImageAlt = (value: string) => {
  const values: valuesType = {
    demoOne: "이미지01",
    demoTwo: "이미지02",
    demoThree: "이미지03",
  };
  return values[value];
};
