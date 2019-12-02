// miniprogram/pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    foodData:[],
    activeIndex:0,
    scrollTop: 100,
    scrollH:1000,
    loading: false,
    showCart: false,//是否显示购物车
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
    console.log(_type)
    let db = wx.cloud.database();
    db.collection('foods')
    .where({
      type: _type
    })
    .get()
    .then(res => {
      console.log(res);
      if(res.errMsg=='collection.get:ok'){
        this.setData({
          foodData:res.data,
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
  selectInfo: function (e) {
    console.log(e.currentTarget.dataset)
    // var type = e.currentTarget.dataset.type;
    // var index = e.currentTarget.dataset.index;
    // var a = this.data;
    // var tem = a.listData[type].foods[index].tem;
    // var temBox = [];
    // for (let i = 0; i < tem.length; i++) {
    //   temBox.push(tem[i].specs)
    // }
    // this.setData({
    //   showModalStatus: !this.data.showModalStatus,
    //   currentType: type,
    //   currentIndex: index,
    //   sizeBox: ["常规"],
    //   sizeEx: 0,
    //   sugarIndex: 0,
    //   temIndex: 0,
    //   tem: temBox
    // });
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