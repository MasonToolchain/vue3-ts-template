import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

/**
 * 通用响应结构
 */
export interface ApiResp<T = any> {
    code: number
    message: string
    data: T
}

/**
 * 分页请求结构
 */
export interface PageReq {
    pageNum: number
    pageSize: number
}

/**
 * 分页响应数据结构
 */
export interface PageData<T> {
    list: T[]
    total: number
}

/**
 * 拦截器配置
 */
export interface InterceptorConfig {
  request?: {
    onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    onRejected?: (error: AxiosError) => any
  }
  response?: {
    onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
    onRejected?: (error: AxiosError) => any
  }
}


/**
 * HTTP请求客户端配置
 */
export interface HttpClientConfig {
    // 请求基础路径
    baseURL?: string
    // 超时时间
    timeout?: number
    // 公共请求头
    headers?: Record<string, string>
    // 拦截器配置
    interceptor?: InterceptorConfig
    // 是否开启请求取消
    enableCancel?: boolean
    
    // 后期其他配置可以继续拓展
}
