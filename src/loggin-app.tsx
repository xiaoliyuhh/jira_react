import { useAuth } from "context/auth-context"
import { ProjectScreen } from "screens/ProjectList"
import styled from "@emotion/styled"
import { Row } from 'components/lib'
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, MenuProps } from "antd"

export const LogginApp = () => {
    const { logout, user } = useAuth()
    const items: MenuProps['items'] = [{
        key: 1,
        label: '登出',
        onClick: logout
    }]
    return (
        <Container>
            <Header butween={true}>
                <HeaderLeft gap={true}>
                    <SoftWareLogo width={'18rem'} color={'rgb(38,132,255'}></SoftWareLogo>
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
            <Main>
                <ProjectScreen />
            </Main>
        </Container>
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


