import { AxiosRequestConfig } from "axios";
import { httpConversionDevice } from "./httpConversionDevice";
import { statusCodeProcessingCore } from "./statusCodeProcessing";

export interface DiyConfiguration extends AxiosRequestConfig {
  errorStatusCodeProcessing?: statusCodeProcessingCore; // 错误状态码处理
  correctStatusCodeProcessing?: statusCodeProcessingCore; // 正确状态码处理
  tranform?: httpConversionDevice;
}
