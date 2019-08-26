import { HTTP } from '../../utils/http.js'

class lawyerMy extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  getList(data) {
    return this.request('/wxuser/lawyerInfo', data, "POST");
  }
  
}

export { lawyerMy };