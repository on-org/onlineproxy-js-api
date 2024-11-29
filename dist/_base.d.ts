import { AxiosInstance } from 'axios';
export interface Resp {
    response: number | string;
    [key: string]: any;
    [key: number]: any;
}
export default class _base {
    protected token: string | null;
    protected request: AxiosInstance;
    protected dev_id: number | null;
    protected lang: string;
    protected base: string;
    setBase(base?: string): this;
    setToken(token: string | null): this;
    setLang(lang: string): this;
    constructor(apiToken: string | null, lang: string, dev_id: number | null);
    createRequest(token: string | null): this;
    getRequest(url: string, params?: {
        [key: string]: any;
    }, suf?: boolean): Promise<any>;
    postRequest(url: string, params?: {
        [key: string]: any;
    }): Promise<any>;
}
