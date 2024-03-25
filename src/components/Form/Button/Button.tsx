import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button<ButtonProps>`
  background-color: ${({ disabled }) =>
    disabled ? "#d3d3d3" : "rgb(255, 117, 58)"};
  color: white;
  font-weight: 600;
  justify-self: baseline;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  &:hover {
    opacity: ${({ disabled }) => (disabled ? "" : "0.8")};
    cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  }
`;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, disabled, ...props }: ButtonProps) => (
  <ButtonStyled disabled={disabled} {...props}>
    {children}
  </ButtonStyled>
);

export default Button;
