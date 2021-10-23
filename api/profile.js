import { request } from "@/plugins/request";

// 获取个人详情
export const getProfiles = (username) => {
  return request({
    method: "GET",
    url: `/api/profiles/${username}`,
  });
};

// 删除follow
export const deleteFollow = (username) => {
  return request({
    method: "DELETE",
    url: `/api/profiles/${username}/follow`,
  });
};
// 增加follow
export const addFollow = (username) => {
  return request({
    method: "POST",
    url: `/api/profiles/${username}/follow`,
  });
};