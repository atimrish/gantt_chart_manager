import styled from "styled-components";
import AddIconSrc from "@assets/images/add.svg"
import {AddTaskPopup} from "@comp/popup/AddTaskPopup";
import {Task} from "@comp/common/Task/Task";
import {useTaskContext} from "@src/context/taskContext";
import {useState} from "react";
import {Typography} from "@mui/material";

const MainContainer = styled.div`
    width: 100%;
    padding: 12px;
`

const HeadingBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`

const AddIcon = styled(AddIconSrc)`
    width: 100%;
    height: 100%;
    fill: var(--black);
    cursor: pointer;
    transition: all 0.3s ease;
    
    & * {
        transition: inherit;
        fill: var(--black);
    }
    
    &:hover {
        fill: var(--accent-color);
        
        & * {
            fill: var(--accent-color);
        }
    }
`

const AddTaskButton = styled.button`
    padding: 0;
    margin: 0;
    border: none;
    width: 32px;
    height: 32px;
    background-color: transparent;
    border-radius: 50%;
`

export const TaskContainer = () => {
    const {tasks} = useTaskContext()
    const [isOpenPopup, setIsOpenPopup] = useState(false)

    return (
        <>
            <MainContainer>
                <HeadingBlock>
                    <Typography variant="h6">Задачи</Typography>
                    <AddTaskButton onClick={() => setIsOpenPopup(true)}>
                        <AddIcon/>
                    </AddTaskButton>
                </HeadingBlock>
                <hr/>
                <div>
                    {tasks.map((t) => <Task {...t} key={+t.id} />)}
                </div>
            </MainContainer>
            <AddTaskPopup open={isOpenPopup} closePopup={() => setIsOpenPopup(false)}/>
        </>
    );
};