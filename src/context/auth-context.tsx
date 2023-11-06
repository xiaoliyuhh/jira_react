import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import * as auth from 'auth-provider'
import { User } from "screens/ProjectList/components/SearchPanel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageLoading } from "components/lib";

interface AuthForm {
    username: string,
    password: string
}
// 解决页面刷新就登出了
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        // 如果请求的到token就带着token去请求me这个API，me API的返回值包括user信息
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = createContext<{
    user: User | null,
    login: (form: AuthForm) => Promise<void>,
    register: (form: AuthForm) => Promise<void>
    logout: () => Promise<void>
} | undefined>(undefined)
// 用在devtool中，方便查看相关组件树，在实际应用中没什么作用
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, error, isReady, isLoading, isError, run, setData: setUser } = useAsync<User | null>()
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))
    // 加载的时候调用bootstrapUser
    useMount(() => {
        run(bootstrapUser()).then(setUser)
    })
    if (isReady || isLoading) {
        return <FullPageLoading></FullPageLoading>
    }
    return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>
}
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}