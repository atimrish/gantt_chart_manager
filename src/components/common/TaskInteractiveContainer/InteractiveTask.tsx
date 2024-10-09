import styled from "styled-components";
import {useTaskContext} from "@src/context/taskContext";
import {useEffect, useState} from "react";
import {ITaskModel} from "@src/services/indexed-db/models/taskModel";

type StyledInteractiveTaskProps = {
    $top: number,
    $left: number,
    $right: number
}

type Props = StyledInteractiveTaskProps & {
    taskId: number
}

const Container = styled.div<StyledInteractiveTaskProps>`
    position: absolute;
    background-color: red;
    text-overflow: clip;
    text-wrap: nowrap;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: var(--white);
    padding: 0 4px;
    
    top: ${p => p.$top}px;
    left: ${p => p.$left}px;
    width: ${p => p.$right - p.$left}px;
    height: 20px;
    border-radius: 8px;
`

export const InteractiveTask = (p: Props) => {
    const {tasks} = useTaskContext()
    const [currentTask, setCurrentTask] = useState<ITaskModel|null>(null)

    useEffect(() => {
        const current = tasks.find(i => i.id === p.taskId)
        setCurrentTask(current)
    }, []);

    return (
        <Container $top={p.$top} $left={p.$left} $right={p.$right}>
            {currentTask?.title}
        </Container>
    );
};