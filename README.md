<!-- <p align="center">
  <a href="https://github.com/ts-react/react-admin-template">
    <img width="100" src="https://github.com/ts-react/react-admin-template/blob/gh-pages/assets/logo.svg">
  </a>
</p> -->

<h1 align="center">React Admin Template</h1>

<p align="center">
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-16.8.1-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/ant-design/ant-design">
    <img src="https://img.shields.io/badge/ant--design-3.16.2-brightgreen.svg" alt="antd">
  </a>
  <a href="https://github.com/umijs/umi">
    <img src="https://img.shields.io/badge/umi-2.6.11-brightgreen.svg" alt="umi">
  </a>
  <a href="https://github.com/ts-react/react-admin-template/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Anti%20996-blue.svg" alt="996">
  </a>
  <a href="https://996.icu">
    <img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996">
  </a>
</p>

# 알림!
master브랜치를 기본 템플릿으로 기타 변경 작업은 타 브랜치에서 작업합니다.

# 작업순서

1. 노드 설치

2. yarn 전역 설치

```
npm install --global yarn
```

3. 의존성 설치

`npm run bootstrap` or `yarn bootstrap`

4. 시작

`npm run start` or `yarn start`

5. 빌드

`npm run build` or `yarn build`

# 기술스택

- 프레임워크  ：React、Umi
- 디자인     ：ant-design
- 언어       ：TypeScript
- Ajax      ：Axios
- 스타일      ：Less

# 디렉토리 구조

```
├── config                      # UMI 설정
│   ├── config.ts               #  umi플러그인
│   ├── plugin.config.ts        #  umi라우터
│   ├── router.config.ts        #  라우터
│   ├── server.config.ts        #  서버
│   └── theme.config.ts         #  테마
├── mock                        # 목업
│   ├── notices.ts              #  주의
│   └── users.ts                #  사용자
├── public                      # 공용
│   ├── favicon.png             #  favicon
│   └── 
├── src                         # 소스
│   ├── assets                  #  제공자
│   ├── components              #  컴포넌트
│   │   ├── authorized          #   인증
│   │   ├── drawer-wrapper      #   
│   │   ├── exception           #   
│   │   ├── global-footer       #   
│   │   ├── global-header       #   
│   │   ├── header-dropdown     #  
│   │   ├── header-search       #   
│   │   ├── icon-font           #   
│   │   ├── notice-icon         #   
│   │   ├── page-header-wrapper #   
│   │   ├── page-loading        #   
│   │   ├── screen-full         #   
│   │   ├── select-lang         #   
│   │   ├── notice-icon         #   
│   │   ├── send-code           #   
│   │   ├── side-menu           #   
│   │   ├── standard-table      #   
│   │   ├── tab-pages           #   
│   │   └──                     # 
│   ├── config                  #   
│   │   ├── index.ts            #   
│   │   └──  
│   ├── layouts                 #   
│   ├── locales                 #   
│   ├── models                  #   
│   ├── pages                   #   
│   ├── services                #   
│   ├── styles                  #   
│   ├── utils                   #   
│   ├── global.ts               #   
│   └── global.less             #   
├── .editorconfig               #   IDE설정
├── .gitignore                  #   
├── .huskyrc.js                 #   
├── .nvmrc                      #   
├── .prettierignore             #   
├── .prettierrc.js              #   
├── .stylelintrc                #   
├── commitlint.config.js        #   
├── jest.config.js              #   
├── LICENSE                     #   
├── lint-staged.config.js       #   
├── package.json                #   
├── README.md                   #   
├── tsconfig.json               #   
└── yarn.lock                   #   
```

# see also

- [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)
- [ant-design-pro](https://github.com/ant-design/ant-design-pro)
- [react-typescript-cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)
- [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)
