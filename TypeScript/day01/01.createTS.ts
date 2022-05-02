import axios from "axios";

interface Datas1 {
  loginname: string;
  avatar: string;
  githubUsername: string;
  create_at: string;
  score: number;
  recent_topics: object[];
  recent_replies: object[];
}

axios.get("https://cnodejs.org/api/v1/user/alsotang").then((response) => {
  const datas: Datas1 = response.data.data;

  logUser(datas.recent_topics.length);
});

function logUser(length: number): void {
  console.log(`这名用户的信息长度是${length}`);
}
