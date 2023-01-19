import {
 CONFIG_REQUEST, CONTENTLOADING_FALSE, CONTENTLOADING_TRUE
} from "../actions/config";
import axios from 'axios';
import { settingAddress } from "@/config/global";

const configService = axios.create({
 baseURL: settingAddress
})

const state = {
 config: {},
 loaded: false,
 contentLoading: false,
};

const getters = {
 languages: state => state.config.enabled_languages,
//  default_lang: state => state.config.enabled_languages.find(x => x.ID === state.config.default_language),
 modules: state => state.config.enabled_modules,
 company: (state) => {
  return { nome: state.config.ragione_sociale, logo: state.config.url_logo };
 },
 base_address: (state) => state.config.endpoint_api,
 configuration_loaded: (state) => state.loaded,
 contentLoading: (state) => state.contentLoading,
};

const actions = {
 [CONFIG_REQUEST]: ({ commit }) => {
  configService.get().then(
   response => {
    commit('SET_CONFIG', response.data)
   }
  );
 },
 [CONTENTLOADING_TRUE]: ({commit}) => {
  commit('SET_CONTENTLOADING_TRUE')
 },
 [CONTENTLOADING_FALSE]: ({commit}) => {
  commit('SET_CONTENTLOADING_FALSE')
 }
};

const mutations = {
 SET_CONFIG(state, config) {
  state.config = config;
  state.loaded = true;
 },
 SET_CONTENTLOADING_TRUE(state){
  state.contentLoading = true
 },
 SET_CONTENTLOADING_FALSE(state){
  state.contentLoading = false
 }
};

export default {
 state,
 getters,
 actions,
 mutations,
};