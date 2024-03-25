import CommentModel from "../../model/comment.model";

export enum ActionType {
    SET_INNIT_COMMENTS = 'SET_INNIT_COMMENTS',
    ADD_COMMENT = 'ADD_COMMENT',   
    DELETE_COMMENT = 'DELETE_COMMENT',
    SET_SELECTED_COMMENT = 'SET_SELECTED_COMMENT',
    UPDATE_COMMENT = 'UPDATE_COMMENT',
}

export interface ActionComment {
    readonly type: typeof ActionType[keyof typeof ActionType],
    readonly payload: CommentModel | ReadonlyArray<CommentModel>
}