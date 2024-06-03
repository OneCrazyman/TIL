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