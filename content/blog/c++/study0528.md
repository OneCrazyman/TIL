---
title: "[c++] 240528"
date: '2024-05-28'
---

## struct 구조체
### 전역 선언
```
struct MyStruct{
    ...
} m1, m2;
```
```

int main(){
    ...
}
```
### 지역 선언 및 초기화
```
int main(){
    struct MyStruct m1;
    struct MyStruct m1 = {...};
}
```

## 포인터와 변수
- 일반적인 모든 변수는 생성시 stack 메모리에 저장된다.
- heap 메모리에 접근하기위해 포인터 변수가 필요하다.

c언어
- malloc을 사용해 동적 배열을 heap에 생성

c++
- new 연산자를 사용해 heap에 배열을 생성성