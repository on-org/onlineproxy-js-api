import R from "axios";
class _ extends Error {
}
const h = class i extends Error {
  constructor(e, t = null) {
    if (super(e), !t && e && e in i.errors)
      throw new i(e, i.errors[e]);
    Error.captureStackTrace(this, i);
  }
};
h.errors = {
  ACCOUNT_BLOCKED: "account blocked",
  ERROR_WRONG_KEY: "wrong apikey",
  ERROR_NO_KEY: "no apikey",
  ERROR_NO_SERVICE: "service not specified",
  REQUEST_NOT_FOUND: "API method not specified",
  API_ACCESS_DISABLED: "api disabled",
  API_ACCESS_IP: "access from this ip is disabled in the profile",
  WARNING_NO_NUMS: "no matching numbers",
  TZ_INPOOL: "waiting for a number to be dedicated to the operation",
  TZ_NUM_WAIT: "waiting for response",
  TZ_NUM_ANSWER: "response has arrived",
  TZ_OVER_EMPTY: "response did not arrive within the specified time",
  TZ_OVER_OK: "operation has been completed",
  ERROR_NO_TZID: "tzid is not specified",
  ERROR_NO_OPERATIONS: "no operations",
  ACCOUNT_IDENTIFICATION_REQUIRED: "You have to go through an identification process: to order a messenger - in any way, for forward - on the passport.",
  EXCEEDED_CONCURRENT_OPERATIONS: "maximum quantity of numbers booked concurrently is exceeded for your account",
  NO_NUMBER: "temporarily no numbers available for the selected service",
  TIME_INTERVAL_ERROR: "delayed SMS reception is not possible at this interval of time",
  INTERVAL_CONCURRENT_REQUESTS_ERROR: "maximum quantity of concurrent requests for number issue is exceeded, try again later",
  TRY_AGAIN_LATER: "temporarily unable to perform the request",
  NO_FORWARD_FOR_DEFFER: "forwarding can be activated only for online reception",
  NO_NUMBER_FOR_FORWARD: "there are no numbers for forwarding",
  ERROR_LENGTH_NUMBER_FOR_FORWARD: "wrong length of the number for forwarding",
  DUPLICATE_OPERATION: "adding operations with identical parameters",
  ERROR_NO_NUMBER: "number is not specified",
  ERROR_PARAMS: "one or both parameters are wrong",
  LIFICYCLE_NUM_EXPIRED: "the number has expired",
  NEED_EXTENSION_NUMBER: "you have to extend the number, see the Extension tab",
  ERROR_NUMBERS_PARAMS: "error in the number format",
  ERROR_WRONG_TZID: "error in the number format",
  NO_COMPLETE_TZID: "unable to complete the operation.",
  NO_CONFIRM_FORWARD: "unable to confirm forwarding",
  ERROR_NO_SERVICE_REPEAT: "no services for repeated reception",
  SERVICE_TO_NUMBER_EMPTY: "no numbers for repeated reception for this service"
};
let E = h;
const u = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36";
class d {
  constructor(e, t, r) {
    this.base = "https://onlineproxy.io/api/client/v1/", this.token = e, this.dev_id = r, this.lang = t, this.request = R.create({
      baseURL: "https://onlineproxy.io/api/client/v1/",
      headers: {
        "User-Agent": u,
        Authorization: e
      }
    });
  }
  setBase(e = "https://onlineproxy.io/api/client/v1/") {
    return this.base = e, this;
  }
  setToken(e) {
    return this.token = e, this;
  }
  setLang(e) {
    return this.lang = e, this;
  }
  createRequest(e) {
    const t = {
      "User-Agent": u
    };
    return e && (t.Authorization = `Bearer ${e}`), this.request = R.create({
      baseURL: this.base,
      headers: t
    }), this;
  }
  getRequest(e, t = {}, r = !0) {
    t.lang = this.lang, this.dev_id && (t.dev_id = this.dev_id);
    let o = r ? ".php" : "";
    return this.request.get(e + o, { params: t }).then((n) => {
      const s = n.data;
      if ("response" in s && s.response.toString() !== "1")
        throw s.response.toString() === "NO_NUMBER" || s.response.toString() === "NO_NUMBER_FOR_FORWARD" ? new _(s.response.toString()) : new E(s.response.toString());
      return delete n.data.response, n.data;
    });
  }
  postRequest(e, t = {}) {
    return t.apikey = this.token, t.lang = this.lang, this.dev_id && (t.dev_id = this.dev_id), this.request.post(`${e}.php`, t).then((r) => {
      const o = r.data;
      if ("response" in o && o.response.toString() !== "1")
        throw o.response.toString() === "NO_NUMBER" || o.response.toString() === "NO_NUMBER_FOR_FORWARD" ? new _(o.response.toString()) : new E(o.response.toString());
      return delete r.data.response, r.data;
    });
  }
}
class p extends d {
  constructor(e = null, t = "en", r = null) {
    super(e, t, r);
  }
  /**
   * Returns proxy.
   * @param id - The ID of the proxy.
   * @returns A promise that resolves to the proxy object.
   */
  getProxy(e) {
    return this.getRequest(`proxies/${e}`, {}, !1);
  }
  /**
   * Returns proxy list.
   * @returns A promise that resolves to the list of proxies.
   */
  getProxyList() {
    return this.getRequest("proxies", {}, !1);
  }
  /**
   * Rotate proxy IP-address.
   * @returns A promise that resolves to the result of the IP rotation.
   */
  rotateProxy() {
    return this.getRequest("rotate", {}, !1);
  }
  /**
   * Create/update proxy comment.
   * @param id - The ID of the proxy.
   * @param comment - The comment to create or update.
   * @returns A promise that resolves to the result of the comment creation/update.
   */
  createOrUpdateProxyComment(e, t) {
    return this.postRequest(`proxies/${e}/comment`, { comment: t });
  }
  /**
   * Returns proxies available for order, matches the input filtering criteria.
   * @returns A promise that resolves to the list of available proxies.
   */
  getAvailableProxiesForOrder() {
    return this.getRequest("filters", {}, !1);
  }
  /**
   * Order proxy.
   * @param orderData - The data required to place an order.
   * @returns A promise that resolves to the result of the order.
   */
  orderProxy(e) {
    return this.postRequest("order", e);
  }
  /**
   * Returns the available periods and the minimum order price of proxies, matches the input filtering criteria.
   * @returns A promise that resolves to the list of available tariffs.
   */
  getProxyTariffs() {
    return this.getRequest("tariffs", {}, !1);
  }
  /**
   * Returns user balance.
   * @returns A promise that resolves to the user balance.
   */
  getUserBalance() {
    return this.getRequest("balance", {}, !1);
  }
}
typeof window < "u" && (window.OnlineProxyDriver = p);
export {
  p as default
};
