const nameSpaceB = {
  namespaced: true,
  state() {
    return {
      name: "nameSpaceB2",
    };
  },
  mutations: {
    updateNames(state) {
      state.name = "nameSpaceB----";
    },
  },
};

export default nameSpaceB;
