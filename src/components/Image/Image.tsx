import React from "react";
import styled from "styled-components";

const ImageStyled = styled.img<React.HTMLProps<HTMLImageElement>>`
    max-width: 8rem;
    height: 100%;
`

const Image = (props: React.HTMLProps<HTMLImageElement>) => (
    <ImageStyled {...props} />
)

export default Image;