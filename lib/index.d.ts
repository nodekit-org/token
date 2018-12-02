export default class Token<P> {
    isInitialized: boolean;
    privateKey: string | undefined;
    tokenDuration: string | undefined;
    constructor({ privateKey, tokenDuration, }: ContructorArgs);
    create({ payload, }: CreateArgs<P>): Promise<string>;
    decode({ token, }: DecodeArgs): Promise<P>;
}
interface ContructorArgs {
    privateKey: string;
    tokenDuration: string;
}
interface CreateArgs<T> {
    payload: T;
}
interface DecodeArgs {
    token: string;
}
export {};
//# sourceMappingURL=index.d.ts.map