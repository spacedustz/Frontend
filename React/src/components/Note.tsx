// import React from "react";
// import styled from "styled-components";
// import {MemoContainer} from "../styles/container/MemoContainer.ts";
// import {BaseLink} from "../styles/base/BaseLink.ts";
//
// export const TitleDiv = styled.div`
//     text-align: center;
//     font-size: 1.5em;
//     margin-bottom: 20px;
//     font-family: spotify-circular, Helvetica, Arial, sans-serif;
//     text-decoration: none;
// `;
//
// export const SubDiv = styled.div`
//     background-color: rgba(143, 188, 143, 0.5);
//     padding: 15px;
//     margin-bottom: 20px;
//     border-radius: 5px;
// `;
//
// export const AssignmentTitle = styled.h2`
//     margin: 0 0 10px 0;
//     font-size: 15px;
// `;
//
// export const PFont = styled.p`
//     font-size: 15px;
// `;
//
// const MemoRootContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     flex-wrap: wrap;
// `;
//
// const Note: React.FC = () => {
//     return (
//         <MemoRootContainer>
//             <MemoContainer>
//                 <TitleDiv>
//                     <h4><strong>HTML & CSS</strong></h4>
//                 </TitleDiv>
//
//                 <SubDiv>
//                     <AssignmentTitle><BaseLink
//                         href="https://github.com/spacedustz/JavaScript/blob/main/Description/HTML-CSS/1.md"
//                         target="_blank">📄 1. HTML & CSS 기초</BaseLink></AssignmentTitle>
//                 </SubDiv>
//
//                 <SubDiv>
//                     <AssignmentTitle><BaseLink
//                         href="https://github.com/spacedustz/JavaScript/blob/main/Description/HTML-CSS/2.md"
//                         target="_blank">📄 2. Wire Frame 구조 잡기</BaseLink></AssignmentTitle>
//                 </SubDiv>
//
//                 <SubDiv>
//                     <AssignmentTitle><BaseLink
//                         href="https://github.com/spacedustz/JavaScript/blob/main/Description/HTML-CSS/3.md"
//                         target="_blank">📄 3. Flex Box란?</BaseLink></AssignmentTitle>
//                 </SubDiv>
//
//                 <SubDiv>
//                     <AssignmentTitle><BaseLink
//                         href="https://github.com/spacedustz/JavaScript/blob/main/Description/HTML-CSS/4.md"
//                         target="_blank">📄 4. Flex Box & 단위 & 다양한 팁</BaseLink></AssignmentTitle>
//                 </SubDiv>
//
//                 <SubDiv>
//                     <AssignmentTitle><BaseLink
//                         href="https://github.com/spacedustz/JavaScript/blob/main/Description/HTML-CSS/5.md"
//                         target="_blank">📄 5. ARGB란? </BaseLink></AssignmentTitle>
//                 </SubDiv>
//
//                 <SubDiv>
//                     <AssignmentTitle><BaseLink
//                         href="https://github.com/spacedustz/JavaScript/blob/main/Description/HTML-CSS/6.md"
//                         target="_blank">📄 6. BootStrap 사용법 </BaseLink></AssignmentTitle>
//                 </SubDiv>
//             </MemoContainer>
//
//             <MemoContainer>
//                 <TitleDiv>
//                     <h4><strong>JavaScript 기초 문법</strong></h4>
//                 </TitleDiv>
//
//                 <SubDiv>
//                     <AssignmentTitle><BaseLink
//                         href="https://github.com/spacedustz/JavaScript/blob/main/Description/JavaScript/1-Variable.md"
//                         target="_blank">📄 1. 변수 </BaseLink></AssignmentTitle>
//                 </SubDiv>
//             </MemoContainer>
//         </MemoRootContainer>
//     );
// };
//
// export default Note;