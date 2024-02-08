import {Components} from "react-markdown";
import styled from "styled-components";
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

const SyntaxHighlighterContainer = styled.div`
    background-color: #37393b;
    border-radius: 10px;
    font-weight: 550;
`;

const LanguageLabel = styled.div`
    background-color: #37393b;
    padding-left: 10px;
    padding-top: 3px;
    color: #c4c7c5;
`;

const MarkdownComponent: Components = {
    code({className, children, ...props}) {
        const match = className ? /language-(\w+)/.exec(className) : null;

        return match ?
            <SyntaxHighlighterContainer>
                <LanguageLabel>{match ? match[1] : 'text'}</LanguageLabel>
                <SyntaxHighlighter
                    style={{
                        ...dracula,
                        margin: 0,
                    }}
                    language={match[1] || ''}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                />
            </SyntaxHighlighterContainer>
            : <code className={className} style={{ margin: 0 }} {...props}>{children}</code>
    },
    blockquote({children}) {
        return <blockquote
            style={
                {
                    fontSize: '14px',
                    color: 'white',
                    borderLeft: '5px solid lightblue',
                    paddingLeft: '10px',
                    height: '2rem',
                    borderRadius: '3px',
                    background: 'rgba(100, 100, 100, 0.3)',
                }
            }>{children}</blockquote>;
    }
};

export default MarkdownComponent;