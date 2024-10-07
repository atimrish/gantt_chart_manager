import {ITaskModel} from "@src/services/indexed-db/models/taskModel";
import TaskSrc from "@assets/images/task.svg"
import styled from "styled-components";

const TaskIcon = styled(TaskSrc)`
    width: 24px;
    height: 24px;
    fill: var(--black);
    
    & path {
        fill: var(--black);
    }
`

const TaskContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.2s ease;
    text-wrap: balance;
    
    & > * {
        flex-shrink: 0;
    }
    
    &:hover {
        background-color: rgba(120, 119, 119, .2);
    }
`

export const Task = (p: ITaskModel) => {
    return (
        <>
            <TaskContainer>
                <TaskIcon/>
                <span>{p.title}</span>
            </TaskContainer>
        </>
    );
};