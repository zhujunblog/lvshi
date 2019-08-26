import { HTTP } from '../../utils/http.js'

class order extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  getOrder(data) {
    return this.request('/wxuser/getOrderList', data, "POST");
  }


}

export { order };