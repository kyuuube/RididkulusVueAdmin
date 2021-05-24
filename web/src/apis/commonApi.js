import request from '../common/request/request';

export const upload = data =>
    request.post('/files/avatar', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

export const XSRFConfig = () => request.get('/hello');
