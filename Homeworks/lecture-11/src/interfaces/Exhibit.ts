export interface UserType {
    id: number
    username: string
}

export interface ExhibitType {
    id: number
    description: string
    imageUrl: string
    commentCount: number
    user: UserType
    createdAt: string
}

export interface CommentsResponseType {
    id: number
    text: string
    user: UserType
    createdAt: string
}