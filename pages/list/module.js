import { HTTP } from '../../utils/http.js'

class list extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  getList(data) {
    return this.request('/wxuser/getLawyerList', data, "POST");
  }

  
}

export { list };