export const NumberGameNote = {
    content: '## 🕹️ 숫자 맞추기 게임 🕹️\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '### 요구사항\n' +
        '\n' +
        '- 랜덤번호를 내부적으로 지정 (1~100 사이)\n' +
        '- 유저가 번호 입력 후 Go 버튼 누름 (총 기회 5번)\n' +
        '- 유저가 번호를 맟추면 "맟췄습니다!"\n' +
        '- 유저가 제출한 숫자가 정답보다 낮으면 "Down", 높으면 "Up"\n' +
        '- Reset 버튼을 누르면 Game Reset\n' +
        '- 5번의 기회를 다쓰면 게임 종료 (Go 버튼 Disable)\n' +
        '- 1 ~ 100 범위 밖에 숫자를 입력하면 alert으로 "범위 밖입니다." 출력. 기회 깎지않음.\n' +
        '- 이미 입력한 숫자도 alert으로 "이미 입력한 숫자입니다." 라고만 출력 하고 기회를 깎지 않음.\n' +
        '\n' +
        '---\n' +
        '\n' +
        '### HTML Tag를 JavaScript Dom으로 변환하는 방식\n' +
        '\n' +
        '- `getElementById()`의 파라미터로 HTML 태그의 식별자 중 id를 넣어줘서 해당 태그를 객체화 합니다. getElementByClassName(), querySelector() 등등\n' +
        '- Dom 객체에 `addEventListener(이벤트명, 콜백함수)`로 첫번쨰 파라미터에 해당하는 이벤트 클릭 시 호출할 콜백 함수를 추가할 수 있습니다.\n' +
        '\n' +
        '```js\n' +
        '/* HTML 버튼 태그의 붙은 ID가 submit(button tag), input(input tag) 이라고 가정 */\n' +
        'let playButton = document.getElementById("submit");\n' +
        'let input = document.getElementById("input")\n' +
        '\n' +
        '/* 버튼을 클릭했을때 실행할 코드(함수) 작성 */\n' +
        'function handleSubmit() {\n' +
        '    console.log(input.value);\n' +
        '    // ... 로직 작성\n' +
        '}\n' +
        '\n' +
        '/* Click 이벤트 발생 시 handleSubmet 함수 호출 */\n' +
        'playButton.addEventListener("click", handleSubmit);\n' +
        '```\n' +
        '\n' +
        '위와 같은 방식으로 HTML의 Element를 가져와서 이벤트 발생 시 호춣할 함수만 지정해주면 됩니다.\n' +
        '\n' +
        '---\n' +
        '\n' +
        '### React & TypeScript Component\n' +
        '\n' +
        '- React & TypeScript 컴포넌트로 프로그램 작성\n' +
        '\n' +
        '<details>\n' +
        '<summary>펼치기</summary>\n' +
        '\n' +
        '```tsx\n' +
        'import React, {useEffect, useState} from "react";\n' +
        'import {ViewContainer} from "../../styles/container/ViewContainer.ts";\n' +
        'import ReactMarkdown from "react-markdown";\n' +
        'import MarkdownComponent from "../note/MarkdownComponent.tsx";\n' +
        'import rehypeRaw from "rehype-raw";\n' +
        'import rehypeSanitize from "rehype-sanitize";\n' +
        'import gfm from "remark-gfm";\n' +
        'import styled from "styled-components";\n' +
        'import ConfettiExplosion from "react-confetti-explosion";\n' +
        '\n' +
        'const GameContainer = styled.div`\n' +
        '    display: flex;\n' +
        '    flex-direction: column;\n' +
        '    align-items: center;\n' +
        '    justify-content: center;\n' +
        '    margin-top: 30px;\n' +
        '`;\n' +
        '\n' +
        'const StyledInput = styled.input`\n' +
        '    margin: 10px;\n' +
        '    padding: 5px;\n' +
        '    font-size: 16px;\n' +
        '\n' +
        '    &:focus {\n' +
        '        outline: none;\n' +
        '        border: 1px solid orange;\n' +
        '        box-shadow: 0 0 5px orange;\n' +
        '    }\n' +
        '\n' +
        '    &::placeholder {\n' +
        '        color: rgba(30, 30, 30, 0.7);\n' +
        '        font-weight: 300;\n' +
        '        font-size: 15px;\n' +
        '        padding-left: 10px;\n' +
        '    }\n' +
        '`;\n' +
        '\n' +
        'const StyledButton = styled.button`\n' +
        '    padding: 5px 10px;\n' +
        '    font-size: 16px;\n' +
        '    background-color: #4CAF50; /* Green */\n' +
        '    border: none;\n' +
        '    color: white;\n' +
        '    text-align: center;\n' +
        '    text-decoration: none;\n' +
        '    display: inline-block;\n' +
        '    margin: 4px 2px;\n' +
        '    transition-duration: 0.4s;\n' +
        '    cursor: pointer;\n' +
        '\n' +
        '    &:disabled {\n' +
        '        background-color: #cccccc;\n' +
        '        cursor: not-allowed;\n' +
        '    }\n' +
        '`;\n' +
        '\n' +
        '/**\n' +
        ' * TODO\n' +
        ' * 랜덤번호를 내부적으로 지정 (1~100 사이)\n' +
        ' * 유저가 번호 입력 후 Go 버튼 누름 (총 기회 5번)\n' +
        ' * 유저가 번호를 맟추면 "맟췄습니다!"\n' +
        ' * 유저가 제출한 숫자가 정답보다 낮으면 "Down", 높으면 "Up"\n' +
        ' * Reset 버튼을 누르면 Game Reset\n' +
        ' * 5번의 기회를 다쓰면 게임 종료 (Go 버튼 Disable)\n' +
        ' * 1 ~ 100 범위 밖에 숫자를 입력하면 alert으로 "범위 밖입니다." 출력. 기회 깎지않음.\n' +
        ' * 이미 입력한 숫자도 alert으로 "이미 입력한 숫자입니다." 라고만 출력 하고 기회를 깎지 않음.\n' +
        ' *\n' +
        ' * -----------------\n' +
        ' *\n' +
        ' * @userGuess : 사용자가 입력한 추측값 저장\n' +
        ' * @gameMessage : 게임의 현재 상태를 사용자에게 알려주는 메시지 저장\n' +
        ' * @remainingAttempts : 사용자의 게임에서 남은 횟수 저장, 0이 되면 게임 종료\n' +
        ' * @randomNumber : 1 ~ 100 사이 임의의 난수를 생성해 상태로 관리\n' +
        ' * @priviousGuesses : 사용자가 이전에 입력한 추측값을 저장하는 배열\n' +
        ' * @restartCountdown : 사용자의 기회가 전부 소진되거나, 정답을 맟췄을때 자동으로 게임 재시작을 하기 위한 Countdown Interval 표시\n' +
        ' * @isExploding : 정답을 맟출 시 폭죽 효과 애니메이션 추가\n' +
        ' */\n' +
        'const NumberGuess: React.FC = () => {\n' +
        '    const [userGuess, setUserGuess] = useState<string>(\'\');\n' +
        '    const [gameMessage, setGameMessage] = useState<string>(\'\');\n' +
        '    const [remainingAttempts, setRemainingAttempts] = useState<number>(5);\n' +
        '    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);\n' +
        '    const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);\n' +
        '    const [restartCountdown, setRestartCountdown] = useState<number | null>(null);\n' +
        '    const [isExploding, setIsExploding] = useState(false);\n' +
        '\n' +
        '    useEffect(() => {\n' +
        '        console.log(randomNumber)\n' +
        '    }, [randomNumber]);\n' +
        '\n' +
        '    useEffect(() => {\n' +
        '        let countdownInterval: number | null = null;\n' +
        '\n' +
        '        if (restartCountdown !== null) {\n' +
        '            countdownInterval = window.setInterval(() => {\n' +
        '                setRestartCountdown(prev => {\n' +
        '                    if (prev !== null && prev > 1) {\n' +
        '                        return prev - 1;\n' +
        '                    } else {\n' +
        '                        window.clearInterval(countdownInterval!);\n' +
        '                        resetGame();\n' +
        '                        return null;\n' +
        '                    }\n' +
        '                });\n' +
        '            }, 1000);\n' +
        '        }\n' +
        '\n' +
        '        return () => {\n' +
        '            if (countdownInterval) {\n' +
        '                window.clearInterval(countdownInterval);\n' +
        '            }\n' +
        '        };\n' +
        '    }, [restartCountdown]);\n' +
        '\n' +
        '    useEffect(() => {\n' +
        '        if (isExploding) {\n' +
        '            const timeout = setTimeout(() => {\n' +
        '                setIsExploding(false);\n' +
        '            }, 500);\n' +
        '\n' +
        '            return () => clearTimeout(timeout);\n' +
        '        }\n' +
        '    }, [isExploding]);\n' +
        '\n' +
        '    const verifyUserGuess = () => {\n' +
        '        const parsedUserGuess = parseInt(userGuess);\n' +
        '\n' +
        '        if (!isNaN(parsedUserGuess)) {\n' +
        '            if (parsedUserGuess < 1 || parsedUserGuess > 100) {\n' +
        '                alert("범위 밖입니다.");\n' +
        '                setUserGuess(\'\');\n' +
        '                return;\n' +
        '            }\n' +
        '\n' +
        '            if (previousGuesses.includes(userGuess)) {\n' +
        '                alert("이미 입력한 숫자입니다.");\n' +
        '                setUserGuess(\'\');\n' +
        '                return;\n' +
        '            }\n' +
        '\n' +
        '            if (parsedUserGuess === randomNumber) {\n' +
        '                setGameMessage("맞췄습니다!");\n' +
        '                setRemainingAttempts(0);\n' +
        '                setIsExploding(true);\n' +
        '            } else if (parsedUserGuess > randomNumber) {\n' +
        '                setGameMessage("Down");\n' +
        '                setRemainingAttempts(prev => prev - 1);\n' +
        '            } else {\n' +
        '                setGameMessage("Up");\n' +
        '                setRemainingAttempts(prev => prev - 1);\n' +
        '            }\n' +
        '\n' +
        '            setPreviousGuesses(prev => [...prev, userGuess]);\n' +
        '            setUserGuess(\'\');\n' +
        '        } else {\n' +
        '            alert("숫자만 입력 가능합니다.");\n' +
        '        }\n' +
        '\n' +
        '        if (parsedUserGuess === randomNumber || remainingAttempts === 1) {\n' +
        '            setGameMessage(parsedUserGuess === randomNumber ? "맞췄습니다!" : "기회를 모두 소진 하였습니다.");\n' +
        '            setRemainingAttempts(0);\n' +
        '            setRestartCountdown(5);\n' +
        '        }\n' +
        '    };\n' +
        '\n' +
        '    const resetGame = () => {\n' +
        '        setUserGuess(\'\');\n' +
        '        setGameMessage(\'\');\n' +
        '        setRemainingAttempts(5);\n' +
        '        setRandomNumber(Math.floor(Math.random() * 100) + 1);\n' +
        '        setPreviousGuesses([]);\n' +
        '    };\n' +
        '\n' +
        '\n' +
        '    const note = {\n' +
        '        content: \'\'\n' +
        '    };\n' +
        '\n' +
        '    return (\n' +
        '        <div>\n' +
        '            <div style={{position: \'fixed\', top: \'50%\', left: \'50%\', transform: \'translate(-50%, -50%)\'}}>\n' +
        '                {isExploding && <ConfettiExplosion/>}\n' +
        '            </div>\n' +
        '\n' +
        '            <GameContainer>\n' +
        '                <div>\n' +
        '                    <h4 style={{marginTop: "30px"}}>🕹️ 숫자 맞추기 게임 🕹️</h4>\n' +
        '                    <p>1 ~ 100 범위의 랜덤 숫자 맟추기</p>\n' +
        '                    <StyledInput\n' +
        '                        type="text"\n' +
        '                        value={userGuess}\n' +
        '                        onChange={(e) => setUserGuess(e.target.value)}\n' +
        '                        placeholder="숫자를 입력해주세요."\n' +
        '                    />\n' +
        '                    <StyledButton onClick={verifyUserGuess} disabled={remainingAttempts === 0}>Go</StyledButton>\n' +
        '                    <StyledButton onClick={resetGame}>Reset</StyledButton>\n' +
        '                    <p>{gameMessage}</p>\n' +
        '                    <p>남은 기회: {remainingAttempts}</p>\n' +
        '                    {restartCountdown !== null && (\n' +
        '                        <p>{restartCountdown}초 후 게임이 재시작 됩니다...</p>\n' +
        '                    )}\n' +
        '                    <p>이미 입력한 숫자들 : {previousGuesses.join(\', \')}</p>\n' +
        '                </div>\n' +
        '            </GameContainer>\n' +
        '\n' +
        '            <div style={{all: \'initial\'}}>\n' +
        '                <ViewContainer>\n' +
        '                    <div style={{padding: "30px"}}>\n' +
        '                        <ReactMarkdown\n' +
        '                            components={MarkdownComponent}\n' +
        '                            rehypePlugins={[rehypeRaw, rehypeSanitize]}\n' +
        '                            remarkPlugins={[gfm]}\n' +
        '                            children={note.content}\n' +
        '                        >\n' +
        '                        </ReactMarkdown>\n' +
        '                    </div>\n' +
        '                </ViewContainer>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    );\n' +
        '};\n' +
        '\n' +
        'export default NumberGuess;\n' +
        '```\n' +
        '\n' +
        '</details>'
}

