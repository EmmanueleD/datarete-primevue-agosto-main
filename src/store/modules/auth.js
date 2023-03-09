import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SET_LOGIN_LEVELS,
} from "../actions/auth"
import { USER_REQUEST } from "../actions/user"
import axios from "axios"

const state = {
  token: localStorage.getItem("DR_P-user-token") || "",
  IdUser: localStorage.getItem("DR_P-user-id") || "",
  status: "",
  livelliLogin: [],
  hasLoadedOnce: false,
}

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  getLivelliLogin: (state) => state.livelliLogin,
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      axios
        .post("Auth", user)
        .then((resp) => {
          if (resp.data.Success) {
            console.log("/Auth RESP", resp)
            commit(SET_LOGIN_LEVELS, resp.data.livelli)
            localStorage.setItem("DR_P-user-token", resp.data.Token)
            localStorage.setItem("DR_P-user-id", resp.data.IdUser)
            axios.defaults.headers.common["Authorization"] = resp.data.Token
            commit(AUTH_SUCCESS, resp)
            dispatch(USER_REQUEST, resp.data.IdUser)
            resolve(resp)
          } else {
            commit(AUTH_ERROR)
          }
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: auth.js ~ line 45 ~ returnnewPromise ~ err",
            err
          )
          commit(AUTH_ERROR, err)
          localStorage.removeItem("DR_P-user-token")
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem("DR_P-user-token")
      localStorage.removeItem("DR_P-user-id")
      delete axios.defaults.headers.common["Authorization"]
      resolve()
    })
  },
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading"
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success"
    state.token = resp.data.Token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error"
    console.log("🚀 ~ file: auth.js ~ line 71 ~ state.status", state.status)
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ""
    state.IdUser = null
    state.livelliLogin.splice(0)
  },
  [SET_LOGIN_LEVELS]: (state, payload) => {
    console.log("PAYLOAD EXPECT LIVELLI LOGIN", payload)
    state.livelliLogin = payload
    console.log("STATE.LIVELLIlOGIN , ", state.livelliLogin)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
