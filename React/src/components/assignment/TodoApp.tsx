import React from "react";
import {ViewContainer} from "../../styles/container/ViewContainer.ts";
import ReactMarkdown from "react-markdown";
import MarkdownComponent from "../note/MarkdownComponent.tsx";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import gfm from "remark-gfm";
import {TodoContainer,
    StyledInput,
    StyledButton,
    HeaderSection,
    HeaderTab,
    Tab,
    Tasks,
    UnderLine
} from "../../styles/assignment/TodoApp.ts";

const TodoApp: React.FC = () => {

    return (
        <div>
            <TodoContainer>
                <h4>Todo List</h4>

                <section>
                    <StyledInput
                        type="text"
                    />
                    <StyledButton>+</StyledButton>
                </section>

                <HeaderSection>
                    <HeaderTab>
                        <UnderLine>

                        </UnderLine>

                        <Tab>
                            All
                        </Tab>

                        <Tab>
                            Not Done
                        </Tab>

                        <Tab>
                            Done
                        </Tab>
                    </HeaderTab>

                    <div>
                        <Tasks>
                            집가기

                            <div>
                                <StyledButton>Check</StyledButton>

                                <StyledButton>Delete</StyledButton>
                            </div>
                        </Tasks>
                    </div>
                </HeaderSection>

                <div>

                </div>

                <div>

                </div>
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
