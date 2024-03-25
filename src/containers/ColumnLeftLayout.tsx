import React from "react";
import styled from "styled-components";

const ColumnLeftLayoutStyled = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-gap: 1rem;
    background-color: white;
    border-radius: 5px;
    padding: 1rem;
`

interface ColumnLeftLayoutProps {
    readonly children: React.ReactNode
    readonly style?: React.CSSProperties
}

const ColumnLeftLayout = ({ children, style = {} }: ColumnLeftLayoutProps) => (
    <ColumnLeftLayoutStyled style={{...style}} >
        {children}
    </ColumnLeftLayoutStyled>
)

export default ColumnLeftLayout