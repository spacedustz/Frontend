import React, {useEffect, useState} from "react";

/**
 * TODO
 * 랜덤번호를 내부적으로 지정 (1~100 사이)
 * 유저가 번호 입력 후 Go 버튼 누름 (총 기회 5번)
 * 유저가 번호르 맟추면 "맟췄습니다!"
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
 */
const NumberGuess: React.FC = () => {
    const [userGuess, setUserGuess] = useState<string>('');
    const [gameMessage, setGameMessage] = useState<string>('');
    const [remainingAttempts, setRemainingAttempts] = useState<number>(5);
    const [randomNumber, setRandomNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
    const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);

    useEffect(() => {
        console.log(randomNumber)
    }, [randomNumber]);

    const verifyUserGuess = () => {
        const parsedUserGuess = parseInt(userGuess);

        if (!isNaN(parsedUserGuess)) {
            if (parsedUserGuess < 1 || parsedUserGuess > 100) {
                alert("범위 밖입니다.");
                return;
            }

            if (previousGuesses.includes(userGuess)) {
                alert("이미 입력한 숫자입니다.");
                return;
            }

            if (parsedUserGuess === randomNumber) {
                setGameMessage("맞췄습니다!");
                setRemainingAttempts(0);
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
            <h4 style={{marginTop: "30px"}}>🕹️ 숫자 맞추기 게임 🕹️</h4>
            <input type="text" value={userGuess} onChange={(e) => setUserGuess(e.target.value)} />
            <button onClick={verifyUserGuess} disabled={remainingAttempts === 0}>Go</button>
            <button onClick={resetGame}>Reset</button>
            <p>{gameMessage}</p>
            <p>남은 기회: {remainingAttempts}</p>
            <p>이미 입력한 숫자들 : {previousGuesses.join(', ')}</p>
        </div>
    );
};

export default NumberGuess;