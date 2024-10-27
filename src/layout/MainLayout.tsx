import {FC, ReactNode} from "react";
import styled from "styled-components";
import {Avatar, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";

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
    align-items: center;
`

const Logo = styled.div`
    color: var(--black);
    background-color: #DEDEDE;
    border-radius: 35px;
    text-align: center;
    width: 110px;
    height: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

type Props = {
    children: ReactNode
}

export const MainLayout:FC<Props> = (p: Props) => {
    return (
        <>
            <Container>
                <TopBar>
                    <Logo>
                        <Typography variant="h5">LOGO</Typography>
                    </Logo>
                    <Avatar sx={{bgcolor: deepOrange[500]}}>N</Avatar>
                </TopBar>
                <div>
                    {p.children}
                </div>
            </Container>
        </>
    )
}