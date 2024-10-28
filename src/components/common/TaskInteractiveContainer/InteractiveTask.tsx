import styled from "styled-components";
import {useTaskContext} from "@src/context/taskContext";
import React, {MouseEvent, useEffect, useRef, useState} from "react";
import {ITaskModel, updateTask} from "@src/services/indexedDB/models/taskModel";
import {useThrottle} from "@src/hooks/useThrottle";
import {Tooltip, Typography} from "@mui/material";

type StyledInteractiveTaskProps = {
    $top: number,
    $left: number,
    $right: number,
    $color: string
}

type Props = StyledInteractiveTaskProps & {
    taskId: number,
    containerRef?: HTMLDivElement
}

const Container = styled.div<StyledInteractiveTaskProps>`
    position: absolute;
    background-color: ${p => p.$color};
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

export const InteractiveTask = React.memo((p: Props) => {
    const {tasks, fetchTasks} = useTaskContext()
    const [currentTask, setCurrentTask] = useState<ITaskModel | null>(null)
    const leftButtonRef = useRef<HTMLDivElement>(null)
    const rightButtonRef = useRef<HTMLDivElement>(null)
    const [leftDiff, setLeftDiff] = useState<number>(0)
    const [rightDiff, setRightDiff] = useState<number>(0)
    const containerRect = p.containerRef?.getBoundingClientRect()

    const throttledLeft = useThrottle((e: MouseEvent) =>
        setLeftDiff(e.clientX - p.$left - containerRect.left), 100)

    const throttledRight = useThrottle((e: MouseEvent) =>
        setRightDiff(e.clientX - p.$right - containerRect.left), 100)

    const mouseMoveLeft = (e: React.MouseEvent) => throttledLeft(e)
    const mouseMoveRight = (e: React.MouseEvent) => throttledRight(e)

    const dragStartLeft = () =>
        document.addEventListener('dragover', mouseMoveLeft as () => {})

    const dragStartRight = () =>
        document.addEventListener('dragover', mouseMoveRight as () => {})

    const dragEndLeft = async () => {
        document.removeEventListener('dragover', mouseMoveLeft as () => {})
        const [x, y] = [containerRect.left + p.$left + leftDiff, containerRect.top + p.$top]
        const droppedElement = document.elementFromPoint(x, y)
        const [date, month, year] = droppedElement.getAttribute('data-date').split('.')
        currentTask.start = new Date(+year, +month, +date)
        await updateTask(currentTask)
        fetchTasks()
        setLeftDiff(0)
    }
    ///TODO: Реализовать сторонний API (класс) для работы с датами
    const dragEndRight = async () => {
        document.removeEventListener('dragover', mouseMoveRight as () => {})
        const [x, y] = [containerRect.left + p.$right + rightDiff, containerRect.top + p.$top]
        const droppedElement = document.elementFromPoint(x, y)
        const [date, month, year] = droppedElement.getAttribute('data-date').split('.')
        currentTask.end = new Date(+year, +month, +date)
        await updateTask(currentTask)
        fetchTasks()
        setRightDiff(0)
    }

    const localize = (date: Date) => {
        const target = date ?? new Date()
        return target.toLocaleDateString('ru-RU', {month: 'long', day: 'numeric', year: 'numeric'})
    }

    useEffect(() => {
        const current = tasks.find(i => i.id === p.taskId)
        setCurrentTask(current)
    }, []);

    return (
        <>
            <Container $top={p.$top} $left={p.$left + leftDiff} $right={p.$right + rightDiff} $color={p.$color}>
                <Tooltip title={localize(currentTask?.start)}>
                    <Button
                        draggable
                        ref={leftButtonRef}
                        onDragStart={dragStartLeft}
                        onDragEnd={dragEndLeft}
                    />
                </Tooltip>
                <Typography variant="body1" sx={{
                    color: 'var(--white)',
                    textOverflow: 'clip',
                    textWrap: 'nowrap',
                    overflow: 'hidden',
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 16,
                    textAlign: 'center',
                }}>{currentTask?.title}</Typography>
                <Tooltip title={localize(currentTask?.end)}>
                    <Button
                        draggable
                        ref={rightButtonRef}
                        onDragStart={dragStartRight}
                        onDragEnd={dragEndRight}
                    />
                </Tooltip>
            </Container>
        </>
    );
});