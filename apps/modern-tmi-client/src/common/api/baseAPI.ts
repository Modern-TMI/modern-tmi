import axios from 'axios';
import { environment } from '../../app/environments/environment';

const API = axios.create({
  baseURL: environment.baseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
});

API.interceptors.request.use(
  (config) => {
    console.log('request : ', config);
    return config;
  },
  (error) => {
    console.log('request error : ', error);
    return error;
  }
);

API.interceptors.response.use(
  (response) => {
    console.log('response : ', response);
    return response;
  },
  (error) => {
    console.log('request error', error);
    return error;
  }
);

const makeUrl = (url: string) => {
  if (url.startsWith('/')) {
    return url.substring(1);
  } else {
    return url;
  }
};

export const GET = <T>(url: string, queryParams?: any) => {
  return API.get<T>(makeUrl(url), { params: queryParams });
};

export const POST = <T>(url: string, body?: any, queryParams?: any) => {
  return API.post<T>(makeUrl(url), body, { params: { queryParams } });
};

export const PUT = <T>(url: string, body: any, queryParams?: any) => {
  return API.put<T>(makeUrl(url), body, { params: { queryParams } });
};

export const DELETE = <T>(url: string, id: number) => {
  return API.delete<T>(`${makeUrl(url)}/${id}`);
};
