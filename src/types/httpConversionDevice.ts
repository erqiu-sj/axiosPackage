import { AxiosRequestConfig, AxiosResponse } from "axios";
/**
 * @description 请求转换type
 */
export interface httpConversionDevice {
  // 请求成功处理
  requestWasSuccessfullyProcessed?: <T, R>(
    res: AxiosResponse<T>,
    options: AxiosRequestConfig
  ) => R;
  // 请求失败处理
  requestFailedHandling?: <T>(e: Error) => Promise<T>;
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
