import React from "react";
import Header from "../../components/Header/Header";
import LargeWrapper from "../../containers/LargeCentered";
import ColumnLeftLayout from "../../containers/ColumnLeftLayout";
import Comment from "../../components/Comment/Comment";
import { useAppSelector } from "../../redux/store/configureStore";
import useInitState from "../../hooks/useInitState";
import FormArea from "../../components/Form/FormArea/FormArea";

const Reviews = () => {
  useInitState();

  const comments = useAppSelector(({ comments }) => comments);

  return (
    <LargeWrapper>
      <Header text="Reviews" />
      <ColumnLeftLayout style={{ backgroundColor: "black" }}>
        {comments.map(
          ({ id, isSelected, name, comment, image: { src, alt } }) => (
            <Comment
              isSelected={isSelected}
              id={id}
              key={id}
              name={name}
              comment={comment}
              image={{ src, alt }}
            />
          )
        )}
        <FormArea />
      </ColumnLeftLayout>
    </LargeWrapper>
  );
};

export default Reviews;
