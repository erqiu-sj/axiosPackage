// 状态码处理函数
interface statusCodeProcessingTypes<T> {
  fn?: (err: T) => void;
  defaultFn?: (err: T) => void;
}

export type statusCodeProcessingCore<T> = Map<
  number,
  statusCodeProcessingTypes<T>
>;
