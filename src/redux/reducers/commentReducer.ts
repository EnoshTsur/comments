import { pipe } from "fp-ts/lib/function";
import CommentModel from "../../model/comment.model";
import { ActionComment, ActionType } from "../actions/commentActions";
import { initialState } from "../store/configureStore";
import * as A from 'fp-ts/ReadonlyArray'
import { setCommentsOnStorage } from "../../repository/localStorage.repository";

const idGenerator = () => {
    let id = 1
    return () => id++
}

const generator = idGenerator()

const isSingleComment = (payload: CommentModel | ReadonlyArray<CommentModel>): payload is CommentModel => !Array.isArray(payload)

const commentReducer = (state = initialState, { type, payload }: ActionComment) => {
    switch(type) {
        case ActionType.SET_INNIT_COMMENTS:
            if (!isSingleComment(payload)){
                const newState =  {
                    ...state,
                    comments: pipe(
                        payload,
                        A.map((comment) => ({ ...comment, id: generator() }))
                    ),
                }
                console.log(newState)
                setCommentsOnStorage(newState.comments)
                return newState
            }
            return state
        case ActionType.ADD_COMMENT:
            if (isSingleComment(payload)){
                const newState = {
                    ...state,
                    comments: [ ...state.comments, { ...payload, id: generator() } ]  
                }
                setCommentsOnStorage(newState.comments)
                return newState
            } 
            return state
        case ActionType.DELETE_COMMENT:
            if (isSingleComment(payload)) {
                const newState = {
                    ...state,
                    comments: pipe(
                        state.comments,
                        A.filter(({ id }) => id !== payload.id)
                    )
                }
                setCommentsOnStorage(newState.comments)
                return newState
            }
            return state
        case ActionType.SET_SELECTED_COMMENT:
            if (isSingleComment(payload)) {
                const newState = {
                    ...state,
                    comments: pipe(
                        state.comments,
                        A.map((comment) => comment.id === payload.id 
                          ? {...comment, isSelected: !comment.isSelected} 
                          : {...comment, isSelected: false}
                        )
                    )
                }
                setCommentsOnStorage(newState.comments)
                return newState
            }
            return state;
        case ActionType.UPDATE_COMMENT:
            if (isSingleComment(payload)) {
                const newState = {
                    ...state,
                    comments: pipe(
                        state.comments,
                        A.map((comment) => comment.id === payload.id ? payload : comment)
                    )
                }
                setCommentsOnStorage(newState.comments)
                return newState
            }
          return state
        default:
            return state
    }
}

export default commentReducer