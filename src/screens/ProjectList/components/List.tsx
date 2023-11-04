import { User } from "screens/ProjectList/components/SearchPanel"
import { Table } from 'antd'

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organaization: string;
}
interface ListProps {
    list: Project[],
    users: User[]
}
export const List = ({ list, users }: ListProps) => {
    return <Table pagination={false} columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
    }, {
        title: '负责人',
        render: (text, project) => <span>{users.find((user) => user.id === project.personId)?.name || "未知"}</span>
    }]} dataSource={list}></Table>
}