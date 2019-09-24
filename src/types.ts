type wordId = string;
type componentId = string;
export type Info<S> = { id: string } & S;
export type lessonInfo = {
    info: {
        name: string,
        message: string,
        image?: string,
    }
}
export type lessonData = {
    data: {
        wordId: wordId,
        component: componentId[]
    }[]
}
export type currentUser = {
    username: string
}
export type word = {
    id: string,
    data: {
        [key: string]: string
    }
}
export type component = {
    id: string,
    uploader: string,
    info: any,
    words: number[],
    url: string,
}