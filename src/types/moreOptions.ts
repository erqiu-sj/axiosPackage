import { AxiosRequestConfig } from "axios";
import { httpConversionDevice } from "./httpConversionDevice";
import { statusCodeProcessingCore } from "./statusCodeProcessing";

export interface DiyConfiguration<Err> extends AxiosRequestConfig {
  errorStatusCodeProcessing?: statusCodeProcessingCore<Err>; // 错误状态码处理
  tranform?: httpConversionDevice<Err>;
}
