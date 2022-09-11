export class Media {
    id?:string;
    src: string;
    type: MediaType;
    poster?:string;
    playFrom?: number = 0;
    duration?: number;
    captions?: Array<{path:string, lang:string}>;
    bookmarks?: Array<number>;
    paused?: boolean = true;

    constructor(src:string, type?:MediaType) {
        this.src = src;
        this.type = type || MediaType.VIDEO;
    }
}

export enum MediaType {
    'VIDEO', 'AUDIO'
}
