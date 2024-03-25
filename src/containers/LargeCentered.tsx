import React from "react";
import styled from "styled-components";

const LargeStyled = styled.div`
    max-width: 50rem;
    margin: 0 auto;
`

interface LargeWrapperProps {
    readonly children: React.ReactNode
}

const LargeCentered = ({ children}: LargeWrapperProps) => (
    <LargeStyled>
        {children}
    </LargeStyled>
)

export default LargeCentered;