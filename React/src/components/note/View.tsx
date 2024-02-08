import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import {useParams} from "react-router-dom";
import {ViewContainer} from "../../styles/container/ViewContainer.ts";
import MarkdownComponent from './MarkdownComponent.tsx'

const View: React.FC = () => {
    const {id} = useParams();

    if (id === undefined) {
        console.error("ID is undefined");
        return null;
    }

    const note = JSON.parse(localStorage.getItem(id) || '{}');

    return (
        <div style={{all: 'initial'}}>
            <ViewContainer>
                <div style={{padding: "30px"}}>
                    <ReactMarkdown
                        components={MarkdownComponent}
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
