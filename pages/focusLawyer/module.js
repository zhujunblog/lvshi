import { HTTP } from '../../utils/http.js'

class info extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  getFocusLawyerList(data) {
    return this.request('/wxuser/getFocusLawyerList', data, "POST");
  }
  
  /**
   * 取消关注
   */
  focusLawyer(data) {
    return this.request('/wxuser/focusLawyer', data, "POST");
  }

}

export { info };