## 📚 프론트엔드 학습 기록 사이트 만들기 📚

**📂 React Directory (Front-End)**
- Language : `TypeScript`
- Framework : React (nodejs: 20.11.0 / yarn: 1.22.21 / vite )
- Libraries
  - react-router-dom
  - styled-components
  - react-bootstrap
  - axios
  - webkit
  - @stomp/stompjs
  - react-markdown
  - react-syntax-highlighter
  - rehype-sanitize
  - rehype-raw
  - remark-gfm

<br>

**📂 API-Server Directory (Back-End)**

- Language : `Kotlin`
- Framework : Spring Boot 3.2.1 (JDK 17)
- Spring Boot 3.2.1 (JDK 17)
- Spring Data JPA
- Spring Webflux
- Spring Security (6.x.x)
- JWT
- WebSocket
- MariaDB
- Lombok

<br>

**💻 Server - AWS EC2**

- AWS EC2 : `t2.micro` 메모리 부족 -> `r5a.large` 로 인스턴스 이전 (2 CPU & 16 Mem)
- Docker (MariaDB)
- Open JDK 17
- Mariadb (Container)
- NodeJS (yarn)
- Jenkins Declarative Pipeline 방식 +  Nginx & Docker 를 이용한 트래픽 로드밸런싱 및 Blue & Green 무중단 배포 CI/CD 구축 (예정)

[사이트 방문하기](http://13.124.2.62/)

[서버 세팅 스크립트](./Description/Server-Setting.md)

---

## 📘 **Main Pages**

**과제 탭**

![img](./Description/img/assignment-tab.png)

<br>

**노트 탭**

![img](./Description/img/1.png)

<br>

**방명록 탭**

![img](./Description/img/comment-tab.png)

---

## 📘 기능

### 추가한 목록

- 회원가입 / 로그인 / 로그아웃 (Spring Security + JWT)
- **댓글** 추가 / 수정 / 삭제 (Web Socket)
- **마크다운** 작성 / 마크다운 Viewer 기능 ->
  - **User Type이 관리자가 아니면 글 작성, 수정, 삭제 불가능** (백엔드에서 JWT Authentication Filter 검증 함)
  - Code Highlighter(코드 블럭) 적용
  - `<br>` 태그 줄바꿈으로 치환
  - 마크다운 문법 중 `>` blockquate 적용

<br>

### 회원가입 & 로그인 & 로그아웃 기능

- 회원가입 후 비밀번호는 백엔드에서 Bcrypt로 암호화해서 저장
- JWT Authentication Filter의 검증 예외 URL로 지정

<details>
<summary>펼치기</summary>

> **🚩 회원 가입**

![img](./Description/img/signup-1.png)
![img](./Description/img/signup-2.png)

<br>

> **🚩 로그인**

- 유저가 로그인 시 백엔드에서 받은 JWT Token을 프론트엔드 단에서 LocalStorage에 들고 있음
- JWT Authentication Filter의 검증 예외 URL

![img](./Description/img/login-1.png)
![img](./Description/img/login-2.png)

<br>

> **🚩 로그아웃**

- 유저가 로그아웃 시 LocalStorage의 JWT Token 제거

![img](./Description/img/logout-1.png)
![img](./Description/img/logout-2.png)

</details>

<br>

### 댓글 기능

- Frontend <-> Backend WebSocket Publish & Subscribe
- WebSocket Endpoint URL : ws
- WebSocket Channel Name : '/comment/list'
- 로그인을 안하면 댓글 남기기 불가능 (Session Storage JWT Token 검증)
- 댓글 달린걸 그냥 보는건 모든 유저(anonymous 포함) 허용 (Spring Security 내부 설정)
- Pagination 추가

<details>
<summary>펼치기</summary>

> **🚩 로그인을 안하고 댓긍 등록 시, Session Storage의 JWT 토큰 검증 불가로 인해 댓글 작성 불가**

![img](./Description/img/403.png)

<br>

> **🚩 댓글 추가**

![img](./Description/img/comment-1.png)

<br>

> **🚩 댓글 수정**

![img](./Description/img/update-comment-1.png)

![img](./Description/img/update-comment-2.png)

![img](./Description/img/update-comment-3.png)

![img](./Description/img/update-comment-4.png)

<br>

> **🚩 댓글 삭제**

![img](./Description/img/delete-comment.png)

<br>

> **🚩 Pagination 추가**

![img](./Description/img/page.png)

</details>

<br>

### 마크다운 작성 & 보기 기능

- Code Highlighter(코드 블럭) 적용
- `<br>` 줄바꿈으로 치환
- 마크다운 문법 중 `>` blockquate 적용

<details>
<summary>펼치기</summary>

> **🚩 마크다운 글 작성 & 작성한 마크다운 글 Viewer**

![img](./Description/img/1.png)

![img](./Description/img/md.png)

</details>