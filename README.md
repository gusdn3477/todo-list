# Todo List

## 프로젝트 간단 소개

- 기본적인 기능을 제공하는 Todo List입니다.
- 제목 입력, 일정 생성, 달력을 통한 날짜 선택, 체크박스, 북마크, 일정 삭제, 일정 저장 등의 기능을 제공합니다.

## 실행 방법

- node 버전을 14.18, 16 이상으로 셋팅합니다. (제 환경의 경우 v18.12.1 입니다.)
- 프로젝트를 clone받습니다.
- yarn 명령어를 이용하여 패키지를 설치합니다. (npm, pnpm 등도 가능합니다.)
- yarn vite 명령어를 통하여 프로젝트를 실행시킵니다.

## 기술 스택 및 선정 이유

- React.js
  - 가장 많이 사용해 봐서 익숙하기도 하고, 브라우저만으로도 해당 프로젝트를 충분히 해결할 방법이 떠올라 SPA 방식에 적합하다는 생각이 들어 선택하였습니다.
- Vite
  - Webpack 보다 훨씬 빠른 개발 서버 속도를 지원하기에 선택하였습니다.
- TypeScript
  - 개발 시에 편리함/안정성 및 가독성을 위하여 선택하였습니다.
- Mobx
  - 익숙한 상태 관리 라이브러리이기도 하고, 프로젝트 규모가 크지 않고, 빠르게 작성하기에 적합한 라이브러리라 선택하게 되었습니다.
- @mui/material / styled-components
  - 스타일링 비용을 줄이기 위하여 선택했습니다. 또한 여러 가지 컴포넌트 기능을 제공하여 개발 공수를 줄일 수 있었습니다.
- localStorage
  - 일정 저장 기능을 사용하기 위해 선택하였습니다. 저장 기능을 위해 json-server 등을 고려해 보았으나, 인증/인가 과정도 따로 없고, 응답 속도, 비용 등을 고려해 봤을 때 localStorage가 적합하다는 생각을 하였습니다.

## 프로젝트 특징

- 초기화하지 않는 한 내용이 저장된 채로 유지됩니다.
- 모바일 접속을 고려하여 반응형으로 개발하였습니다. (상세 설명 부분에서 설명될 예정입니다.)
- 업데이트 시 300ms 지연
  - 비동기 통신이 없기에, 지연 시간이 존재하지 않았습니다.
  - 지연 시간 없이 체크박스, 북마크 등의 기능을 사용해 보니 사용자 경험에 그리 좋지 못하다는 것을 느꼈습니다.
  - 사용자 경험을 위해 일정 업데이트 시에 300ms의 지연 시간을 의도적으로 주었습니다.

## 프로젝트 구조 설명

- src
  - components
    - 재사용 가능한 컴포넌트가 위치합니다.
    - 반복적으로 사용되는 일정 컴포넌트, Dialog, TextField 등이 포함됩니다.
  - models
    - 객체의 타입을 관리하는 폴더입니다.
  - pages
    - 여러 재사용될 컴포넌트를 조립하여 단독으로 띄울 수 있는 페이지 단위의 컴포넌트입니다.
    - 이 프로젝트에서는 하나의 페이지만 존재하여 TodoList.tsx 파일 하나만 존재합니다.
  - store
    - 전역 상태를 관리하기 위한 Store 파일이 들어있습니다.
    - TodoStore.ts
      - 일정 관리 관련한 상태를 가지고 있습니다.
      - 각 일정을 나타내는 컴포넌트의 상태(각 일정의 제목, 날짜, 체크 여부, 북마크 여부 등)
    - UiStore.ts
      - UI 관련한 상태를 전역적으로 관리합니다.
      - Dialog의 상태(열려있는 지 닫혀있는 지), Calendar 컴포넌트의 상태를 관리합니다.
  - util
    - 특정 기능을 수행하기 위한 함수가 존재합니다.
    - 데스크톱/모바일을 판별하는 isMobile.ts 함수가 존재합니다.

## 프로젝트 상세 설명

- 프로젝트 진입 후, 제목을 입력합니다. (모든 입력 완료는 엔터 키 입력입니다.)
- 할 일 입력 완료시에 좌측부터 체크박스, 제목, 일정 선택 // 북마크(별 모양), X버튼이 존재하는 일정 컴포넌트가 렌더링 됩니다.
- 해당 컴포넌트에서 각각의 역할은 아래와 같습니다.
  - 체크박스
    - 일정 완료를 의미합니다. 일정이 완료되었기에 맨 아래로 이동합니다.
    - 체크된 경우(일정 완료) 제목 가운데에 가로줄이 생깁니다.
    - 또한 북마크(별 모양) 기능이 화면에서 사라집니다.
  - 제목
    - 입력한 제목을 의미합니다.
  - 날짜 선택 Chip
    - 기본 동작(날짜를 선택하지 않은 경우) '날짜를 선택해 주세요'라는 Chip이 보입니다.
    - 해당 Chip을 클릭 시에 오늘 날짜가 하이라이트된 달력 컴포넌트가 보이게 되며, 일정을 선택할 수 있습니다.
    - 일정 선택 시에 Chip 컴포넌트에 해당 일정이 들어갑니다.
    - 모바일로 접속하게 된 경우 화면 가로 길이상 해당 컴포넌트가 보이지 않습니다.
  - 북마크(별 모양)
    - 클릭 시에 해당 컴포넌트는 상단으로 이동하며, 배경 색이 하늘색으로, 북마크(별 모양) 아이콘이 파란색 배경을 띄게 됩니다.
  - X버튼
    - 클릭 시에 해당 일정 삭제 관련 경고 Dialog가 뜨고, 삭제 버튼을 클릭하게 되면 해당 일정이 화면 상에서 사라집니다.
- 저장 및 초기화 방법
  - 입력 완료(엔터키 입력) 혹은 일정 컴포넌트 업데이트(체크, 북마크, 삭제) 시에 해당 액션마다 localStorage에 값을 저장합니다. 동기화 과정이라고 보시면 됩니다.
  - 제목 입력 칸의 맨 오른쪽을 보시게 되면 초기화 버튼이 있습니다.
  - 초기화 버튼 클릭 시에 경고 Dialog가 노출되며 초기화 버튼 시에 localStorage 및 모든 state를 초기화합니다.
