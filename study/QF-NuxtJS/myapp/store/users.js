export const state = () => ({
  err: 1,
  msg: '未登录',
  token: '',
  data: {}
})

export const mutations = {
  M_UPDATE_USER(user, payload) {
    state.err = payload.err
    state.msg = payload.msg
    state.data = payload.data
    state.token = payload.token
  }
}

export const actions = {
  A_UPDATE_USER({commit, user}, payload) {
    // 异步业务
    commit('M_UPDATE_USER', payload)
  }
}
