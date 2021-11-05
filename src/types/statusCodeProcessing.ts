import { AxiosResponse } from 'axios'
// 状态码处理函数
interface statusCodeProcessingTypes {
  fn?: (err: AxiosResponse) => void
  defaultFn?: (err: AxiosResponse) => void
}

export type statusCodeProcessingCore = Map<number, statusCodeProcessingTypes>
