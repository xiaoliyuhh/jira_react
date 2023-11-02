import { useState } from "react"
import { RegisterScreen } from "./register"
import { LoginScreen } from "./login"

export const NonloginApp = () => {
    // 默认是未登录状态
    const [isRegister, setIsRegister] = useState(false)
    return <div>
        {
            isRegister ? <RegisterScreen></RegisterScreen> : <LoginScreen></LoginScreen>
        }
        <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</button>
    </div>
}