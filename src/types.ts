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
    describe: string,
    data: {
        [key: string]: string
    }
}
export type component = {
    info: {
        name: string,
        introduction: string,
    },
    words: string[],
}