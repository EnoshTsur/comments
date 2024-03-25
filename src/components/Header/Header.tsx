import React from "react";
import styled from "styled-components";

interface HeaderProps {
  readonly text: string;
  readonly style?: React.CSSProperties;
}

const HeaderText = styled.header`
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  padding: 0.5rem 0;
`;

const Header = ({ text, style = {} }: HeaderProps) => {
  return <HeaderText style={{ ...style }}>{text}</HeaderText>;
};

export default Header;
