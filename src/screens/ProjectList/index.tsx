import { List } from "./components/List"
import { SearchPanel } from "./components/SearchPanel"
import { useDebounce } from "utils"
import styled from '@emotion/styled'
import { Typography } from "antd"
import { useUsers } from "utils/use-users";
import { useProjects } from "utils/project";
import { useProjectsSearchParams } from "./utils"

export const ProjectScreen = () => {
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list } = useProjects(useDebounce(param));
    const { data: users } = useUsers();

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List loading={isLoading} users={users || []} dataSource={list || []}></List>
        </Container>
    )
}
const Container = styled.div`
  padding: 3.2rem
`