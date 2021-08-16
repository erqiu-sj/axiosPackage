import axios, { AxiosInstance, AxiosResponse } from "axios";
import { DiyConfiguration } from "../types/moreOptions";
import { AxiosCanceler } from "./axiosCanneler";

export class AxiosBase {
  private axiosInstance: AxiosInstance;
  private readonly axiosOptions: DiyConfiguration;

  constructor(option: DiyConfiguration) {
    this.axiosOptions = option;
    this.axiosInstance = axios.create(this.axiosOptions);
    this.setupInterceptors();
  }

  private createAxios(config?: DiyConfiguration): void {
    this.axiosInstance = axios.create(config);
  }

  private configureAxios(config?: DiyConfiguration): void {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  private setHeader(header: object): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, header);
  }

  private setupInterceptors() {
    const axiosCanceler = new AxiosCanceler();
    const tranform = this.axiosOptions.tranform;
    // success handler before request
    this.axiosInstance.interceptors.request.use((config: DiyConfiguration) => {
      axiosCanceler.addPending(config);
      if (
        tranform?.requestInterceptors &&
        typeof tranform?.requestInterceptors === "function"
      ) {
        config = tranform?.requestInterceptors(this.axiosOptions);
      }
      return config;
    }, undefined);
    // error handler before request
    tranform?.requestInterceptorsCatch &&
      typeof tranform.requestInterceptorsCatch === "function" &&
      this.axiosInstance.interceptors.request.use(
        undefined,
        tranform?.requestInterceptorsCatch
      );
    // success handler before response
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (
        tranform?.responseInterceptors &&
        typeof tranform?.responseInterceptors === "function"
      ) {
        res = tranform?.responseInterceptors(res);
      }
      return res;
    }, undefined);

    // error handler before response
    tranform?.responseInterceptorsCatch &&
      typeof tranform.responseInterceptorsCatch === "function" &&
      this.axiosInstance.interceptors.response.use(undefined, (err: Error) => {
        tranform?.responseInterceptorsCatch?.(err);
      });
  }
}
