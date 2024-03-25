import React, { useCallback, useMemo } from "react";
import ColumnLeftLayout from "../../../containers/ColumnLeftLayout";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import useFormManager from "../../../hooks/useFormManager";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store/configureStore";
import { ActionType } from "../../../redux/actions/commentActions";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";

interface FormAreaProps {
  readonly id?: number;
}

const FormArea = ({ id: commentId }: FormAreaProps) => {
  const dispatch = useAppDispatch();

  const comment = useAppSelector(({ comments }) =>
    comments.find(({ id }) => id === commentId)
  );

  const isSelectedComment = useMemo(
    () =>
      pipe(
        comment,
        O.fromNullable,
        O.map(({ isSelected }) => isSelected),
        O.getOrElse(() => false)
      ),
    [comment]
  );

  const isOpen = useMemo(() => isSelectedComment || comment == null, [comment, isSelectedComment]);

  const initialState = useMemo(
    () =>
      pipe(
        comment,
        O.fromNullable,
        O.map(({ name, comment, image: { src } }) => ({
          name,
          comment,
          image: src,
        })),
        O.getOrElseW(() => ({ name: "", comment: "", image: "" }))
      ),
    [comment]
  );

  const {
    state,
    onInputTextChange,
    onTextAreaChange,
    onInputFileChange,
    isValidForm,
  } = useFormManager(initialState);

  const onSubmit = useCallback(() => {
    if (isValidForm(["name", "comment"])) {
      dispatch({
        type: isSelectedComment
          ? ActionType.UPDATE_COMMENT
          : ActionType.ADD_COMMENT,
        payload: {
          id: comment?.id,
          isSelected: false,
          name: state.name,
          comment: state.comment,
          image: {
            src: state.image ?? "",
            alt: state.name,
          },
        },
      });
    }
  }, [state, isSelectedComment, isValidForm, comment?.id, dispatch]);

  return isOpen ? (
    <ColumnLeftLayout>
      <Input
        type="text"
        placeholder="Your Name"
        name="name"
        value={state.name}
        onChange={onInputTextChange}
      />
      <TextArea
        placeholder="Your Comment"
        name="comment"
        value={state.comment}
        onChange={onTextAreaChange}
      />
      <Input
        type="file"
        placeholder="Your Image"
        name="image"
        onChange={onInputFileChange}
      />
      <Button onClick={onSubmit} disabled={!isValidForm(["name", "comment"])}>
        {isSelectedComment ? "Update" : "Add"}
      </Button>
    </ColumnLeftLayout>
  ) : (
    <></>
  );
};

export default FormArea;
