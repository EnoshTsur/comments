import React, { useState } from "react";
import styled from "styled-components";
import Image from "../Image/Image";
import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import CommentModel from "../../model/comment.model";
import { useAppDispatch } from "../../redux/store/configureStore";
import { ActionType } from "../../redux/actions/commentActions";
import FormArea from "../Form/FormArea/FormArea";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

const EditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hover = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const FlexWrapperStyled = styled.div`
  background-color: white;
  display: flex;
  border-radius: 5px;
`;

const TextWrapperStyled = styled.div`
  flex-basis: 85%;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  flex-basis: 15%;
`;

const NameStyled = styled.span`
  font-weight: 600;
`;

const editStyle = { fontSize: "26px", color: "orange", padding: "0 2px" };

interface PanelButtonProps {
  readonly onClick: () => void
}

const EditButton = ({ onClick }: PanelButtonProps) => (
  <Hover>
    <TiEdit onClick={onClick} style={editStyle} />
  </Hover>
);

const DeleteButton = ({ onClick }: PanelButtonProps) => (
  <Hover>
    <MdDelete onClick={onClick} style={editStyle} />
  </Hover>
);

const Comment = ({ id, name, comment, image: { src, alt }}: CommentModel) => {
  const disptach = useAppDispatch();

  const [isMouseEntered, setMouseEntered] = useState<boolean>(false);

  return (
    <>
      <FlexWrapperStyled
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
      >
        <ImageWrapper>
          <Image src={src} alt={alt} />
        </ImageWrapper>
        <TextWrapperStyled>
          <HeaderWrapper>
            <NameStyled>{name}</NameStyled>
            {isMouseEntered && (
              <EditWrapper>
                <EditButton 
                  onClick={() => disptach({ type: ActionType.SET_SELECTED_COMMENT, payload: { id }})}
                />
                <DeleteButton
                  onClick={() =>
                    disptach({ type: ActionType.DELETE_COMMENT, payload: { id, name, comment, image: { src, alt}} })
                  }
                />
              </EditWrapper>
            )}
          </HeaderWrapper>
          <p>{comment}</p>
        </TextWrapperStyled>
      </FlexWrapperStyled>
      { true && <FormArea id={id} /> }
    </>
  );
};

export default Comment;
