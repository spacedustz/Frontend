import React from 'react';
import ReactMarkdown, {Components} from 'react-markdown';
import gfm from 'remark-gfm';
import {useParams} from "react-router-dom";
import {Prism as SyntaxHighlighter, SyntaxHighlighterProps} from 'react-syntax-highlighter';
import {solarizedlight} from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import styled from "styled-components";

const SyntaxHighlighterContainer = styled.div`
    //width: 90%;
    //margin: 20px auto;
    border-radius: 10px;
    overflow: auto;
    background-color: #f7f7f7;
`;

const components: Components = {
    code({className, children, ...props}) {
        const match = className ? /language-(\w+)/.exec(className) : null;
        return match
            ? <SyntaxHighlighterContainer>
                <SyntaxHighlighter style={solarizedlight as SyntaxHighlighterProps['style']}
                                   language={match[1] || ''}
                                   PreTag="div"
                                   children={String(children).replace(/\n$/, '')} {...props} />
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
}

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
        padding-bottom: 5px;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        padding-top: 5%;
    }
`;

const Navigation = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;

    h2 {
        color: rgba(66, 126, 214, 0.7);
        padding-left: 3px;
        font-weight: bold;
    }
`;

const View: React.FC = () => {
    const {id} = useParams();
    const note = JSON.parse(localStorage.getItem(id) || '{}');

    return (
        <div style={{all: 'initial'}}> {/* 이 부분을 추가합니다 */}
            {/*<div>*/}
            <ViewContainer>
                <Navigation>
                    <Title>
                        <h2>{note.title}</h2>
                    </Title>
                </Navigation>

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
