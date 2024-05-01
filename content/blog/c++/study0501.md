---
title: "[c++] 제어문과 함수"
date: '2024-05-01'  
---

__c와 c++ 차이__
c언어
- 반환형이 명시되어 있지 않으면 int형으로 가정
아래 코드는 컴파일러가 int foo()로 명시한다.
```c
foo() {
    return 42;
}
```

c++
- 반황형이 __반드시__ 명시되어 있어야한다.
위 코드를 실행하면 컴파일 오류 발생
아래 코드처럼 없을시 void를 붙여야 한다.
```cpp
void foo() {
    // do something
}
```
__출처__  
명품 C++ Programming  
© Chang Seung Kim – All rights reserved 