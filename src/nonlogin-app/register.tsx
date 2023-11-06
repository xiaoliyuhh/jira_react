import { useAuth } from "context/auth-context"
import { Form, Input } from 'antd'
import { LongButton } from "./login";
import { useAsync } from "utils/use-async";
import { login } from "auth-provider";

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    // const { register, user } = useAuth()
    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     register({ username, password })
    // }
    const { register, user } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    const handleSubmit = ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
        run(login(values))
        if (cpassword === values.password) {
            run(register(values)).catch(e => onError(e))
        } else {
            onError(new Error('请确认两次的输入密码相同'))
            return
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username" />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder="密码" type="password" id="password" />
            </Form.Item>
            <Form.Item name="cpassword" rules={[{ required: true, message: "请确认密码" }]}>
                <Input placeholder="确认密码" type="password" id="cpassword" />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType="submit" type="primary">注册</LongButton>
            </Form.Item>
        </Form>
    );

}