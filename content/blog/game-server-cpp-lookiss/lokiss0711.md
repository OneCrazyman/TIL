---
title: '[Server Programming/cpp] thread'
date: "2024-07-11"
---
## <thread>
c++ 11부터 thread 사용 가능.
해당 모던 방식은 Linux/Win 플랫폼에서 모두 사용이 가능하다.
*IOCP는 Win의 대표적인 메커니즘으로 Linux에선 사용이 불능

```cpp
#include <iostream>
#include <thread>
using namespace std;

void HelloWorld() {
	cout << "Hello World" << endl;
}

int main()
{
	thread t1;
	t1 = thread(HelloWorld);
	return 0;
}	
```
위 코드를 실행시키면 에러가 뜬다.
t1 동작 중에 메인 스레드가 먼저 종료되기 때문이다.

```cpp
...
int main()
{
	thread t1;
	t1 = thread(HelloWorld);
	t1.join() //t1 스레드가 끝날때까지 대기
	return 0;
}	
```
위처럼 수정해보면 에러가 뜨지 않는다.

*cout은 무거운 실행 방식. os커널에 요청하는 system call을 사용하기 때문

### 