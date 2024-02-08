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