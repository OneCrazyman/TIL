---
title: "[c++] 함수 매개변수 복습"
date: '2024-05-29'
---
## Call By Value
매개변수를 가져다가 결과값을 반환.
```cpp
#include <iostream>

using namespace std;

int add(int a, int b) {
    int c;
    c = a + b;
    return c;
}

int main() {
    int num1 = 10, num2 = 15;
    add(num1, num2);
    return 0;
}
```
## Call By Pointer
이 함수의 결과가 어쨋든 간에 실제 매개 변수에 반영이 된다.
- Call By Value의 하나의 반환값에 비해 하나의 함수로 여러 결과를 얻을 수 있다. 포인터에 의한 간접 접근.
```cpp
#include <iostream>

using namespace std;

void swap(int* x,int* y) {
    int temp;
    temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int num1 = 10, num2 = 15;
    swap(&num1, &num2);
    return 0;
}
```

## Call By Reference
참조자는 포인터가 아니다. 변수의 별명으로, 함수내에서 참조자는 곧바로 원래의 해당 변수를 대신한다.
결과적으로 아래 swap함수는 inline함수가 될 수 있다. (컴파일러에 의해 결정됨. 안될 수도 있다.)
```cpp
#include <iostream>

using namespace std;

void swap(int &x,int &y) {
    int temp;
    temp = x;
    x = y;
    y = temp;
}

int main() {
    int num1 = 10, num2 = 15;
    swap(num1, num2);
    return 0;
}
```

### 의구심
하나는 Call By Value, 하나는 Not Call By Value로 매개변수가 전달되면 어떻게 되는 걸까?

작동은 할 것이다. 다만 인라인 함수로 작동할지 안할지는 컴파일러가 결정하겠지만,
매개변수의 메커니즘이 다르기 때문에 인라인으로 만들지 않을 것이다.

매개 변수의 형식에 따라 다양한 메커니즘이 하나의 함수에서 실행될 수 있다는 의미이다.
```cpp
void swap(int &x,int y) {
    int temp;
    temp = x;
    x = y;
    y = temp;
}
```