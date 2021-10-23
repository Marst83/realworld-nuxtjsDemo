import axios from "axios";

const baseURL = "http://realworld.api.fed.lagounews.com/";
// const baseURL = "https://conduit.productionready.io/";
// const baseURL = "https://api.realworld.io/";

export const request = axios.create({
  baseURL,
});

// 请求拦截器 通过插件机制获取到上下文对象（query、params、req、res、app、store···）
// 插件导出函数必须作为default成员
export default ({ store }) => {
  request.interceptors.request.use(
    function (config) {
      const { user } = store.state;
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
