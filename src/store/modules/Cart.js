const Cart = {
  state: {
    cartInfo: [] // 购物车
  },
  mutations: {
    addGoods (state, payload) {
      state.cartInfo.push(payload)
    },
    clearCart (state) {
      state.cartInfo = []
    }
  },
  actions: {},
  getters: {}
}
export default Cart
