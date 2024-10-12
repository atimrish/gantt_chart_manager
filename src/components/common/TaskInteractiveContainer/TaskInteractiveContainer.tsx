import {InteractiveTask} from "@comp/common/TaskInteractiveContainer/InteractiveTask";

export type TaskCoordinate = {
    taskId: number;
    start: Element;
    end: Element;
}

type Props = {
    taskCoordinates: Array<TaskCoordinate>
    containerRef?: HTMLDivElement
}

export const TaskInteractiveContainer = (p: Props) => {
    const cords = (() => {
        if (p.containerRef) {
            const containerCords = p.containerRef.getBoundingClientRect();
            return p.taskCoordinates.map(t => {
                const start = t.start.getBoundingClientRect()
                const end = t.end.getBoundingClientRect()

                return {
                    taskId: t.taskId,
                    top: start.top - containerCords.top + 4.5,
                    left: start.left - containerCords.left + 4,
                    right: end.right - containerCords.left - 6,
                }
            })
        }
        return []
    })()

    return (
        <>
            <div>
                {
                    cords.map(t =>
                        <InteractiveTask
                            key={t.taskId}
                            containerRef={p.containerRef}
                            $top={t.top}
                            $left={t.left}
                            $right={t.right}
                            taskId={+t.taskId}
                        />
                    )
                }
            </div>
        </>
    );
};