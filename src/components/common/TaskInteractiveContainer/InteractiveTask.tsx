import styled from "styled-components";
import {useTaskContext} from "@src/context/taskContext";
import React, {DragEvent, MouseEvent, useEffect, useRef, useState} from "react";
import {ITaskModel, updateTask} from "@src/services/indexed-db/models/taskModel";
import {useThrottle} from "@src/hooks/useThrottle";

type StyledInteractiveTaskProps = {
    $top: number,
    $left: number,
    $right: number
}

type Props = StyledInteractiveTaskProps & {
    taskId: number,
    containerRef?: HTMLDivElement
}

const Container = styled.div<StyledInteractiveTaskProps>`
    position: absolute;
    background-color: red;
    padding: 0 4px;
    
    top: ${p => p.$top}px;
    left: ${p => p.$left}px;
    width: ${p => p.$right - p.$left}px;
    transition: all 0.1s ease-in-out;
    height: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.div`
    text-overflow: clip;
    text-wrap: nowrap;
    overflow: hidden;
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    text-align: center;
    color: var(--white);
`

const Button = styled.div`
    padding: 0;
    margin: 0;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    background-color: var(--light-gray);
    border: 4px solid transparent;
    
    &:hover {
        border-color: var(--black);
    }
`

let count = 0

export const InteractiveTask = React.memo((p: Props) => {
    console.log(++count)
    const {tasks, fetchTasks} = useTaskContext()
    const [currentTask, setCurrentTask] = useState<ITaskModel|null>(null)
    const leftButtonRef = useRef<HTMLDivElement>(null)
    const rightButtonRef = useRef<HTMLDivElement>(null)
    const containerRect = p.containerRef?.getBoundingClientRect()
    const [leftDiff, setLeftDiff] = useState<number>(0)
    const [rightDiff, setRightDiff] = useState<number>(0)

    const throttledLeft = useThrottle((e: MouseEvent) => {
        setLeftDiff(e.clientX - p.$left - containerRect.left)
    }, 100)

    const throttledRight = useThrottle((e: MouseEvent) => {
        setRightDiff(e.clientX - p.$right - containerRect.left)
    }, 100)

    const mouseMoveLeft = (e: React.MouseEvent) => throttledLeft(e)
    const mouseMoveRight = (e: React.MouseEvent) => throttledRight(e)

    const dragStartLeft = () => {
        document.addEventListener('dragover', mouseMoveLeft as () => {})
    }

    const dragStartRight = () => {
        document.addEventListener('dragover', mouseMoveRight as () => {})
    }

    const dragEndLeft = async () => {
        document.removeEventListener('dragover', mouseMoveLeft as () => {})
        const [x, y] = [containerRect.left + p.$left + leftDiff, containerRect.top + p.$top]
        const droppedElement = document.elementFromPoint(x, y)
        const [date, month, year] = droppedElement.getAttribute('data-date').split('.')
        currentTask.start.setDate(+date)
        currentTask.start.setMonth(+month)
        currentTask.start.setFullYear(+year)
        await updateTask(currentTask)
        fetchTasks()
        setLeftDiff(0)
    }

    const dragEndRight = async () => {
        document.removeEventListener('dragover', mouseMoveRight as () => {})
        const [x, y] = [containerRect.left + p.$right + rightDiff, containerRect.top + p.$top]
        const droppedElement = document.elementFromPoint(x, y)
        const [date, month, year] = droppedElement.getAttribute('data-date').split('.')
        currentTask.end.setDate(+date)
        currentTask.end.setMonth(+month)
        currentTask.end.setFullYear(+year)
        await updateTask(currentTask)
        fetchTasks()
        setRightDiff(0)
    }

    useEffect(() => {
        const current = tasks.find(i => i.id === p.taskId)
        setCurrentTask(current)
    }, []);

    return (
        <Container $top={p.$top} $left={p.$left + leftDiff} $right={p.$right + rightDiff}>
            <Button
                draggable
                ref={leftButtonRef}
                onDragStart={dragStartLeft}
                onDragEnd={dragEndLeft}
            />
            <Title>{currentTask?.title}</Title>
            <Button
                draggable
                ref={rightButtonRef}
                onDragStart={dragStartRight}
                onDragEnd={dragEndRight}
            />
        </Container>
    );
});