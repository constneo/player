import request from './request';

export const list = (data: any) => request.get('/api/artist', data);

/**
 * 专辑列表
 * @returns {Promise<any>}
 */
export const albumList = () => request.get('/api/album');
