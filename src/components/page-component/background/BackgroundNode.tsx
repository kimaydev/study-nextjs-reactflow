import React from "react";
import Image from "next/image";

const BackgroundNode = () => {
  return (
    <>
      <Image
        src="/assets/images/background.png"
        width={1274}
        height={795}
        priority={true}
        alt="배경이미지"
      />
    </>
  );
};

export default React.memo(BackgroundNode);
