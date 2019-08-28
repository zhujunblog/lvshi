import { HTTP } from '../../utils/http.js'

class answer extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  operationOrder(data) {
    return this.request('/wxuser/operationOrder', data, "POST");
  }


}

export { answer };