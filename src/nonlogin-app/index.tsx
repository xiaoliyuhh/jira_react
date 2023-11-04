import { useState } from "react"
import { RegisterScreen } from "./register"
import { LoginScreen } from "./login"
import { Card, Button } from 'antd'

export const NonloginApp = () => {
    // 默认是未登录状态
    const [isRegister, setIsRegister] = useState(false)
    return (<Card style={{ display: 'flex', justifyContent: 'center' }}>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button type='primary' onClick={() => setIsRegister(!isRegister)}>
            切换到{isRegister ? "登录" : "注册"}
        </Button>
    </Card>
    );

}