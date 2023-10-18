import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.usuario,
    getUsuario: (state) => state.usuario,
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
  },
  actions: {
    guardarUsuario({ commit }, usuario) {
      commit("setUsuario", usuario);
      const userSave = JSON.stringify(usuario);
      localStorage.setItem("user", userSave);
    },
    redirigirAInicioSesion() {
      // Redirigir al usuario a la página de inicio de sesión
      // Obtener la ruta actual del router
      const currentRoute = router.currentRoute.path;
      
      // Verificar si ya está en la página de inicio
      if (currentRoute !== "/") {
        router.push("/"); // Redirigir solo si no está en la página de inicio
      }
    },
    autoLogin({ commit, dispatch }) {
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        commit("setUsuario", user);
      } else {
        commit("setUsuario", null);
        localStorage.removeItem("user");
        dispatch("redirigirAInicioSesion"); // Llamar a la acción para redirigir
      }
    },
    salir({ commit }) {
      commit("setUsuario", null);
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
  modules: {},
});
