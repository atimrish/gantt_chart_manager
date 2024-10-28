import styled from "styled-components";
import {useTaskContext} from "@src/context/taskContext";
import React, {useEffect, useRef, useState} from "react";
import {TaskCoordinate, TaskInteractiveContainer} from "@comp/common/TaskInteractiveContainer/TaskInteractiveContainer";
import {Typography} from "@mui/material";
import {IGantTableHeadingMonth} from "@comp/common/GantContainer/interfaces/IGantTableHeadingMonth";
import {IGantTableDays} from "@comp/common/GantContainer/interfaces/IGantTableDays";
import {GantTableHeading} from "@comp/common/GantContainer/GantTableHeading";
import {GantTableBody} from "@comp/common/GantContainer/GantTableBody";

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
    position: relative;
`

const Table = styled.table`
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
    border-collapse: collapse;
    color: var(--black);

    thead {

        & > tr:first-child th {
            border-top: none;
        }

        & > tr:last-child > th:first-child {
            border-left: none;
        }

        th {
            border: 1px solid var(--black);
        }

        & > :nth-child(1) {
            font-weight: 700;
        }
    }

    tbody > tr {
        td {
            position: relative;
            
            &:hover {
                background-color: antiquewhite;
            }
        }
    }

    td {
        border-right: 1px solid var(--black);

    }

    & :where(th, td) {
        height: 22px;
        min-width: 22px;
        line-height: 22px;
    }
`

const dates = ((countMonths: number, startDate: Date) => {
    const clonedStartDate = new Date(startDate)
    const months: Array<IGantTableHeadingMonth> = []
    const days: Array<IGantTableDays> = []

    for (let i = 0; i < countMonths; i++) {
        const currentMonth = clonedStartDate.getMonth()

        months.push({
            year: clonedStartDate.getFullYear(),
            month: clonedStartDate.toLocaleDateString('ru-RU', {month: 'long'}),
            daysCount: 0
        })

        while (clonedStartDate.getMonth() === currentMonth) {
            months[i].daysCount++
            days.push({
                date: clonedStartDate.getDate(),
                month: clonedStartDate.getMonth(),
                year: clonedStartDate.getFullYear(),
            })
            clonedStartDate.setDate(clonedStartDate.getDate() + 1)
        }
    }

    return {months, days}
})

export const GantContainer = () => {
    const {tasks} = useTaskContext()
    const [taskCoordinates, setTaskCoordinates] = useState<Array<TaskCoordinate>>([])

    const minDate =
        tasks.reduce((acc, cur) => acc > cur.start ? cur.start : acc, new Date())

    const {days, months} = dates(4, minDate)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const interactive: Array<TaskCoordinate> = tasks.map(t => {
            const nodes = containerRef.current.querySelectorAll(`td[data-task="${t.id}"]`)
            return {
                taskId: +t.id,
                start: nodes[0],
                end: nodes[1] ?? nodes[0],
            }
        })
        setTaskCoordinates(interactive)
    }, [tasks]);

    return (
        <>
            <Container ref={containerRef}>
                <Table>
                    <GantTableHeading months={months} days={days} />
                    <GantTableBody tasks={tasks} days={days} />
                </Table>
                <TaskInteractiveContainer taskCoordinates={taskCoordinates} containerRef={containerRef.current} />
            </Container>
        </>
    );
};