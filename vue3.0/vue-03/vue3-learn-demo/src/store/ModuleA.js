const moduleA = {
  state() {
    return {
      name: "ModuleA",
    };
  },
  mutations: {
    updateNames(state) {
      state.name = "moduleA+屮";
    },
  },
};

export default moduleA;
