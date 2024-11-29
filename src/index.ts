import {
  AvailableProxies,
  CommentResult,
  GetOnlineProxy,
  OrderResult,
  Proxy,
  ProxyList,
  RotateResult,
  Tariffs,
  UserBalance
} from './Apis/GetOnlineProxy';
import _base from './_base';

export default class OnlineProxyDriver extends _base {
  private oauth: null|string = null;
  private base: string = 'https://onlinesim.host/api/';

  constructor(apiToken: string|null = null, lang = 'en', dev_id: number|null = null) {
    super(apiToken, lang, dev_id);
  }


  setBase(base = 'https://onlinesim.host/api/') {
    this.base = base;
    return this;
  }


  setOauth(token: string|null) {
    this.oauth = token;
    return this;
  }

  setToken(token: string|null) {
    this.token = token;
    return this;
  }

  setLang(lang: string) {
    this.lang = lang;
    return this;
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
  rotateProxy(): Promise<RotateResult> {
    return this.getRequest('rotate', {}, false);
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
  window.OnlineSimDriver = OnlineSimDriver;
}

