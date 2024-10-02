---
title: "[c++] 구조체, 포인터 복습"
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

- cpp에서는 구조체 명시를 생략하고 선언 및 초기화가 가능하다.
```cpp
int main(){
    MyStruct m1;
    ...
}
```

## 포인터와 변수
- 일반적인 모든 변수는 생성시 stack 메모리에 저장된다.
- heap 메모리에 접근하기위해 포인터 변수가 필요하다.

c언어
- malloc을 사용해 동적 배열을 heap에 생성

c++
- new 연산자를 사용해 heap에 배열을 생성

### c언어 예제
```cpp
#include <iostream>
#include <stdlib.h>
using namespace std;
int main() {
	int* p;
		
	p = (int*)malloc(3 * sizeof(int));
	p[0] = 1; p[1] = 2; p[2] = 3;

	for (int i = 0; i < 3; i++) {
		cout << p[i] << endl;
	}
    free(p); //memory deallocation
	return 0;
}
```
malloc(size_t)는 void*(제너릭 포인터)를 반환한다. 즉 힙 메모리의 해당 위치 주소를 똑같이 반환하는데, (int*)처럼 형변환을 통하여 해당 주소를 받은 포인터가 int 타입의 데이터를 저장하거나 읽을 수 있게 된다!
### cpp 예제
```cpp
#include <iostream>
#include <stdlib.h>
using namespace std;
int main() {
	int* p;
		
	p = new int[3];
	p[0] = 1; p[1] = 2; p[2] = 3;

	for (int i = 0; i < 3; i++) {
		cout << p[i] << endl;
	}

    delete [] p; //memory deallocation

	return 0;
}
```

### memory deallocation
- 메모리 할당 해제
- 소규모의 프로젝트, 실습 등에서는 어차피 프로그램이 종료되니 굳이 할 필요는 없다. 프로그램이 종료되면 자동으로 힙 메모리가 해제되니깐,
- 다만, 실시간 운영중인 서버나 대규모 프로젝트의 경우 힙메모리의 해제를 제대로 해주지 않으면, 메모리 누수가 일어날 것이다.

### 최신 컴파일러에서의 포인터 변수의 size
```cpp
#include <iostream>
using namespace std;
struct MyStruct
{
	int a;
	int b;
};
int main() {
	int* p1;
	float* p2;
	double* p3;
	char* p4;
	MyStruct* p5;

	cout << sizeof(p1) << endl;
	cout << sizeof(p2) << endl;
	cout << sizeof(p3) << endl;
	cout << sizeof(p4) << endl;
	cout << sizeof(p5) << endl;
	
	return 0;
}
```

```
8
8
8
8
8 
```

전부 8bytes가 나온다. 왜그럴까.. 알아보니
64비트 시스템에서 컴파일되고 실행되기 때문이다.
64비트 환경에서는 모든 포인터가 8바이트즉 64비트로 표현되기 때문.

데이터 타입과 무관하게 포인터 변수는 힙 공간 크기에 의존하기 때문에 시스템 아키텍쳐를 따라가게 된다.

- 그렇다면 32비트 시스템에선? 포인터 변수의 크기는 4바이트, 32비트가 될것이다!