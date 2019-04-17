import instance from '@/utils/axios.js'
let base = 'http://54qjapi.54qn.cn/api';
// let base = 'https://api.54qj.com/api';

// 活动列表
export function getActList(page, pagesize, act_type, take_type, keyword, cms_school_id, activity_start_at, activity_expire_at, ) {
  return instance.get(`${base}/official_website/activities?page=${page}&pagesize=${pagesize}&take_type=${take_type}&act_type=${act_type}&keyword=${keyword}&cms_school_id=${cms_school_id}&activity_start_at=${activity_start_at}&activity_expire_at=${activity_expire_at}`)
}
// 爆料列表
export function getNewsList(page, pagesize, keyword) {
  return instance.get(`${base}/official_website/news?page=${page}&pagesize=${pagesize}&keyword=${keyword}`)
}
// 干活列表
export function getDriedFoodList(page, pagesize,keyword ) {
  return instance.get(`${base}/official_website/universities?page=${page}&pagesize=${pagesize}&keyword=${keyword}`, )
}
// 首页推荐列表
export function getRecommendList() {
  return instance.get(`${base}/official_website/recommends`)
}
// 活动详情
export function getActDetail(act_id) {
  return instance.get(`${base}/official_website/activities/${act_id}`)
}
// 爆料详情
export function getNewsDetail(news_id) {
  return instance.get(`${base}/official_website/news/${news_id}`)
}
// 干货详情
export function getDriedFoodDetail(university_id) {
  return instance.get(`${base}/official_website/universities/${university_id}`)
}
// 省份学校
export function getSchool() {
  return instance.get(`${base}/cms/provinces-schools`)
}