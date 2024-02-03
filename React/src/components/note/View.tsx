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
    width: 90%;
    margin: 20px auto;
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
            style={{color: 'gray', borderLeft: '3px solid blue', paddingLeft: '10px'}}>{children}</blockquote>;
    }
}

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5% 10% 10% 10%;
    //background-color: rgb(200, 200, 200);
    background-color: whitesmoke;
    font-size: 15px;
    color: #212529;
    word-break: break-word;
    vertical-align: baseline;
    line-height: 2;
    
    h2 {
        padding-bottom: 3px;
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
`;

const View: React.FC = () => {
    const {title} = useParams<{ title: string }>();
    const content = localStorage.getItem(title) || '';

    return (
        <div style={{all: 'initial'}}> {/* 이 부분을 추가합니다 */}
            {/*<div>*/}
            <ViewContainer>
                <Navigation>
                    <Title>
                        <h2>{title}</h2>
                    </Title>
                </Navigation>

                <div style={{padding: "30px"}}>
                    <ReactMarkdown
                        components={components}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        remarkPlugins={[gfm]}
                        children={content}
                    >
                    </ReactMarkdown>
                </div>
            </ViewContainer>
        </div>
    );
};

export default View;
