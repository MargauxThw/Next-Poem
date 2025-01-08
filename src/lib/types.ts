export interface Poem {
    title: string;
    author: string;
    lines: Array<string>;
}

export interface ErrorMessage {
    message: string;
}

export interface PoemFilter {
    linecount?: number;
    titleText?: string;
    authorText?: string;
    titleAbs?: boolean;
    authorAbs?: boolean;
}