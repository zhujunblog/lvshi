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
  
  /**
   * 没有登录获取律师列表
   */
  getUserList(data){
    return this.request('/user/getLawyerList', data, "POST");
  }
  
}

export { list };