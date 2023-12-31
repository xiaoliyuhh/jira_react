import { User } from "screens/ProjectList/components/SearchPanel"
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from "react-router-dom"

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}
// 继承TableProps实现透传
interface ListProps extends TableProps<Project> {
    users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
    return (<Table
        pagination={false} columns={[{
            title: '名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text, record) => <Link to={String(record.id)}>{text}</Link>
        },
        {
            title: '部门',
            dataIndex: 'organization'
        },
        {
            title: '负责人',
            render: (value, project) => <span>{users.find((user) => user.id === project.personId)?.name || "未知"}</span>
        },
        {
            title: '创建时间',
            render: (value, project) => {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                </span>
            }
        }]}
        {...props}
    ></Table>)
}