import {IGantTableHeadingMonth} from "@comp/common/GantContainer/interfaces/IGantTableHeadingMonth";
import {IGantTableDays} from "@comp/common/GantContainer/interfaces/IGantTableDays";
import {Typography} from "@mui/material";
import React from "react";

type Props = {
    months: Array<IGantTableHeadingMonth>
    days: Array<IGantTableDays>
}

export const GantTableHeading = (p: Props) => {
    const {months, days} = p

    return (
        <>
            <thead>
            <tr>
                {
                    months.map((m, index) =>
                        <th key={index} colSpan={m.daysCount}>
                            <Typography variant="body1" sx={{
                                fontWeight: 700,
                                textWrap: 'nowrap',
                            }}>{m.month} {m.year}</Typography>
                        </th>)
                }
            </tr>
            <tr>
                {
                    days.map((d, index) =>
                        <th key={index}>
                            <Typography variant="body1" sx={{fontSize: 14, lineHeight: '22px'}}>{d.date}</Typography>
                        </th>)
                }
            </tr>
            </thead>
        </>
    );
};