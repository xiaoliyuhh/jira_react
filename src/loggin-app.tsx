import { useAuth } from "context/auth-context"
import { ProjectScreen } from "screens/ProjectList"

export const LogginApp = () => {
    const { logout } = useAuth()
    return <div>
        <button onClick={logout}>登出</button>
        <ProjectScreen></ProjectScreen>
    </div>
}