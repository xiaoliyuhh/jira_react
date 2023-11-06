import styled from "@emotion/styled";
import { Form, Input, Button } from "antd"
import { useAuth } from "context/auth-context"
import { useAsync } from "utils/use-async";

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { login, user } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })
    const handleSubmit = (values: { username: string, password: string }) => {
        run(login(values)).catch(e => onError(e));
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username" />
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder="密码" type="password" id="password" />
            </Form.Item>
            <Form.Item>
                {/* 给按钮显示加载状态 */}
                <LongButton loading={isLoading} htmlType="submit" type="primary">登录</LongButton>
            </Form.Item>
        </Form>
    );
}
export const LongButton = styled(Button)`
width:100%
`