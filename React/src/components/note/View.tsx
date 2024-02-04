import React from 'react';
import ReactMarkdown, {Components} from 'react-markdown';
import gfm from 'remark-gfm';
import {useParams} from "react-router-dom";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import styled from "styled-components";
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

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
        return match
            ? <SyntaxHighlighterContainer>
                <LanguageLabel>{match[1]}</LanguageLabel>
                <SyntaxHighlighter
                    style={{
                        ...dracula,
                        'pre[class*="language-"]': {
                            ...dracula['pre[class*="language-"]'],
                            margin: '0',
                        },
                    }}
                    language={match[1] || ''}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')} {...props}
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

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5% 5% 5% 5%;
    //background-color: rgb(200, 200, 200);
    background-color: rgba(250, 250, 250, 0.6);
    font-size: 15px;
    color: #212529;
    word-break: break-word;
    vertical-align: baseline;
    line-height: 2;
    flex-wrap: wrap;
    width: 100%;
    overflow: auto;

    h2 {
        padding-bottom: 3px;
        font-weight: bold;
    }

    h3 {
        font-weight: bold;
        font-size: 20px;
    }

    @media (max-width: 768px) {
        padding-top: 5%;
        flex-wrap: wrap;
        word-wrap: break-word;
        font-size: 9px;

        h2 {
            padding-bottom: 3px;
            font-weight: bold;
            font-size: 15px;
        }

        h3 {
            padding-bottom: 5px;
            font-weight: bold;
            font-size: 12px;
        }
    }
`;

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
