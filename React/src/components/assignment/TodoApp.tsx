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
    UnderLine, DoneTasks
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
                        <Tab>전체</Tab>
                        <Tab>진행중</Tab>
                        <Tab>완료</Tab>
                    </HeaderTab>

                    <div>
                        {taskList.map((task) => (
                            <Tasks key={task.id}>
                                {task.isDone ? (
                                    <DoneTasks>
                                        <div style={{textDecoration: "line-through"}}>{task.content}</div>

                                        <div>
                                            <StyledButton onClick={() => toggleDone(task.id)}>취소</StyledButton>
                                            <StyledButton onClick={() => deleteTask(task.id)}>Delete</StyledButton>
                                        </div>
                                    </DoneTasks>
                                ) : (
                                    <Tasks>
                                        <div>{task.content}</div>

                                        <div>
                                            <StyledButton onClick={() => toggleDone(task.id)}>완료</StyledButton>
                                            <StyledButton onClick={() => deleteTask(task.id)}>Delete</StyledButton>
                                        </div>
                                    </Tasks>
                                )}
                            </Tasks>
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