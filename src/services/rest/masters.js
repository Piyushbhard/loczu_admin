import request from '../request';

const url = 'rest/masters';

const mastersService = {
  getAll: (params) => request.get(url, { params }),
  getById: (id, params) => request.get(`${url}/${id}`, { params }),
  create: (data) => request.post(url, data, {}),
  update: (id, data) => request.put(`${url}/${id}`, data, {}),
  delete: (params) => request.delete(`${url}/delete`, { params }),
  statusChange: (id, data) => request.put(`${url}/${id}`, data),
  getTimes: (params) => request.get(`rest/master/times-all`, { params }),
};

export default mastersService;
