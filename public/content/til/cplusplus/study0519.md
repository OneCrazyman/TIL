---
title: "[c++] 내부 스코프"
date: 2024-05-19
---
```cpp
#include <iostream>

using namespace std;

int main()
{
	int i = 123;
	
	{
		int i = 456;
		cout << i << endl;
	}

	cout << i << endl;

	return 0;
}
```
```
456
123
```

## 변수 스코프
- 변수 스코프는 변수의 유효 범위를 의미하며, 변수가 어디에서 접근 가능한지를 결정한다.

- C++에서 블록(block)은 중괄호 {}로 구분되며, 블록 내에서 선언된 변수는 그 블록 안에서만 유효하다. 이 범위를 블록 스코프라고 한다.