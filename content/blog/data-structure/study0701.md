---
title: "[DS] nCr using Recursion"
date: '2024-07-01'
---
## Combination Formula 조합 공식
![alt text](image-1.png)
- n개에서 순서에 상관없이 r개의 원소를 선택하는 경우의 수

이걸 단순한 함수로 구현한다면 공식의 분자와 분모값들을 팩토리얼 함수를 호출해 구현하면 될 것이다. 여기서는 재귀 함수를 통해 구현해보았다.

### 파스칼의 삼각형
```
      1
     1 1
    1 2 1
   1 3 3 1
  1 4 6 4 1
```
- 가장 윗 줄에는 1
- 그 다음 줄부터는 좌우 대각선 위의 값의 합으로 이루어진다.

이걸 조합 공식으로 이해해보면
```
                  0C0
                 /    \
              1C0    1C1
             /  \    /  \
           2C0  2C1 2C1 2C2
...
```
이렇게 표현할 수 있다. 양 사이드가 전부 1이므로
- 값이 1이 되는 경우는 r = 0 일때, 혹은 n == r 인 경우이다.
- 나머지는 좌우 대각선 위의 합을 값을 갖는다.

### 코드로 구현
```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
using namespace std;

int NCR(int n, int r) {
	if (r == 0 || n == r) {
		return 1;
	}
	else {
		return NCR(n - 1, r - 1) + NCR(n - 1, r);
	}
}

int main() {
	cout << NCR(4, 2) << endl;
	return 0;
}
```
