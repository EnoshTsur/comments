import React from "react";
import styled from "styled-components";

const InputStyled = styled.input`
    border-radius: 5px;
`

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
    return (
        <InputStyled {...props}  />
    )
}

export default Input