export const TodoAppNote = {
    content: '## 🕹️ 할일 앱 만들기 🕹️️\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '### 📘 요구사항\n' +
        '\n' +
        '- `완료` Item 추가, 수정, 삭제\n' +
        '- `완료` 리스트 (전체 목록, 완료 내역, 미완료 내역)\n' +
        '- `완료` 할일이 끝나면 완료 체크 -> Task에 취소선 긋기 후 완료 취소 버튼 렌더링\n' +
        '- `완료` 각 Tab 클릭 시 상태별로 필터링된 새로운 리스트 렌더링\n' +
        '- `완료` Enter 눌러서 Task 추가하기\n' +
        '- `완료` **전체**가 아닌 다른 탭에서 Task를 삭제 했을떄 UI에 실시간 반영\n' +
        '- `완료` Underline Animation 적용\n' +
        '\n' +
        '---\n' +
        '\n' +
        '### 📘 innerHTML & innerText & textContent의 차이점\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '> **innerHTML**\n' +
        '\n' +
        '- 해당 Element의 HTML, XML을 읽어오거나 설정을 할 수 있습니다.\n' +
        '- HTML 코드와 같이 작성 가능\n' +
        '\n' +
        '```js\n' +
        'let arr = ["A", "B", \'C\']\n' +
        '\n' +
        'function render() {\n' +
        '    let resultHTML = \'\';\n' +
        '    \n' +
        '    for (let i=0; i<arr.length; i++) {\n' +
        '        resultHTML += `\n' +
        '            <h2>{arr[i]}</h2>\n' +
        '            <div> ... </div> // 등등 HTML\n' +
        '        `;\n' +
        '    }\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '> **innerText**\n' +
        '\n' +
        '- Element의 속성으로, 해당 Element 내에서 사용자에게 **보여지는** Text 값 (렌더링된 Text Content)을 읽어옵니다.\n' +
        '- HTML 코드 작성 불가능\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '> **textContent**\n' +
        '\n' +
        '- innerText와 달리 `<script>`나 `<style>` 태그와 상관없이 해당 노드가 가지고 있는 Text 값을 그대로 읽어옵니다.\n' +
        '\n' +
        '---\n' +
        '\n' +
        '### 📘 여러 Dom 같이 선택하기 - querySelectorAll()\n' +
        '\n' +
        '- `.tabs`에 묶인 4개의 div중 첫번쨰 div를 제외한 3개의 div의 Event Listener에 콜백 함수 호출 \n' +
        '\n' +
        '```js\n' +
        'let tabs = document.querySelectorAll(".tabs div");\n' +
        '\n' +
        'for (let i=1; i<tabs.length; i++) {\n' +
        '    tabs[i].addEventListener("click", function (event) {\n' +
        '        fitler(event);\n' +
        '    });\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '### 📘 Underline CSS Animation 추가\n' +
        '\n' +
        '- Styled Component\n' +
        '- JSX에서 Tab Props UnderLine에 넘겨주어 Tab의 문자열마다 left의 픽셀 수치 조정\n' +
        '- transition 속성을 이용한 애니메이션 효과 추가\n' +
        '\n' +
        '```ts\n' +
        'export const UnderLine = styled.div<{tab: string}>`\n' +
        '    width: 64px;\n' +
        '    height: 3px;\n' +
        '    background-color: lightseagreen;\n' +
        '    position: absolute;\n' +
        '    left: ${props => props.tab === \'전체\' ? \'0px\' : props.tab === \'진행중\' ? \'75px\' : \'143px\'};\n' +
        '    top: 50px;\n' +
        '    padding: 0;\n' +
        '    transition: left 0.5s ease-in-out;\n' +
        '`;\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '### 📘 React & TypeScript Component 전체 코드\n' +
        '\n' +
        '<details>\n' +
        '<summary>펼치기</summary>\n' +
        '\n' +
        '```tsx\n' +
        'import React, {useState} from "react";\n' +
        'import {ViewContainer} from "../../styles/container/ViewContainer.ts";\n' +
        'import ReactMarkdown from "react-markdown";\n' +
        'import MarkdownComponent from "../note/MarkdownComponent.tsx";\n' +
        'import rehypeRaw from "rehype-raw";\n' +
        'import rehypeSanitize from "rehype-sanitize";\n' +
        'import gfm from "remark-gfm";\n' +
        'import {\n' +
        '    TodoContainer,\n' +
        '    StyledInput,\n' +
        '    StyledButton,\n' +
        '    HeaderSection,\n' +
        '    HeaderTab,\n' +
        '    Tab,\n' +
        '    Tasks,\n' +
        '    UnderLine, DoneTasks, StyledImage, DoneTitle, DoneContent\n' +
        '} from "../../styles/assignment/TodoApp.ts";\n' +
        '\n' +
        'interface Task {\n' +
        '    id: string\n' +
        '    content: string\n' +
        '    isDone: boolean\n' +
        '}\n' +
        '\n' +
        'const TodoApp: React.FC = () => {\n' +
        '    const [input, setInput] = useState<string>(\'\');\n' +
        '    const [taskList, setTaskList] = useState<Task[]>([]);\n' +
        '    const [filteredTaskList, setFilteredTaskList] = useState<Task[]>([]);\n' +
        '    const [activeTab, setActiveTab] = useState(\'전체\');\n' +
        '\n' +
        '    const generateRandomId = () => {\n' +
        '        return \'_\' + Math.random().toString(36).substring(2, 9);\n' +
        '    }\n' +
        '\n' +
        '    const addTask = () => {\n' +
        '        const task = {\n' +
        '            id: generateRandomId(),\n' +
        '            content: input,\n' +
        '            isDone: false\n' +
        '        }\n' +
        '\n' +
        '        const newTaskList = [...taskList, task];\n' +
        '        setTaskList([...taskList, task]);\n' +
        '        setFilteredTaskList(newTaskList);\n' +
        '        setInput(\'\');\n' +
        '    }\n' +
        '\n' +
        '    const toggleDone = (id: string) => {\n' +
        '        const newTaskList = taskList.map(task =>\n' +
        '            task.id === id ? {...task, isDone: !task.isDone} : task\n' +
        '        )\n' +
        '        setTaskList(newTaskList);\n' +
        '        setFilteredTaskList(newTaskList);\n' +
        '    }\n' +
        '\n' +
        '    const deleteTask = (id: string) => {\n' +
        '        const newTaskList = taskList.filter(task => task.id !== id);\n' +
        '        setTaskList(newTaskList);\n' +
        '        setFilteredTaskList(newTaskList);\n' +
        '    }\n' +
        '\n' +
        '    const filterTabs = (tab: string) => {\n' +
        '        if (tab !== null && tab !== undefined && tab !== "") {\n' +
        '            switch (tab) {\n' +
        '                case \'전체\':\n' +
        '                    setFilteredTaskList(taskList);\n' +
        '                    setActiveTab(\'전체\');\n' +
        '                    break;\n' +
        '                case \'진행중\':\n' +
        '                    setFilteredTaskList(taskList.filter(task => !task.isDone));\n' +
        '                    setActiveTab(\'진행중\');\n' +
        '                    break;\n' +
        '                case \'완료\':\n' +
        '                    setFilteredTaskList(taskList.filter(task => task.isDone));\n' +
        '                    setActiveTab(\'완료\');\n' +
        '                    break;\n' +
        '                default:\n' +
        '                    console.log(\'Tab 선택 에러 발생\');\n' +
        '            }\n' +
        '        } else {\n' +
        '            console.log(\'Tab 선택 에러 발생\')\n' +
        '        }\n' +
        '    }\n' +
        '\n' +
        '    return (\n' +
        '        <div style={{all: "initial"}}>\n' +
        '            <TodoContainer>\n' +
        '                <h4 style={{marginTop: "30px"}}>Todo List</h4>\n' +
        '\n' +
        '                <section>\n' +
        '                    <StyledInput\n' +
        '                        type="text"\n' +
        '                        value={input}\n' +
        '                        onChange={(e) => setInput(e.target.value)}\n' +
        '                        onKeyDown={(e) => {\n' +
        '                            if (e.key === \'Enter\') {\n' +
        '                                addTask();\n' +
        '                            }\n' +
        '                        }}\n' +
        '                        placeholder="할일을 입력 해주세요."\n' +
        '                    />\n' +
        '                    <StyledButton onClick={addTask}>+</StyledButton>\n' +
        '                </section>\n' +
        '\n' +
        '                <HeaderSection>\n' +
        '                    <HeaderTab>\n' +
        '                        <UnderLine tab={activeTab}/>\n' +
        '                        <Tab onClick={() => filterTabs(\'전체\')}>전체</Tab>\n' +
        '                        <Tab onClick={() => filterTabs(\'진행중\')}>진행중</Tab>\n' +
        '                        <Tab onClick={() => filterTabs(\'완료\')}>완료</Tab>\n' +
        '                    </HeaderTab>\n' +
        '\n' +
        '                    <div>\n' +
        '                        {filteredTaskList.map((task) => (\n' +
        '                            <div key={task.id}>\n' +
        '                                {task.isDone ? (\n' +
        '                                    <DoneTasks>\n' +
        '                                        <DoneContent>\n' +
        '                                            <DoneTitle>{task.content}</DoneTitle>\n' +
        '                                        </DoneContent>\n' +
        '\n' +
        '                                        <div>\n' +
        '                                            <StyledButton onClick={() => toggleDone(task.id)}>\n' +
        '                                                <StyledImage src="../../../public/assets/todo/return.svg" alt="return"/>\n' +
        '                                            </StyledButton>\n' +
        '\n' +
        '                                            <StyledButton onClick={() => deleteTask(task.id)}>\n' +
        '                                                <StyledImage src="../../../public/assets/todo/trash.svg" alt="trash"/>\n' +
        '                                            </StyledButton>\n' +
        '                                        </div>\n' +
        '                                    </DoneTasks>\n' +
        '                                ) : (\n' +
        '                                    <Tasks>\n' +
        '                                        <div>{task.content}</div>\n' +
        '\n' +
        '                                        <div>\n' +
        '                                            <StyledButton onClick={() => toggleDone(task.id)}>\n' +
        '                                                <StyledImage src="../../../public/assets/todo/check.svg" alt="check"/>\n' +
        '                                            </StyledButton>\n' +
        '\n' +
        '                                            <StyledButton onClick={() => deleteTask(task.id)}>\n' +
        '                                                <StyledImage src="../../../public/assets/todo/trash.svg" alt="trash"/>\n' +
        '                                            </StyledButton>\n' +
        '                                        </div>\n' +
        '                                    </Tasks>\n' +
        '                                )}\n' +
        '                            </div>\n' +
        '                        ))}\n' +
        '\n' +
        '                    </div>\n' +
        '                </HeaderSection>\n' +
        '            </TodoContainer>\n' +
        '\n' +
        '            <div style={{all: \'initial\'}}>\n' +
        '                <ViewContainer>\n' +
        '                    <div style={{padding: "30px"}}>\n' +
        '                        <ReactMarkdown\n' +
        '                            components={MarkdownComponent}\n' +
        '                            rehypePlugins={[rehypeRaw, rehypeSanitize]}\n' +
        '                            remarkPlugins={[gfm]}\n' +
        '                            children={\'ddd\'}\n' +
        '                        >\n' +
        '                        </ReactMarkdown>\n' +
        '                    </div>\n' +
        '                </ViewContainer>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    );\n' +
        '};\n' +
        '\n' +
        'export default TodoApp;\n' +
        '```\n' +
        '</details>'
};