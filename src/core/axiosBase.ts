import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { DiyConfiguration } from "../types/moreOptions";

export class AxiosBase {
  private axiosInstance: AxiosInstance;
  private readonly axiosOptions: DiyConfiguration;

  constructor(option: DiyConfiguration) {
    this.axiosOptions = option;
    this.axiosInstance = axios.create(this.axiosOptions);
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

  private setupInterceptors() {}
}
