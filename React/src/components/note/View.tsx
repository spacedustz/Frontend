import React from 'react';
import ReactMarkdown, {Components} from 'react-markdown';
import gfm from 'remark-gfm';
import {useParams} from "react-router-dom";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import styled from "styled-components";
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import {ViewContainer} from "../../styles/container/ViewContainer.ts";

const SyntaxHighlighterContainer = styled.div`
    overflow: auto;
    background-color: gray;
    border-radius: 10px;
`;

const LanguageLabel = styled.div`
    background-color: gray;
    padding-left: 7px;
`;

const components: Components = {
    code({className, children, ...props}) {
        const match = className ? /language-(\w+)/.exec(className) : null;

        return match ?
            <SyntaxHighlighterContainer>
                <LanguageLabel>{match ? match[1] : 'text'}</LanguageLabel>
                <SyntaxHighlighter
                    style={{
                        ...dracula,
                        margin: 0
                    }}
                    language={match[1] || ''}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                />
            </SyntaxHighlighterContainer>
            : <code className={className} {...props}>{children}</code>
    },
    blockquote({children}) {
        return <blockquote
            style={
                {
                    color: 'black',
                    borderLeft: '3px solid rgba(30,30,30,0.5)',
                    paddingLeft: '10px',
                    background: 'rgba(100, 100, 100, 0.3)'
                }
            }>{children}</blockquote>;
    }
};

const View: React.FC = () => {
    const {id} = useParams();
    const note = JSON.parse(localStorage.getItem(id) || '{}');

    return (
        <div style={{all: 'initial'}}>
            <ViewContainer>
                <div style={{padding: "30px"}}>
                    <ReactMarkdown
                        components={components}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        remarkPlugins={[gfm]}
                        children={note.content}
                    >
                    </ReactMarkdown>
                </div>
            </ViewContainer>
        </div>
    );
};

export default View;
