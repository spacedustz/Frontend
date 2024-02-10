import React, {useEffect, useState} from "react";
import {ViewContainer} from "../../styles/container/ViewContainer.ts";
import ReactMarkdown from "react-markdown";
import MarkdownComponent from "../note/MarkdownComponent.tsx";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import gfm from "remark-gfm";
import ConfettiExplosion from "react-confetti-explosion";
import {NumberGameNote} from "../../model/Assignment.ts";
import {GameContainer, StyledButton, StyledInput} from "../../styles/assignment/NumberGuess.ts";

/**
 * TODO
 * 랜덤번호를 내부적으로 지정 (1~100 사이)
 * 유저가 번호 입력 후 Go 버튼 누름 (총 기회 5번)
 * 유저가 번호를 맟추면 "맟췄습니다!"
 * 유저가 제출한 숫자가 정답보다 낮으면 "Down", 높으면 "Up"
 * Reset 버튼을 누르면 Game Reset
 * 5번의 기회를 다쓰면 게임 종료 (Go 버튼 Disable)
 * 1 ~ 100 범위 밖에 숫자를 입력하면 alert으로 "범위 밖입니다." 출력. 기회 깎지않음.
 * 이미 입력한 숫자도 alert으로 "이미 입력한 숫자입니다." 라고만 출력 하고 기회를 깎지 않음.
 *
 * -----------------
 *
 * @userGuess : 사용자가 입력한 추측값 저장
 * @gameMessage : 게임의 현재 상태를 사용자에게 알려주는 메시지 저장
 * @remainingAttempts : 사용자의 게임에서 남은 횟수 저장, 0이 되면 게임 종료
 * @randomNumber : 1 ~ 100 사이 임의의 난수를 생성해 상태로 관리
 * @priviousGuesses : 사용자가 이전에 입력한 추측값을 저장하는 배열
 * @restartCountdown : 사용자의 기회가 전부 소진되거나, 정답을 맟췄을때 자동으로 게임 재시작을 하기 위한 Countdown Interval 표시
 * @isExploding : 정답을 맟출 시 폭죽 효과 애니메이션 추가
 */
const NumberGuess: React.FC = () => {
    const [userGuess, setUserGuess] = useState<string>('');
    const [gameMessage, setGameMessage] = useState<string>('');
    const [remainingAttempts, setRemainingAttempts] = useState<number>(5);
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
    const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
    const [restartCountdown, setRestartCountdown] = useState<number | null>(null);
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        console.log(randomNumber)
    }, [randomNumber]);

    useEffect(() => {
        let countdownInterval: number | null = null;

        if (restartCountdown !== null) {
            countdownInterval = window.setInterval(() => {
                setRestartCountdown(prev => {
                    if (prev !== null && prev > 1) {
                        return prev - 1;
                    } else {
                        window.clearInterval(countdownInterval!);
                        resetGame();
                        return null;
                    }
                });
            }, 1000);
        }

        return () => {
            if (countdownInterval) {
                window.clearInterval(countdownInterval);
            }
        };
    }, [restartCountdown]);

    useEffect(() => {
        if (isExploding) {
            const timeout = setTimeout(() => {
                setIsExploding(false);
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [isExploding]);

    const verifyUserGuess = () => {
        const parsedUserGuess = parseInt(userGuess);

        if (!isNaN(parsedUserGuess)) {
            if (parsedUserGuess < 1 || parsedUserGuess > 100) {
                alert("범위 밖입니다.");
                setUserGuess('');
                return;
            }

            if (previousGuesses.includes(userGuess)) {
                alert("이미 입력한 숫자입니다.");
                setUserGuess('');
                return;
            }

            if (parsedUserGuess === randomNumber) {
                setGameMessage("맞췄습니다!");
                setRemainingAttempts(0);
                setIsExploding(true);
            } else if (parsedUserGuess > randomNumber) {
                setGameMessage("Down");
                setRemainingAttempts(prev => prev - 1);
            } else {
                setGameMessage("Up");
                setRemainingAttempts(prev => prev - 1);
            }

            setPreviousGuesses(prev => [...prev, userGuess]);
            setUserGuess('');
        } else {
            alert("숫자만 입력 가능합니다.");
        }

        if (parsedUserGuess === randomNumber || remainingAttempts === 1) {
            setGameMessage(parsedUserGuess === randomNumber ? "맞췄습니다!" : "기회를 모두 소진 하였습니다.");
            setRemainingAttempts(0);
            setRestartCountdown(5);
        }
    };

    const resetGame = () => {
        setUserGuess('');
        setGameMessage('');
        setRemainingAttempts(5);
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setPreviousGuesses([]);
    };

    return (
        <div>
            <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                {isExploding && <ConfettiExplosion/>}
            </div>

            <GameContainer>
                <div>
                    <h4 style={{marginTop: "30px"}}>🕹️ 숫자 맞추기 게임 🕹️</h4>
                    <p>1 ~ 100 범위의 랜덤 숫자 맟추기</p>
                    <StyledInput
                        type="text"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                        placeholder="숫자를 입력해주세요."
                    />
                    <StyledButton onClick={verifyUserGuess} disabled={remainingAttempts === 0}>Go</StyledButton>
                    <StyledButton onClick={resetGame}>Reset</StyledButton>
                    <p>{gameMessage}</p>
                    <p>남은 기회: {remainingAttempts}</p>
                    {restartCountdown !== null && (
                        <p>{restartCountdown}초 후 게임이 재시작 됩니다...</p>
                    )}
                    <p>이미 입력한 숫자들 : {previousGuesses.join(', ')}</p>
                </div>
            </GameContainer>

            <div style={{all: 'initial'}}>
                <ViewContainer>
                    <div style={{padding: "30px"}}>
                        <ReactMarkdown
                            components={MarkdownComponent}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            remarkPlugins={[gfm]}
                            children={NumberGameNote.content}
                        >
                        </ReactMarkdown>
                    </div>
                </ViewContainer>
            </div>
        </div>
    );
};

export default NumberGuess;