import { defineStore } from "pinia";
import axios from 'axios';
export const useUser = defineStore("user", {
  state: () => ({
    username: "kangkang",
    age: 12,
    sex: "男",
    count: 1,
    topicsData: []
  }),
  actions: {
    // 第一种更新方法——通过action
    updataUsername(username, age) {
      this.username = username;
      this.age = age;
    },
    // 第二种更新方法——通过$patch直接修改state
    updataStateToPatch(username, age, sex) {
      this.username = username
      this.age = age;
      this.sex = sex;
    },
    async getTopics() {
      let {data: {data: data}} = await axios.get("https://cnodejs.org/api/v1/topics");
      data.length = 10;
      this.topicsData = data
    }
  },
  getters: {
    doubleCount() {
      return this.count * 2
    },
    doubleCountPlusAny() {
      return (aa) => this.count * 2 +aa; 
    }
  }
})