import { default as _base } from './_base';
export interface Proxy {
    id: number;
    login: string;
    password: string;
    protocol: string;
    host: string;
    port: number;
    geo_country: string;
    geo_city: string;
    geo_operator: string;
    private: boolean;
    comment: null | string;
    rotate_ip_url: string;
    rotate_ip_freq: number;
    start_at: string;
    stop_at: string;
}
export interface ProxyList {
    proxies: Proxy[];
}
export interface RotateResult {
    success: boolean;
    newIp: string;
}
export interface CommentResult {
    success: boolean;
    message: string;
}
export interface AvailableProxies {
    proxies: AvailableProxy[];
}
export interface AvailableProxy {
    countries: {
        [key: number]: string;
    };
    regions: {
        [key: number]: string;
    };
    cities: {
        geo_city: string;
        geo_country: string;
    }[];
    operators: {
        geo_operator: string;
        geo_country: string;
    }[];
}
export interface OrderResult {
    success: boolean;
    orderId: string;
}
export interface Tariff {
    period: string;
    price: number;
}
export interface Tariffs {
    tariffs: Tariff[];
}
export interface UserBalance {
    balance: number;
}
export default class OnlineProxyDriver extends _base {
    constructor(apiToken?: string | null, lang?: string, dev_id?: number | null);
    getProxy(id: string): Promise<Proxy>;
    getProxyList(): Promise<ProxyList>;
    rotateProxy(token: string): Promise<RotateResult>;
    createOrUpdateProxyComment(id: string, comment: string): Promise<CommentResult>;
    getAvailableProxiesForOrder(): Promise<AvailableProxies>;
    orderProxy(orderData: any): Promise<OrderResult>;
    getProxyTariffs(): Promise<Tariffs>;
    getUserBalance(): Promise<UserBalance>;
}
