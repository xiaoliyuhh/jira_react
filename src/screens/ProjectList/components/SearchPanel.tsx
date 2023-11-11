// 要在组件中使用css属性，需要指定本文件的编译器
import { Input, Form } from 'antd'
import { Project } from './List';
import { UserSelect } from "components/user-select";

export interface User {
    id: number,
    name: string,
    email: string,
    title: string,
    organazition: string,
    token: string
}
interface SearchPanelProps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,
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
            <UserSelect
                defaultOptionName="负责人"
                value={param.personId}
                onChange={(value) => setParam({ ...param, personId: value, })}
            />
        </Form.Item>
    </Form>
}