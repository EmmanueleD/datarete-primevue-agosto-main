import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import { AUTH_LOGOUT } from "../actions/auth";

import axios from "axios";

const state = {
  status: "",
  user: {},
  loaded: false,
};

const getters = {
  loggedUser: (state) => state.user,
  user_loaded: (state) => state.loaded,
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    axios
      .get("Auth/Users/" + localStorage.getItem("DR_P-user-id"))
      .then((resp) => {
        console.log("🚀 ~ file: user.js ~ line 23 ~ .then ~ resp", resp.data);
        commit(USER_SUCCESS, resp.data);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  },
};

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    console.log("🚀 ~ file: user.js:39 ~ resp", resp);
    console.log("🚀 ~ file: user.js ~ line 39 ~ state", state);
    state.status = "success";
    state.user = resp;
    state.loaded = true;
  },
  [USER_ERROR]: (state) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: (state) => {
    state.user = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
