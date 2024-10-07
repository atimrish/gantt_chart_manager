import styled from "styled-components";
import AddIconSrc from "@assets/images/add.svg"
import {usePopupContext} from "@src/services/popup-holder/hooks/usePopupContext";
import {AddTaskPopup} from "@comp/popup/AddTaskPopup";
import {useEffect, useState} from "react";
import {getAllTasks, ITaskModel} from "@src/services/indexed-db/models/taskModel";
import {Task} from "@comp/common/Task/Task";
import {useTaskContext} from "@src/context/taskContext";

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

const Heading = styled.h2`
    color: var(--black);
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
`

export const TaskContainer = () => {
    const {pushPopup} = usePopupContext()
    const {tasks} = useTaskContext()

    const openPopup = () => {
        pushPopup(<AddTaskPopup/>)
    }

    return (
        <>
            <MainContainer>
                <HeadingBlock>
                    <Heading>Задачи</Heading>
                    <AddTaskButton onClick={openPopup}>
                        <AddIcon/>
                    </AddTaskButton>
                </HeadingBlock>
                <hr/>
                <div>
                    {tasks.map((t) => <Task {...t} key={+t.id} />)}
                </div>
            </MainContainer>
        </>
    );
};