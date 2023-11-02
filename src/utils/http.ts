import * as qs from "qs"
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;
// 找到fetch的定义可以知道fetch的第二个参数是RequestInit类型的，但是data和roken并不属于RequestInit的API，所以写一个继承的再给data和token类型定义
interface Config extends RequestInit {
    data?: object,
    token?: string
}
// 有解构的情况下使用?设置可选，而是赋默认值
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    // 在get请求中携带的参数直接放在url中，而其他的放在body中
    const config = {
        // 这里method默认为GET，但是后面的customConfig如果是其他方法会直接覆盖这个方法
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    }
    else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            // 返回401就退出登录
            if (response.status === 401) {
                // 这个不在AuthProvider中，所以不能直接使用useAuth
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                // 服务端如果返回异常，fetch如果不手动抛出异常，fetch不会抛出异常（可以使用catch测试）
                // 服务端如果返回异常，axios会抛出异常
                return Promise.reject(data)
            }
        })
}
// 需要一个可以自动携带token的方法
export const useHttp = () => {
    const { user } = useAuth()
    // 如果你要设置可选参数就要用Parameters来读取http对应的类型，否则不能成功设置可选
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}