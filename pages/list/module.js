import { HTTP } from '../../utils/http.js'

class list extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  getList() {
    let data = {
      
    }
    return this.request('/wxuser/getLawyerList', data, "POST");
  }

  pay() {
    let data = {
      money: 1
    }

    return this.request('/wxuser/wxPay', data, "POST");
  }

  getOrderList() {
    let data = {
    }
    return this.request('/wxuser/getMyOrder', data, 'POST');
  }
}

export { list };