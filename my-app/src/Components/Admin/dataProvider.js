import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:9000'; 
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      page: page - 1,
      perPage,
      sort: field,
      order,
      ...params.filter,
    };
    const url = `${apiUrl}/${resource}`;
    return httpClient(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include',
    }).then(({ json }) => ({
      data: json.data,
      total: json.total || json.data.length, 
    }));
  },

  getOne: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include', 
    }).then(({ json }) => ({
      data: json,
    }));
  },

  create: (resource, params) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    }));
  },

  update: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include', // To include cookies in the request
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json,
    }));
  },

  delete: (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include', // To include cookies in the request
    }).then(({ json }) => ({
      data: json,
    }));
  },
};

export default dataProvider;
