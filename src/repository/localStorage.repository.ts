import { pipe } from "fp-ts/lib/function";
import * as O from 'fp-ts/Option'
import CommentModel from "../model/comment.model";

const COMMENTS_KEY = 'COMMENTS'

const commentKeys: ReadonlyArray<keyof CommentModel> = ['id', 'name', 'comment', 'image', 'isSelected']

const isComments = (comments: any): comments is ReadonlyArray<CommentModel> => 
  Array.isArray(comments) && comments.every(
    (comment) => typeof comment === 'object' && commentKeys.every((key) => comment[key] != null)
)

export const getCommentsFromStorage = () => pipe(
    localStorage.getItem(COMMENTS_KEY),
    O.fromNullable,
    O.map(JSON.parse),
    O.filter(isComments),
)

export const setCommentsOnStorage = (comments: ReadonlyArray<CommentModel>) => 
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments))