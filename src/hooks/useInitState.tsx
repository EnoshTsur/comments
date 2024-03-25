import { useEffect, useMemo } from "react";
import { useQueries } from "react-query";
import { pipe } from "fp-ts/lib/function";
import * as A from 'fp-ts/ReadonlyArray'
import * as O from 'fp-ts/Option'
import { useAppDispatch } from "../redux/store/configureStore";
import { ActionType } from "../redux/actions/commentActions";
import CommentModel from "../model/comment.model";
import { getCommentsFromStorage } from "../repository/localStorage.repository";


interface RandomUser {
  results: ReadonlyArray<{
    readonly name: {
      readonly first: string;
      readonly last: string;
    };
    readonly picture: {
      readonly large: string;
    };
  }>;
}

const initComments =  [
    "This app rocks!",
    "I highly recommend it",
    "Bravoo!"
]

const fetchData = async (): Promise<RandomUser> => {
  const data = await fetch("https://randomuser.me/api");
  if (!data.ok) {
    throw Error("failed to fetch data");
  }
  return data.json();
};

const useInitState = () => {

  const dispatch = useAppDispatch()

  const storageComments = useMemo(() => getCommentsFromStorage(), [])

  const isStorageComments = useMemo(() => pipe(storageComments, O.isSome), [storageComments])

  const comments = useQueries([
    { queryKey: ["comment1", isStorageComments], queryFn: fetchData, staleTime: Infinity, enabled: !isStorageComments },
    { queryKey: ["comment2", isStorageComments], queryFn: fetchData, staleTime: Infinity, enabled: !isStorageComments },
    { queryKey: ["comment3", isStorageComments], queryFn: fetchData, staleTime: Infinity, enabled: !isStorageComments },
  ]);


  useEffect(() => {
    if (comments.every(({ isSuccess }) => isSuccess) && !isStorageComments) {
        const responseState = pipe(
            comments,
            A.map(({ data }) => data),
            A.map(O.fromNullable),
            A.mapWithIndex((i, o) => O.map<RandomUser, CommentModel>(({ results: [{ name, picture}]}) => ({
                isSelected: false,
                name: `${name.first} ${name.last}`,
                comment: initComments[i],
                image: {
                    src: picture.large,
                    alt: `${name.first} ${name.last}`
                }
            }))(o)),
            A.filterMap(x => x),
        )
        dispatch({ type: ActionType.SET_INNIT_COMMENTS, payload: responseState })
    }
  }, [...comments.map(({ isSuccess }) => isSuccess), isStorageComments] );

  useEffect(() => {
    const storage = pipe(storageComments, O.toNullable)
    if (storage != null) {
      dispatch({ type: ActionType.SET_INNIT_COMMENTS, payload: storage })
    }
  }, [isStorageComments])
};

export default useInitState;
