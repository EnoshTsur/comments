import { pipe } from "fp-ts/lib/function";
import { useCallback, useState } from "react";
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/ReadonlyArray'
import * as Rec from 'fp-ts/ReadonlyRecord'
import * as Str from 'fp-ts/String'
import { ReadonlyRecord } from "fp-ts/lib/ReadonlyRecord";


function useFormManager<T extends ReadonlyRecord<string, string>>(initialValue: T) {

    const [state, setState] = useState<T>(initialValue)

    const onInputTextChange = useCallback(({ currentTarget: { name, value} }: React.FormEvent<HTMLInputElement>) => {
        setState((pre) => ({ ...pre, [name]: value}))
    }, [state, useState])

    const onTextAreaChange = useCallback(({ currentTarget: { name, value} }: React.FormEvent<HTMLTextAreaElement>) => {
        setState((pre) => ({ ...pre, [name]: value}))
    }, [state, useState])

    const onInputFileChange = useCallback(({ currentTarget: { name, files} }: React.FormEvent<HTMLInputElement>) => {
        pipe(
            files,
            O.fromNullable,
            O.map((list) => list[0]),
            O.chainNullableK((file) => setState((pre) => ({
                 ...pre, [name]: URL.createObjectURL(file)
                }))
            ),
        )
    }, [state, useState])

    const submitForm = useCallback((fn: (state: T) => void) => {
        fn(state)
    }, [state, setState])

    const isValidForm = useCallback((keys: ReadonlyArray<keyof T>)  => pipe(
        keys,
        A.map(String),
        A.every(key => pipe(
                Rec.lookup(key)(state),
                O.chain(O.fromNullable),
                O.map(str => !Str.isEmpty(str)),
                O.getOrElse(() => false)
            )
        ),
    ), [state, setState])

    return {
        state,
        onInputTextChange,
        onTextAreaChange,
        onInputFileChange,
        isValidForm,
        submitForm,
    }

}
export default useFormManager