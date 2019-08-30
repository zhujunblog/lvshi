import { HTTP } from '../../utils/http.js'

class orderInfo extends HTTP {

  constructor() {
    super();
  }

  /**
   * 获取律师列表
   */
  getOrderInfo(data) {
    return this.request('/wxuser/getOrderById', data, "POST");
  }
  
  /**
   * 确定订单完成
   */
  checkOrder(data){
    return this.request('/wxuser/checkOrder', data, "POST");
  }
  
  /**
   * 获取评价标签
   */
  getAppraiseList(data){
    return this.request('/wxuser/getAppraiseList',data,'post');
  }

  /**
   * 评价
   */
  appraiseOrder(data){
    return this.request("/wxuser/appraiseOrder",data,'POST');
  }
}

export { orderInfo };