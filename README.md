## 📚 Learn JavaScript 📚

React & TypeScript / Kotlin 사용해 자바스크립트 학습 페이지 만들기

- Server : AWS EC2 (Ubuntu 22.04 LTS)
- EC2 Elastic IP 설정

---

## 📘 Frontend

- React (nodejs: 20.11.0 / yarn: 1.22.21 / vite )
- TypeScript
- Libraries : react-router-dom, styled-components, react-bootstrap, axios, WebKit, @stomp/stompjs

---

## 📘 Backend

- Spring Boot 3.2.1 (JDK 17)
- Kotlin
- Spring Data JPA
- Spring Webflux
- Spring Security (6.x.x)
- JWT
- WebSocket
- MariaDB
- Lombok

---

## 📘 서버 세팅 스크립트

- Docker
- OpenJDK 17
- Mariadb (Container)
- NodeJS

```bash
#!/bin/bash

# APT Update & Upgrade
apt -y update & apt -y upgrade

# NodeJS LTS Source
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# NodeJS & OpenJDK 17 설치
apt -y install nodejs openjdk-17-jdk

# Docker 설치
apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt -y update
apt-get -y install docker-ce docker-ce-cli containerd.io
systemctl start docker && sudo systemctl enable docker

# MariaDB Container 실행
docker run -d --privileged --name skw -e MARIADB_ROOT_PASSWORD=1234 -p 5000:3306 mariadb

# 기타 패키지 & 방화벽 설정
apt -y install wget curl firewalld git
npm install -g yarn vite typescript
yarn global add react-bootstrap react-router-dom styled-components axios @types/react-bootstrap @types/react-router-dom

ufw disable
systemctl enable firewalld
firewall-cmd --permanent --add-port=3000/tcp
firewall-cmd --permanent --add-port=5000/tcp
firewall-cmd --permanent --add-service=mysql
firewall-cmd --reload

setenforce 0
```

<br>

> 🚩 **DB & DB User 생성 - DB 컨테이너 내부에서 진행**

```sql
create database skw character set utf8mb4 collate utf8mb4_general_ci;
create user 'skw'@'%' identified by '1234';
grant all privileges on skw.* to 'skw'@'%';
flush privileges;
```