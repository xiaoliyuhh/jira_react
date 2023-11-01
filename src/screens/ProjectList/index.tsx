import { List } from "./components/List"
import { SearchPanel } from "./components/SearchPanel"
import { useState, useEffect } from "react"
import * as qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils"


const apiUrl = process.env.REACT_APP_API_URL
export const ProjectScreen = () => {
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [users, setUsers] = useState([])
    const debouncedParam = useDebounce(param, 2000)
    // 初始化list
    useEffect(() => {
        // 如果说name为空，会引起歧义，并不能筛选出来，因为json-server会去找name为空的选项，可以清理对象的空值
        fetch(`${apiUrl}/projects/?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])
    // 初始化users
    useMount(
        () => fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    )

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}