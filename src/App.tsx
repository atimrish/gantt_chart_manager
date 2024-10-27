import {FC} from "react";
import {MainLayout} from "@src/layout/MainLayout";
import styled from "styled-components";
import {TaskContainer} from "@comp/common/TasksContainer/TaskContainer";
import {GantContainer} from "@comp/common/GantContainer/GantContainer";
import {ProviderTree} from "@comp/hoc/ProviderTree";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Workflow = styled.div`
    display: flex;
    gap: 10px;
    height: calc(100vh - 94px);
`

const Tasks = styled.div`
    background-color: var(--light-gray);
    border-radius: 35px;
    width: 274px;
    height: 100%;
`

const Gant = styled.div`
    background-color: var(--light-gray);
    border-radius: 35px;
    height: 100%;
    width: 100%;
    overflow-x: scroll;
`

export const App: FC = () => {
    return (
        <>
            <ProviderTree>
                <MainLayout>
                    <Workflow>
                        <Tasks>
                            <TaskContainer/>
                        </Tasks>
                        <Gant>
                            <GantContainer/>
                        </Gant>
                    </Workflow>
                </MainLayout>
            </ProviderTree>
        </>
    );
};