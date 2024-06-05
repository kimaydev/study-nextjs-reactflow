import React from "react";
import Link from "next/link";
import { HeaderStyled } from "@/styles/common/headerStyle";

const Header = () => {
  return (
    <HeaderStyled>
      <nav>
        <ul className="list">
          <li>
            <Link href="/">default</Link>
          </li>
          <li>
            <Link href="/instance">instance</Link>
          </li>
          <li>
            <Link href="/chart">chart</Link>
          </li>
          <li>
            <Link href="/background">background</Link>
          </li>
        </ul>
      </nav>
    </HeaderStyled>
  );
};

export default Header;
