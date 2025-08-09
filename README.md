# Mineping
React와 Spring Boot를 활용한 
직장인들에게 심리기반 맞춤 워케이션 장소를 추천해주는 웹 사이트입니다


## 프로젝트 개요
- 개발 기간: 2025-06-04 ~ 2025-07-18
- 서비스 링크: [https://www.mineping.store](https://www.mineping.store)
- 본 프로젝트의 구조를 더 자세히 알고 싶다면?
    - [백엔드 README](./BackEnd/README.md)
    - [프론트엔드 README](./FrontEnd/README.md)

## 기술 스택
`Design`
<img src="https://img.shields.io/badge/Figma-FF4154?style=flat-square&logo=Figma&logoColor=white"/>

`Front-End`
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/>

[//]: # (<img src="https://img.shields.io/badge/Zustand-000000?style=flat-square&logoColor=white"/> <!-- 로고 없음 -->)


`Back-end`
<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/>
<img src="https://img.shields.io/badge/JAVA-007396?style=flat-square&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white"/>

[//]: # (<img src="https://img.shields.io/badge/Spring%20AI-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>)
[//]: # (<img src="https://img.shields.io/badge/JPA-6DB33F?style=flat-square&logo=Java&logoColor=white"/>)

`IDE`
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/>
<img src="https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=flat-square&logo=intellijidea&logoColor=white"/>
<img src="https://img.shields.io/badge/Cursor-000000?style=flat-square&logo=Cursor&logoColor=white"/>

`Communication`
<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"/>
<img src="https://img.shields.io/badge/Trello-0052CC?style=flat-square&logo=Trello&logoColor=white"/>
<img src="https://img.shields.io/badge/erdCloud-333333?style=flat-square&logo=cloud&logoColor=white"/>
<img src="https://img.shields.io/badge/Mermaid-ff3670?style=flat-square&logo=Mermaid&logoColor=white"/>

## 사용 라이브러리및 API
- 사업자 진위확인 API
- Spring AI
- Zustand
- toast
- sweetalert2

## 설치 및 실행 방법
```bash
git clone https://github.com/MinePing/Final.git
cd Final

# 프론트
cd FrontEnd
npm install
npm run dev

# 백엔드
cd BackEnd
리눅스/맥 : ./gradlew bootRun
윈도우 : gradlew.bat bootRun

## 주요 기능
- 회원가입 및 로그인 (JWT 기반)
    - 워케이션 업체 회원 등록
    - 회사 등록
    - 직원 등록
- 워케이션 등록 및 조회
- 심리테스트 제공
- 하루 식단 추천
- 직원들의 워케이션 예약 관리
    - 회사 직원의 심리 상태 정보를 제공하여 직원 관리에 용이
- 회원 및 직원 맞춤 워케이션 장소 추천

## 부가 기능
- 소셜 로그인 (구글)
- google SMTP와 Redis를 통한 이메일 인증
- Spring Ai를 활용한 추천
- 사업자 등록번호 진위확인 API

## 팀원 소개

| 이름 | 포지션 | Contact |
| 최예찬 | READER & DataBase Manager | qbsb147@naver.com |
| 최성진 | Issue Manager | skskcsj@naver.com |
| 윤택봉 | Configuration Manager | mohae@kakao.com |
| 이상준 | Schedule Manager | steve020205@naver.com |
