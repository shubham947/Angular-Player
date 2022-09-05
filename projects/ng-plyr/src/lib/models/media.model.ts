export class Media {
    src?: string;
    type?: MediaType;
    playFrom?: number = 0;
    duration?: number;
    captions?: Array<{path:string, lang:string}>;
    bookmarks?: Array<number>;
    paused?: boolean = true;
}

export enum MediaType {
    'VIDEO', 'AUDIO'
}
