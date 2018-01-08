// 函数必须都是同步的
import * as types from './mutations-types'

const mutations = {
  [types.LOGIN] (state, params) {
    localStorage.setItem('id', params._id)
    localStorage.setItem('username', params.username)
    localStorage.setItem('token', params.token)
    state.id = params._id
    state.username = params.username
    state.token = params.token
  },
  [types.LOGOUT] (state) {
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    state.id = ''
    state.username = ''
    state.token = ''
  }
}

export default mutations
