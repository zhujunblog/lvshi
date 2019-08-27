import { HTTP } from '../../utils/http.js'

class consulting extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  createOrder(data) {
    return this.request('wxuser/wxPay', data, "POST");
  }

}

export { consulting };