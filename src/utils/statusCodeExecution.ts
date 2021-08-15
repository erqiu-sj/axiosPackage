export class StatusCodeExecution {
  private callbackMap: Map<number, () => void>;

  constructor() {
    this.callbackMap = new Map();
  }
  action(code: number, fn: () => void): this {
    this.callbackMap.set(code, fn);
    return this;
  }

  finish(code: number, callback: () => void) {
    const cb = this.callbackMap.get(code);
    if (typeof cb !== "function") {
      callback();
    } else cb();
  }
}
