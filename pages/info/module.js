import { HTTP } from '../../utils/http.js'

class info extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  focusLawyer(data) {
    return this.request('/wxuser/focusLawyer', data, "POST");
  }


}

export { info };