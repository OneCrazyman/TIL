---
title: "[c++] Template classes"
date: '2024-06-04'
---
## 일반적인 클래스
```cpp
class Arithmetic {
private:
	int a;
	int b;
public:
	Arithmetic(int a, int b);
	int add();
	int sub();
};

Arithmetic::Arithmetic(int a, int b) {
	this->a = a;
	this->b = b;
}

int Arithmetic::add() {
	int c;
	c = a + b;
	return c;
}

int Arithmetic::sub() {
	int c;
	c = a - b;
	return c;
}
```
전부 int형으로 정의되고 반환값 또한 int형이다.

만약 해당 클래스를 int형의 입력과 반환값 외에도 float 등 다른 타입으로 사용하려면 클래스를 두개 세개 만들어야할까?

## Template classes 사용
클래스 선언 부에 ```template<class T>``` 를 선언
자료형에 int대신 T를 사용하여 작성해보자
```cpp
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>

using namespace std;

template<class T>
class Arithmetic {
private:
	T a;
	T b;
public:
	Arithmetic(T a, T b);
	T add();
	T sub();
};

template<class T>
Arithmetic<T>::Arithmetic(T a, T b) {
	this->a = a;
	this->b = b;
}
template<class T>
T Arithmetic<T>::add() {
	T c;
	c = a + b;
	return c;
}
template<class T>
T Arithmetic<T>::sub() {
	T c;
	c = a - b;
	return c;
}

int main() {
	Arithmetic<float> ar = {1.5,2.7};
	cout << ar.add() << endl;
	cout << ar.sub() << endl;
	return 0;
}
```

## 참고+ 오버플로우
```cpp
int main() {
	Arithmetic<char> ar = {'A','B'};
	cout << (int)ar.add() << endl;
	cout << (int)ar.sub() << endl;
	return 0;
}
```
해당 실행의 결괏값은 얼마가 나올까?
```
-125
-1
```

-1은 알다싶이 char 문자는 실제로 정수값을 가지고 있다. 아스키코드에서 A는 65 B는 66이기에 둘을 빼면 -1이 나온다.

그렇다면 둘의 합은 131이 되어야 정상인데, -125는 왜 나왔을까?

이는 당연한 결과이다. char 자료형의 크기값은 8비트, 1바이트이다. 즉 총 256의 숫자를 담는데 디폴트가 signed이니 -128~127 사의 값을 가지게 되고 오버플로우가 발생하여 -128 부터 3을 더하면 -125가 나오게 된다.