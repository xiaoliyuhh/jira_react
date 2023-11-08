import { useAuth } from "context/auth-context"
import { ProjectScreen } from "screens/ProjectList"
import styled from "@emotion/styled"
import { Row } from 'components/lib'
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, MenuProps } from "antd"
import { Helmet } from 'react-helmet'
import { Navigate, BrowserRouter as Router } from "react-router-dom"
import { Route, Routes } from "react-router"
import { ProjectDetail } from "screens/projectdetail"
import { resetRoute } from "utils"

export const LogginApp = () => {
    return (
        <Container>
            <Helmet>
                <title>项目列表</title>
            </Helmet>
            <PageHeader></PageHeader>
            <Main>
                <Router>
                    <Routes>
                        <Route path={'/projects'} element={<ProjectScreen />}></Route>
                        <Route path={'/projects/:personId/*'} element={<ProjectDetail />}></Route>
                        <Route index element={<Navigate to="/projects" />} />
                    </Routes>
                </Router>
            </Main>
        </Container>
    )
}
const PageHeader = () => {
    const { logout, user } = useAuth()
    const items: MenuProps['items'] = [{
        key: 1,
        label: '登出',
        onClick: logout
    }]
    return (
        <Header butween={true}>
            <HeaderLeft gap={true}>
                <Button type="link" onClick={resetRoute}>
                    <SoftWareLogo width={'18rem'} color={'rgb(38,132,255'}></SoftWareLogo>
                </Button>
                <h3>项目</h3>
                <h3>用户</h3>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown menu={{ items }}>
                    <Button type='link' onClick={e => e.preventDefault()}>
                        Hi,{user?.name}
                    </Button>
                </Dropdown>
            </HeaderRight>
        </Header>
    )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
padding:3.2rem;
box-shadow:0 0 5px 0 rgba(0,0,0,0.1)
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``;
const Main = styled.main``;


