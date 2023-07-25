export class Error {
    message?:string;
    code?:string|number;

    constructor(message?:string, code?:string|number) {
        this.message = message;
        this.code = code;
    }
}

export enum ErrorCodes {
    'player/not-initialized' = 'Player not yet initialized',
    'video/element-not-initialized' = 'Video element is not yet initialized'
}
