export interface InfoType {
    count: number
    next: string | null
    pages: number
    prev: null | string
}

export interface HeroesType {
    id: number
    name: string
    status: string
    gender: string
    image: string
}

export interface HeroesData {
    info: InfoType,
    results: HeroesType[] | undefined
}