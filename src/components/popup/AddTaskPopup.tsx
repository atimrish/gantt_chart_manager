import styled, {css} from "styled-components";
import CloseSrc from "@assets/images/close.svg"
import {usePopupContext} from "@src/services/popup-holder/hooks/usePopupContext";
import {FormEventHandler, useRef, useState} from "react";
import {createTask, ITaskModel} from "@src/services/indexed-db/models/taskModel";
import {useTaskContext} from "@src/context/taskContext";

const PopupContainer = styled.div`
    width: 1048px;
    height: 840px;
    border-radius: 35px;
    background-color: var(--light-gray);
    padding: 32px;
`

const InteractiveBlock = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
`

const CloseIcon = styled(CloseSrc)`
    width: 100%;
    height: 100%;
`

const CloseButton = styled.button`
    width: 48px;
    height: 48px;
    overflow: hidden;
    background-color: transparent;
    border-radius: 50%;
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const TitleInput = styled.input`
    font-size: 24px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 550;
    color: var(--black);
    width: 100%;
    border: none;
    padding: 6px;
`

const TextStyles = css`
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 550;
    color: var(--black);
`

const Label = styled.label`
    ${TextStyles}   
`

const DataText = styled.div`
    ${TextStyles}
`

const Textarea = styled.textarea`
    padding: 20px 20px 0 20px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    min-height: 500px;
    border: none;
    border-radius: 35px;
    resize: none;
`

const FormButton = styled.button`
    ${TextStyles};
    width: 120px;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
`

interface ICreateTaskForm {
    title: string
    description: string
    start: string
    end: string
}

export const AddTaskPopup = () => {
    const {shiftPopup} = usePopupContext()
    const {setTasks} = useTaskContext()
    const closePopup = () => shiftPopup()

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
        shiftPopup()
    }

    return (
        <>
            <PopupContainer>
                <InteractiveBlock>
                    <CloseButton onClick={closePopup}>
                        <CloseIcon/>
                    </CloseButton>
                </InteractiveBlock>
                <Form onSubmit={onSubmit}>
                    <TitleInput
                        placeholder="Название задачи"
                        value={formState.title}
                        onInput={(e) => setFormState({
                            ...formState,
                            title: e.currentTarget.value
                        })}
                    />
                    <DataText>Дата создания: {nowString.current}</DataText>
                    <Label>
                        <span>Сроки реализации: </span>
                        <input
                            type="date"
                            onChange={(e) => setFormState({
                                ...formState,
                                start: e.currentTarget.value
                            })}
                        />
                        <span> - </span>
                        <input
                            type="date"
                            onChange={(e) => setFormState({
                                ...formState,
                                end: e.currentTarget.value
                            })}
                        />
                    </Label>
                    <DataText>Завершено: нет</DataText>
                    <Textarea
                        value={formState.description}
                        onInput={(e) => setFormState({
                            ...formState,
                            description: e.currentTarget.value
                        })}
                    />
                    <FormButton>сохранить</FormButton>
                </Form>
            </PopupContainer>
        </>
    );
};