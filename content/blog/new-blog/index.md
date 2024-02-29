---
title: 새 TIL 블로그를 시작했습니다.
date: "2024-02-28"
---
# Hello world

기존 티스토리 블로그는 아무래도 더 공개적인 장소다 보니 정제된 글을 써야된다는 부담이 있었습니다.  
어느날에는 이것저것 공부할때도 많고 하나의 트러블슈팅에 막혀 진도를 못빼는 경우도 있어서 이런 모든걸 기록하기에는
조금더 개인적인 블로그가 있으면 좋다 생각했고, TIL로 오늘 배운 내용을 적당히 끄적이고 남겨서 나중에 스스로 되돌아보기도 좋지 않을까 하여 TIL 블로그를 시작했습니다😊 

# Github에 배포
배포를 위해 정적사이트를 위한 툴이 필요했는데, github에서는 `jekyll`을 공식적으로 권유하길래 사용해봤으나,, 생각보다 쉽지 않았습니다. 일단 버전 오류도 심하게 났고, ruby를 사용해서 이후에 커스텀하기엔 한계도 있다 판단되어 `Gatsby`를 사용하기로 판단했습니다!

# Gatsby
물론 js,graphql,react 개념들을 접해본적이 없기에 이것또한 막막했습니다.. 테마 설치하고 배포하면 끝인 튜토리얼과 다르게 로컬에서는 잘 빌드되고 배포되는 나머지, 정작 깃헙을 통해서 올리면 배포가 되지 않더라고요 여럿 방법을 찾아본 결과

`main` 브랜치와 `deploy`용 브랜치를 따로 운영해서 배포하는 방식으로 진행했습니다! gatsby는 빌드할때 public이란 웹사이트와 관련된 파일이 디렉토리에 html로 생성되기 때문에 public 폴더를 `deploy` 브랜치에 배포하는 방식으로 진행하였습니다.

이때, 깃허브 페이지에 배포하기위해 gh-pages 패키지를 이용해야합니다. (저는 npm을 이용해 패키지를 설치했습니다.)
```
npm i gh-pages
```
하지만 여기서 gatsby 버전과 관련해서 오류가 뿜뿜 발생

gatsby 테마를 이용해 설치했기 때문에 원인을 못찾다가 결국엔 젤 처음 테마를 설치하기 위해 필요한 `gatsby-cli`을 다운그레이드 해서 설치하고 진행해서 해결하였습니다.
```
npm install -g gatsby-cli@4.25.0
```
또한, TIL 레포에서 직접 배포하는 형태이기때문에 `prefix-path`를 이용해 레포 경로를 지정해주었습니다. 아래는 gh-pages를 이용해 deploy할때 prefix-path를 지정해주는 코드입니다. 아 그리고 config에서 prefix-path 경로를 지정해주면 됩니다.

`pacakge.json`
```js
"scripts": {
    "deploy": "gatsby build --prefix-paths && gh-pages -d public -b deploy" //브랜치 네임이 "deploy" 일때, -b {브랜치명}
}
```
`gatsby-config.js`
```js
module.exports = {
  pathPrefix: `/TIL`, //exports 안에 지정 /{레포지토리 네임}
  siteMetadata: {
    title: `Oneman's TIL`,
    author: {
      name: `Oneman`,
      summary: `꾸준히 남겨서 체득하자`,
    },

    ...
```

# 이후에 할것
추가할 기능으로 
- 댓글
- 카테고리 (갯수 표시)
- 코드블록에 파일명 표시
- 구글 검색 등록