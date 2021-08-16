// 状态码处理函数
interface statusCodeProcessingTypes {
  fn?: () => void;
  defaultFn?: () => void;
}

export type statusCodeProcessingCore = Map<number, statusCodeProcessingTypes>;
