import { Env } from "@/utils/env"
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { HttpClientConfig } from "./types"
import { Interceptors } from "./interceptors"

// HTTP请求客户端的默认配置
const defaultConfig: HttpClientConfig = {
    baseURL: Env.get('VITE_API_BASE_URL', '/api'),
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}

/**
 * HttpClinet 基础 HTTP 客户端类
 * 负责创建 Axios 实例和封装基础请求方法
 */
export class HttpClient {
    protected instance: AxiosInstance
    protected config: HttpClientConfig
    private interceptors: Interceptors

    /**
     * 构造函数
     * @param config 配置选项
     */
    constructor(config: HttpClientConfig = {}) {
        this.config = { ...defaultConfig, ...config }
        // 实例化拦截器对象
        this.interceptors = new Interceptors(this.config.interceptor ?? {})
        this.instance = this.createInstance()
        // 应用拦截器
        this.setInterceptors()
    }

    /**
     * 设置拦截器
     */
    private setInterceptors(): void {
        this.interceptors.applyInterceptors(this.instance)
    }

    /**
     * 创建 Axios 实例
     * @returns AxiosInstance
     */ 
    private createInstance(): AxiosInstance {
        return axios.create({
            baseURL: this.config.baseURL,
            timeout: this.config.timeout,
            headers: this.config.headers
        })
    }

    /**
     * 封装 GET 请求
     * @param url 请求地址
     * @param config 请求配置 
     */
    public get(url: string, config?: AxiosRequestConfig): Promise<any> {
        return this.instance.get(url, config)
    }

    /**
     * 封装 POST 请求
     * @param url 请求地址
     * @param data 请求数据
     * @param config 请求配置 
     */
    public post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        return this.instance.post(url, data, config)
    }

    /**
     * 封装 PUT 请求
     * @param url 请求地址
     * @param data 请求数据
     * @param config 请求配置 
     */
    public put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        return this.instance.put(url, data, config)
    }

    /**
     * 封装 DELETE 请求
     * @param url 请求地址
     * @param config 请求配置 
     */
    public delete(url: string, config?: AxiosRequestConfig): Promise<any> {
        return this.instance.delete(url, config)
    }

    /**
     * 封装 PATCH 请求
     * @param url 请求地址
     * @param data 请求数据
     * @param config 请求配置 
     */
    public patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
        return this.instance.patch(url, data, config)
    }

    /**
     * 获取 Axios 实例
     * @returns AxiosInstance
     */
    public getInstance(): AxiosInstance {
        return this.instance
    }
}
