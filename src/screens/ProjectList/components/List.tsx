import { User } from "screens/ProjectList/components/SearchPanel"
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
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>

        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}