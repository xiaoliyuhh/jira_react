// 要在组件中使用css属性，需要指定本文件的编译器
import { Select, Input, Form } from 'antd'

export interface User {
    id: string,
    name: string,
    email: string,
    title: string,
    organazition: string,
    token: string
}
interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelProps['param']) => void;
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {

    return <Form style={{ marginBottom: '2rem' }} layout='inline'>
        <Form.Item>
            <Input type="text" value={param.name} onChange={
                e => setParam({
                    ...param,
                    name: e.target.value
                })
            } />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => {
                setParam({
                    ...param,
                    personId: value
                })
            }}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </Select>
        </Form.Item>
    </Form>
}