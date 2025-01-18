export interface Poem {
    title: string;
    author: string;
    lines: Array<string>;
}

export interface ErrorMessage {
    message: string;
}

export interface PoemFilter {
    linesStart?: number;
    linesEnd?: number;
    titleText?: string;
    authorText?: string;
    titleAbs?: boolean;
    authorAbs?: boolean;
}

export enum sortingOption {
    authorAZ = "By Author (A-Z)",
    authorZA = "By Author (Z-A)",
    titleAZ = "By Title (A-Z)",
    titleZA = "By Title (Z-A)",
    linesAsc = "By Lines (Asc.)",
    linesDesc = "By Lines (Desc.)",
}