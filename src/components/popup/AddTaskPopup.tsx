import styled from "styled-components";
import {FormEventHandler, useRef, useState} from "react";
import {createTask, ITaskModel} from "@src/services/indexed-db/models/taskModel";
import {useTaskContext} from "@src/context/taskContext";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

interface ICreateTaskForm {
    title: string
    description: string
    start: string
    end: string
}

interface IAddTaskPopupProps {
    open: boolean,
    closePopup: Function,
}

export const AddTaskPopup = (p: IAddTaskPopupProps) => {
    const {setTasks} = useTaskContext()

    const nowString = useRef(new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }))

    const [formState, setFormState] = useState<ICreateTaskForm>({
        title: '',
        description: '',
        start: '',
        end: ''
    })

    const onSubmit:FormEventHandler = async (e) => {
        e.preventDefault()

        const data: ITaskModel = {
            title: formState.title,
            description: formState.description,
            start: new Date(formState.start),
            end: new Date(formState.end),
            completed: false,
            createdAt: new Date(),
        }
        data.id = await createTask(data)
        setTasks(prev => [...prev, data])
    }

    return (
        <>
            <Dialog open={p.open}>
                <DialogTitle>Добавление задачи</DialogTitle>
                <Form onSubmit={onSubmit}>
                    <DialogContent>
                        <TextField
                            fullWidth
                            placeholder="Название задачи"
                            variant="standard"
                            value={formState.title}
                            onChange={(e) => setFormState({
                                ...formState,
                                title: e.currentTarget.value
                            })}
                        />
                        <Typography variant="body1" sx={{my: 2}}>Дата создания: {nowString.current}</Typography>

                        <div>
                            <Typography variant="body1" sx={{my: 1}}>Сроки реализации: </Typography>
                            <Typography variant="body1" component="label" htmlFor="start_date">Начало</Typography>
                            <input
                                id="start_date"
                                type="date"
                                onChange={(e) => setFormState({
                                    ...formState,
                                    start: e.currentTarget.value
                                })}
                            />
                            <Typography variant="body1" component="label" htmlFor="end_date">Конец</Typography>
                            <input
                                id="end_date"
                                type="date"
                                onChange={(e) => setFormState({
                                    ...formState,
                                    end: e.currentTarget.value
                                })}
                            />
                        </div>

                        <Typography variant="body1" sx={{my: 2}}>Завершено: нет</Typography>
                        <TextField
                            fullWidth
                            placeholder="Описание задачи"
                            multiline
                            variant="standard"
                            value={formState.description}
                            onChange={(e) => setFormState({
                                ...formState,
                                description: e.currentTarget.value
                            })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                        >сохранить</Button>

                        <Button
                            type="button"
                            variant="outlined"
                            onClick={() => p.closePopup()}
                        >закрыть</Button>
                    </DialogActions>

                </Form>
            </Dialog>
        </>
    );
};