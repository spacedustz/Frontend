import React, {useState} from "react";
import {ViewContainer} from "../../styles/container/ViewContainer.ts";
import ReactMarkdown from "react-markdown";
import MarkdownComponent from "../note/MarkdownComponent.tsx";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import gfm from "remark-gfm";
import {
    TodoContainer,
    StyledInput,
    StyledButton,
    HeaderSection,
    HeaderTab,
    Tab,
    Tasks,
    UnderLine, DoneTasks, StyledImage, DoneTitle, DoneContent
} from "../../styles/assignment/TodoApp.ts";

interface Task {
    id: string
    content: string
    isDone: boolean
}

const TodoApp: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [taskList, setTaskList] = useState<Task[]>([]);

    const generateRandomId = () => {
        return '_' + Math.random().toString(36).substring(2, 9);
    }

    const addTask = () => {
        const task = {
            id: generateRandomId(),
            content: input,
            isDone: false
        }

        setTaskList([...taskList, task]);
        setInput('');
    }

    const toggleDone = (id: string) => {
        setTaskList(taskList.map(task =>
            task.id === id ? {...task, isDone: !task.isDone} : task
        ));
    }

    const deleteTask = (id: string) => {
        setTaskList(taskList.filter(task => task.id !== id));
    }

    const filterTabs = (tab: string) => {
        if (tab !== null && tab !== undefined && tab !== "") {
            if (tab === '전체') {

            }

            else if (tab === '진행중') {

            }

            else if (tab === '완료') {

            }
        } else {
            console.log('Tab 선택 에러 발생')
        }
    }

    return (
        <div style={{all: "initial"}}>
            <TodoContainer>
                <h4 style={{marginTop: "30px"}}>Todo List</h4>

                <section>
                    <StyledInput
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="할일을 입력 해주세요."
                    />
                    <StyledButton onClick={addTask}>+</StyledButton>
                </section>

                <HeaderSection>
                    <HeaderTab>
                        <UnderLine/>
                        <Tab onClick={() =>filterTabs('전체')}>전체</Tab>
                        <Tab onClick={() =>filterTabs('진행중')}>진행중</Tab>
                        <Tab onClick={() =>filterTabs('완료')}>완료</Tab>
                    </HeaderTab>

                    <div>
                        {taskList.map((task) => (
                            <div key={task.id}>
                                {task.isDone ? (
                                    <DoneTasks>
                                        <DoneContent>
                                            <DoneTitle>{task.content}</DoneTitle>
                                        </DoneContent>

                                        <div>
                                            <StyledButton onClick={() => toggleDone(task.id)}>
                                                <StyledImage src="../../../public/assets/todo/return.svg" alt="return"/>
                                            </StyledButton>

                                            <StyledButton onClick={() => deleteTask(task.id)}>
                                                <StyledImage src="../../../public/assets/todo/trash.svg" alt="trash"/>
                                            </StyledButton>
                                        </div>
                                    </DoneTasks>
                                ) : (
                                    <Tasks>
                                        <div>{task.content}</div>

                                        <div>
                                            <StyledButton onClick={() => toggleDone(task.id)}>
                                                <StyledImage src="../../../public/assets/todo/check.svg" alt="check"/>
                                            </StyledButton>

                                            <StyledButton onClick={() => deleteTask(task.id)}>
                                                <StyledImage src="../../../public/assets/todo/trash.svg" alt="trash"/>
                                            </StyledButton>
                                        </div>
                                    </Tasks>
                                )}
                            </div>
                        ))}

                    </div>
                </HeaderSection>
            </TodoContainer>

            <div style={{all: 'initial'}}>
                <ViewContainer>
                    <div style={{padding: "30px"}}>
                        <ReactMarkdown
                            components={MarkdownComponent}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            remarkPlugins={[gfm]}
                            children={'ddd'}
                        >
                        </ReactMarkdown>
                    </div>
                </ViewContainer>
            </div>
        </div>
    );
};

export default TodoApp;
