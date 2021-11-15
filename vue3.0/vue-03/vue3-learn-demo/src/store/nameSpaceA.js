const nameSpaceA = {
  namespaced: true,
  state() {
    return {
      name: "nameSpaceA1",
    };
  },
  mutations: {
    updateNames(state) {
      state.name = "nameSpaceA1+++++";
    },
  },
};

export default nameSpaceA;
