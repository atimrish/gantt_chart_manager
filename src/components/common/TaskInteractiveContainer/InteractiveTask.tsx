import styled from "styled-components";
import {useTaskContext} from "@src/context/taskContext";
import {useEffect, useRef, useState} from "react";
import {ITaskModel} from "@src/services/indexed-db/models/taskModel";
import {useThrottle} from "@src/hooks/useThrottle";

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
    padding: 0 4px;
    
    top: ${p => p.$top}px;
    left: ${p => p.$left}px;
    width: ${p => p.$right - p.$left}px;
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

export const InteractiveTask = (p: Props) => {
    const {tasks} = useTaskContext()
    const [currentTask, setCurrentTask] = useState<ITaskModel|null>(null)
    const leftButtonRef = useRef<HTMLDivElement>(null)
    const rightButtonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const current = tasks.find(i => i.id === p.taskId)
        setCurrentTask(current)
    }, []);

    useEffect(() => {
        const dragStartHandler = () => console.log('drag start')
        const throttled = useThrottle(() => console.log('drag'), 500)
        const dragHandler = () => throttled()
        const dragEndHandler = () => console.log('drag end')

        leftButtonRef.current.addEventListener('dragstart', dragStartHandler)
        leftButtonRef.current.addEventListener('drag', dragHandler)
        leftButtonRef.current.addEventListener('dragend', dragEndHandler)

        rightButtonRef.current.addEventListener('dragstart', dragStartHandler)
        rightButtonRef.current.addEventListener('drag', dragHandler)
        rightButtonRef.current.addEventListener('dragend', dragEndHandler)

        return () => {
            leftButtonRef.current.removeEventListener('dragstart', dragStartHandler)
            leftButtonRef.current.removeEventListener('drag', dragHandler)
            leftButtonRef.current.removeEventListener('dragend', dragEndHandler)

            rightButtonRef.current.removeEventListener('dragstart', dragStartHandler)
            rightButtonRef.current.removeEventListener('drag', dragHandler)
            rightButtonRef.current.removeEventListener('dragend', dragEndHandler)
        }
    }, []);

    ///TODO: реализовать throttle

    return (
        <Container $top={p.$top} $left={p.$left} $right={p.$right}>
            <Button draggable ref={leftButtonRef}/>
            <Title>{currentTask?.title}</Title>
            <Button draggable ref={rightButtonRef}/>
        </Container>
    );
};