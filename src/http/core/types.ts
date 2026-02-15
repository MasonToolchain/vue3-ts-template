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
 * HTTP请求客户端配置
 */
export interface HttpClientConfig {
    // 请求基础路径
    baseURL?: string
    // 超时时间
    timeout?: number
    // 公共请求头
    headers?: Record<string, string>

    // 后期其他配置可以继续拓展
}