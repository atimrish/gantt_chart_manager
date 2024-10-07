import {FC, ReactNode} from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 10px;
`

const TopBar = styled.div`
    background-color: var(--accent-color);
    padding: 8px 10px;
    border-radius: 35px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`

const Logo = styled.div`
    color: var(--black);
    background-color: #DEDEDE;
    border-radius: 35px;
    text-align: center;
    width: 110px;
    height: 48px;
    line-height: 48px;
`

const Profile = styled.div`
    width: 48px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: #DEDEDE;
`

type Props = {
    children: ReactNode
}

export const MainLayout:FC<Props> = (p: Props) => {
    return (
        <>
            <Container>
                <TopBar>
                    <Logo>LOGO</Logo>
                    <Profile/>
                </TopBar>
                <div>
                    {p.children}
                </div>
            </Container>
        </>
    )
}