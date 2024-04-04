import Link from "next/link";
import React from "react";

const DashboardWrap = () => {
  return (
    <ul className="list">
      <li>
        <Link href="/default">default</Link>
      </li>
      <li>
        <Link href="/instance">instance</Link>
      </li>
      <li>
        <Link href="/chart">chart</Link>
      </li>
    </ul>
  );
};

export default DashboardWrap;
