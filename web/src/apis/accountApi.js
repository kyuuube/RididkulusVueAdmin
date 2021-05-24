import request from '../common/request/request';

export const login = data => request.post('/login', data);

export const getUserList = params => request.get('/user/list', { params });

export const addUser = data => request.post('/user/create/user/v2', data);

export const editUser = data => request.put('/user', data);

export const delUser = id => request.delete(`/user/${id}`);

export const userDetail = id => request.get(`/user/${id}`);

export const getRoleList = params => request.get('/role/list', { params });

export const getRoleOptions = () => request.get('/role/options');

export const addRole = data => request.post('/role/create', data);

export const editRole = data => request.put('/role/edit', data);

export const roleDetail = id => request.get(`/role/detail/${id}`);

export const getMenuTree = params => request.get('/menu/tree', { params });

export const getMenuList = params => request.get('/menu/list', { params });

export const addMenu = data => request.post('/menu/create', data);

export const getMenuLDetail = id => request.get(`/menu/detail/${id}`);

export const getAuthorityList = params => request.get('/permission/list', { params });

export const saveAuthority = data => request.post('/permission/create', data);

export const getAuthorityTree = params => request.get('/menu/authority', { params });

export const getCurrentTree = () => request.get('/menu/user/tree');
