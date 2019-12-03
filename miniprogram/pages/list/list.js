// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],//商品分类列表
    foodData:[],//商品列表
    activeIndex:0,//当前商品分类
    shop_type:'',//当前商品分类type
    scrollTop: 100,//
    scrollH:1000,
    loading: false,
    showCart: false,//是否显示购物车
    cartList:[],//购物车列表
    sumMonney: 0,//总金额
    cupNumber: 0,//总杯数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMenuList();
  },
  getMenuList(){
    let db = wx.cloud.database();
    db.collection('menu')
    .get()
    .then(res=>{
      console.log(res)
      if(res.errMsg=='collection.get:ok'){
          this.setData({
            listData:res.data
          })
          if(res.data.length>0){
              let type = res.data[0].type;
              this.getFoods(type);
          }
      }
    })
  },
  // 获取商品
  getFoods(_type) {
    console.log('获取商品')
    let db = wx.cloud.database();
    db.collection('foods')
    .where({
      type: _type
    })
    .get()
    .then(res => {
      if(res.errMsg=='collection.get:ok'){
        this.setData({
          foodData:res.data,
          shop_type:_type,
          loading: true,
        })
      }
    })
  },
  // 选择商品
  selectMenu(e){
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    this.setData({
      activeIndex: index
    });
    this.getFoods(type);
  },
  // 添加商品
  selectInfo: function (e) {
    console.log(e.currentTarget.dataset)
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    let globleData = this.data;
    let monney = 0;
    let itemData = globleData.foodData[index];
    let cartList = globleData.cartList;
   
    let curLen = 'cartList['+cartList.length+']';
    this.setData({
      [curLen]:itemData
    })
    console.log(cartList)
    cartList.map(item=>{
      monney +=parseFloat(item.price )
    })
    this.setData({
      sumMonney:monney,
      cupNumber:cartList.length
    })
  },
  //显示购物车商品
  showCartList: function () {
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
  // 跳转订单
  goBalance: function () {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('cupNumber', this.data.cupNumber);
      wx.navigateTo({
        url: '../order/balance/balance?model=' + this.data.model + "&appointTime=" + this.data.appointTime
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})