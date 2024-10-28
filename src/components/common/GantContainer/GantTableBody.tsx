import React from "react";
import {ITaskModel} from "@src/services/indexedDB/models/taskModel";
import {IGantTableDays} from "@comp/common/GantContainer/interfaces/IGantTableDays";

type Props = {
    tasks: Array<ITaskModel>,
    days: Array<IGantTableDays>
}

export const GantTableBody = ({tasks, days}: Props) => {
    return (
        <>
            <tbody>
            {
                tasks.map(({start, end, id}) =>
                    <tr key={+id}>
                        {
                            days.map(({date, year, month}, index) => {
                                    const isTask =
                                        [start.getDate(), end.getDate()].includes(date) &&
                                        [start.getMonth(), end.getMonth()].includes(month) &&
                                        [start.getFullYear(), end.getFullYear()].includes(year)

                                    return (
                                        <td
                                            key={index}
                                            data-task={isTask ? +id : null}
                                            data-date={`${date}.${month}.${year}`}
                                        ></td>
                                    )
                                }
                            )
                        }
                    </tr>
                )
            }
            </tbody>
        </>
    );
};