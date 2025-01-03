import _base from './_base';


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
  comment: null|string;
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
  countries: { [key: number]: string };
  regions: { [key: number]: string };
  cities: { geo_city: string, geo_country: string }[];
  operators: { geo_operator: string, geo_country: string }[];
  // Другие необходимые свойства для Proxy
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

  constructor(apiToken: string|null = null, lang = 'en', dev_id: number|null = null) {
    super(apiToken, lang, dev_id);
  }

  /**
   * Returns proxy.
   * @param id - The ID of the proxy.
   * @returns A promise that resolves to the proxy object.
   */
  getProxy(id: string): Promise<Proxy> {
    return this.getRequest(`proxies/${id}`, {}, false);
  }

  /**
   * Returns proxy list.
   * @returns A promise that resolves to the list of proxies.
   */
  getProxyList(): Promise<ProxyList> {
    return this.getRequest('proxies', {}, false);
  }

  /**
   * Rotate proxy IP-address.
   * @returns A promise that resolves to the result of the IP rotation.
   */
  rotateProxy(token: string): Promise<RotateResult> {
    return this.getRequest('rotate', {token}, false);
  }

  /**
   * Create/update proxy comment.
   * @param id - The ID of the proxy.
   * @param comment - The comment to create or update.
   * @returns A promise that resolves to the result of the comment creation/update.
   */
  createOrUpdateProxyComment(id: string, comment: string): Promise<CommentResult> {
    return this.postRequest(`proxies/${id}/comment`, { comment });
  }

  /**
   * Returns proxies available for order, matches the input filtering criteria.
   * @returns A promise that resolves to the list of available proxies.
   */
  getAvailableProxiesForOrder(): Promise<AvailableProxies> {
    return this.getRequest('filters', {}, false);
  }

  /**
   * Order proxy.
   * @param orderData - The data required to place an order.
   * @returns A promise that resolves to the result of the order.
   */
  orderProxy(orderData: any): Promise<OrderResult> {
    return this.postRequest('order', orderData);
  }

  /**
   * Returns the available periods and the minimum order price of proxies, matches the input filtering criteria.
   * @returns A promise that resolves to the list of available tariffs.
   */
  getProxyTariffs(): Promise<Tariffs> {
    return this.getRequest('tariffs', {}, false);
  }

  /**
   * Returns user balance.
   * @returns A promise that resolves to the user balance.
   */
  getUserBalance(): Promise<UserBalance> {
    return this.getRequest('balance', {}, false);
  }
}

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.OnlineProxyDriver = OnlineProxyDriver;
}

