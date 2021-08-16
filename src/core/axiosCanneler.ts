import axios from "axios";
import type { AxiosRequestConfig, Canceler } from "axios";

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join("&");

export class AxiosCanceler {
  private pendingMap: Map<string, Canceler>;
  constructor() {
    this.pendingMap = new Map();
  }
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!this.pendingMap.has(url)) {
          this.pendingMap.set(url, cancel);
        }
      });
  }

  removePendingAll() {
    this.pendingMap.forEach((cancel) => {
      cancel && typeof cancel === "function" && cancel();
    });
    this.pendingMap.clear();
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    // 如果有一个当前的请求标识符在待处理中，
    // 当前请求需要被取消和移除
    if (this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url);
      cancel && cancel(url);
      this.pendingMap.delete(url);
    }
  }
}
