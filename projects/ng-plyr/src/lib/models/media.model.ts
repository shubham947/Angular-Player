export class Media {
    src?: string;
    type?: MediaType;
    bookmarks?: Array<number>;
    captions?: Array<{path:string, lang:string}>;
    duration?: number;

    // constructor(src, type, bookmarks, captions) {}
}

export enum MediaType {
    'VIDEO', 'AUDIO'
}
