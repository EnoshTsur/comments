import React from "react";
import styled from "styled-components";

const TextAreaStyled = styled.textarea`
    border-radius: 5px;
`

const TextArea = (props: React.HTMLProps<HTMLTextAreaElement>) => {
    return (
        <TextAreaStyled {...props}  />
    )
}

export default TextArea