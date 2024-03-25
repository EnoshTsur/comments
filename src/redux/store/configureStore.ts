import { configureStore } from '@reduxjs/toolkit'
import commentReducer from '../reducers/commentReducer'
import CommentModel from '../../model/comment.model'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export interface CommentStore {
    readonly comments: ReadonlyArray<CommentModel>
}

export const initialState: CommentStore = {
    comments: []
}

const store = configureStore({
    reducer:  commentReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store
