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
  
  getInfo(data){
    return this.request('/wxuser/getLawyerInfo',data,'POST');
  }

}

export { info };