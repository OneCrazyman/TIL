---
title: "[DS] Head Recursion"
date: '2024-06-22'
---
재귀 함수에서 함수 호출을 첫 동작으로 하는 함수를 Head Recursion이라 한다.

### Head Recursion
```cpp
void fun(int n)
{
	if (n > 0)
	{
		... //이 부분, 함수 호출 전에 동작이 없어야 한다.
		fun(n-1);
		...
		...
	}
}
```

Tail Recursion과 다르게 반환하는 과정에서 해야할 동작(코드)이 있다.
그리고 이와같이 동작하는 재귀함수들은 곧바로 Loop로 바꾸긴 쉽지 않다. 내림차순의 과정을 구현해야하기 때문에..