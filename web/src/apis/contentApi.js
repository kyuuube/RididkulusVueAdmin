import request from '../common/request/request';

/**
 * 创建文章
 * @param data
 * @return function
 * */
export const addArticle = data => request.post('/article/create', data);
/**
 * 创建文章
 * @param data
 * @return function
 * */
export const editArticle = data => request.put('/article/edit', data);
/**
 * 删除文章
 * @param id
 * @return function
 * */
export const deleteArticle = id => request.delete(`/article/delete/${id}`);
/**
 * 获取用户文章列表
 * @param params
 * @return function
 * */
export const getArticleList = params => request.get('/article/list', { params });
/**
 * 获取用户文章列表
 * @param id
 * @return function
 * */
export const getArticleDetail = id => request.get(`/article/detail/${id}`);
