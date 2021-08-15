/*
 * @Author: your name
 * @Date: 2021-08-14 21:28:34
 * @LastEditTime: 2021-08-15 10:14:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /axiosPackage/src/core/instance.ts
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class AxiosBase {
  private axiosInstance: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
  }

  getAxiosInstance() {
    return this.axiosInstance;
  }

  requestInterceptors<E>(
    onFulfilled?: (
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: E) => any
  ): number {
    return this.axiosInstance.interceptors.request.use(onFulfilled, onRejected);
  }

  responseInterceptors<E>(
    onFulfilled?: (
      value: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: E) => any
  ): number {
    return this.axiosInstance.interceptors.response.use(
      onFulfilled,
      onRejected
    );
  }
}
