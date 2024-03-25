interface CommentModel {
    readonly id?: number
    readonly name: string
    readonly comment: string
    readonly isSelected: boolean
    readonly image: {
        readonly src: string
        readonly alt: string
    }
}

export default CommentModel