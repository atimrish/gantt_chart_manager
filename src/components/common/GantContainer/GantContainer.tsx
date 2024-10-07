import styled from "styled-components";
import {useTaskContext} from "@src/context/taskContext";
import {createRef, MouseEventHandler, useRef, useState} from "react";

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
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
        }

        &:last-child td {
            height: 500px;
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
    const months = []
    const days = []

    for (let i = 0; i < countMonths; i++) {
        const currentMonth = clonedStartDate.getMonth()

        months.push({
            year: clonedStartDate.getFullYear(),
            month: clonedStartDate.toLocaleDateString('ru-RU', {month: 'long'}),
            daysCount: 0
        })

        for (; clonedStartDate.getMonth() === currentMonth;) {
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

    const minDate =
        tasks.reduce((acc, cur) => acc > cur.start ? cur.start : acc, new Date())

    const {days, months} = dates(3, minDate)
    const containerRef = useRef<HTMLDivElement>(null)

    const [taskCords, setTaskCords] = useState([])

    return (
        <>
            <Container ref={containerRef}>
                <Table>
                    <thead>
                    <tr>
                        {
                            months.map((m, index) =>
                                <th key={index} colSpan={m.daysCount}>{m.month} {m.year}</th>)
                        }
                    </tr>
                    <tr>
                        {
                            days.map((d, index) =>
                                <th key={index}>{d.date}</th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map(({start, end, id}) =>
                            <tr key={+id}>
                                {
                                    days.map(({date, year, month}, index) => {

                                            const isStart =
                                                start.getDate() === date &&
                                                start.getMonth() === month &&
                                                start.getFullYear() === year

                                            const isEnd =
                                                end.getDate() === date &&
                                                end.getMonth() === month &&
                                                end.getFullYear() === year


                                            const onClick: MouseEventHandler = (e) => {
                                                console.log(e.currentTarget.getBoundingClientRect())
                                            }

                                            if (isStart) {
                                                return <td onClick={onClick} key={index}>{+id}</td>
                                            }

                                            if (isEnd) {
                                                return <td onClick={onClick} key={index}>{+id}</td>
                                            }

                                            return <td onClick={onClick} key={index}></td>
                                        }
                                    )
                                }
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    );
};