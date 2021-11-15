const moduleB = {
  state() {
    return {
      name: "ModuleB",
    };
  },
  mutations: {
    updateNames(state) {
      state.name = "moduleB屮";
    },
  },
};

export default moduleB;
