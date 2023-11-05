import { List } from "./components/List"
import { SearchPanel } from "./components/SearchPanel"
import { useState, useEffect } from "react"
import { cleanObject, useDebounce, useMount } from "utils"
import { useHttp } from "utils/http";
import styled from '@emotion/styled'

export const ProjectScreen = () => {
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const debouncedParam = useDebounce(param, 2000)
    const client = useHttp()
    // 初始化list
    useEffect(() => {
        // 如果说name为空，会引起歧义，并不能筛选出来，因为json-server会去找name为空的选项，可以清理对象的空值
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    }, [debouncedParam])
    // 初始化users
    useMount(() =>
        // 可以不用传...customConfig，所以需设可选在http文件中
        client('users').then(setUsers)
    )

    return <div>
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
            <List list={list} users={users}></List>
        </Container>
    </div>
}
const Container = styled.div`
  padding: 3.2rem
`