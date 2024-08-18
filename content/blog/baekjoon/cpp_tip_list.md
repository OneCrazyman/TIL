---
title: "[Algorithm/c++] c++ 코딩테스트에 필요한 코드"
date: "2024-08-18"
---

### 파일로 입력 한번에 받기
```cpp
freopen("input.txt", "r", stdin);
```

### 각종 사이트 제출시 시간 초과 에러 방지
```cpp
ios_base::sync_with_stdio(false);
cin.tie(0);
```
- 대규모 데이터 처리나 알고리즘 문제 제출시 유용한 코드

`ios_base::sync_with_stdio(false);`
sync_with_stdio값이 디폴트로 true 상태인데, 이때는 cpp의 기본적인 특성으로 입출력 함수로 printf나 scanf 그리고 cin, cout을 함께 사용이 가능하지만,

이 동기화는 수많은 입출력 데이터가 있는 경우, 성능 저하를 초래한다.

`cin.tie(0);`
디폴트로 cin과 cout은 서로 연결되어 있는 상태이다. 

이를 cin.tie(0)을 통해 연결을 끊어 cin과 cout을 독립적으로 실행하기 때문에 성능 향상을 도모할 수 있다.

*일반적인 프로그램에서는 비정상적인 상황이 연출되지만, 단순 문제 풀이에서는 프로그램에 별 상관이 없어 성능 향상을 위해 사용한다.