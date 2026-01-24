---
title: "[c++] 다형성, 가상 함수"
date: 2024-05-16
---

## 다형성(polymorphism)
- 똑같은 메시지가 전달되더라도 객체들의 타입이 다르면 서로 다른 동작을 하는것
- 객체 포인터를 통해 이루어진다.

### 객체 포인터의 형변환
```cpp
Dog dog; // Dog 타입의 객체
Animal *pa; // Animal 객체 포인터
pa = &dog; // Animal 객체 포인터로 Dog 타입의 객체를 가리킨다
```
- 부모 클래스 포인터는 자식 객체도 가리킬 수 있다.
- = 상향 형변환(up-casting)
- 그 반대는 하향 형변환(down-casting)

### 상향 형변환
- 다만 자식 클래스 객체에 선언된 부분은 사용하지 못한다. (교집합인 부모 데이터만 사용 가능)

### 하향 형변환
```cpp
Shape *ps = new Rectangle( );
Rectangle *pr = (Rectangle *)ps;
pr->setWidth(100);
((Rectangle *)ps)->setWidth(100);
```

*형 변환 오류를 방지하는 방법	
- dynamic_cast 형변환 연산자 사용  
	```cpp
	DerivedClass *pd = dynamic_cast<DerivedClass *>(pb);
	```

## 가상 함수
```cpp
class Shape {
	...
}
class Rectangle : public Shape {
	...
}
int main()
{
	Shape *ps = new Rectangle(); // OK!
	ps->draw(); // 어떤 draw()가 호출되는가?
}
```
```
Shape Draw
```

- 자식 클래스의 재정의된 함수가 호출되게 하려면, 부모 클래스의 함수를 가상함수로 정의하자

	```cpp
	...
	virtual void draw() { 
		cout <<"Shape Draw" << endl;
	}
	...
	```

## 동적 바인딩(binding)
- 함수 호출을 함수의 몸체와 연결하는 것

- 정적 바인딩(static binding)
- 동적 바인딩(dynamic binding), 지연 바인딩(late binding)

|바인딩의 종류|특징|속도|대상|
|---|---|---|---|
|정적 바인딩|컴파일 시간에 호출 함수가 결정|빠르다|일반 함수|
|동적 바인딩|실행 시간에 호출 함수가 결정|늦다|가상 함수|

- 가상함수가 아닌 모든 함수는 정적 바인딩으로 호출

## 참조자와 가상 함수
- 포인터를 사용한 다형성과 동일하다.
	```cpp
	int main()
	{
		Dog d;
		Animal &a1 =d;
		a1.speak();
		Cat c;
		Animal &a2 =c;
		a2.speak();
		return 0;
	}
	```

## 가상 소멸자
- 다형성을 사용할때는 소멸자를 virtual로 지정해야 한다.


## 순수 가상 함수(Pure Virtual Function)
- 헤더만 존재하고 몸체는 없는 함수
	```cpp
	virtual void draw( ) = 0;
	```

### 추상 클래스(abstract class)
	- 순수 가상 함수를 하나라도 가지고 있는 클래스
	- 추상적인 개념을 표현할 수 있다.
	- 객체를 생성할 수 없다.
		- 포인터 변수는 생성할 수 있다.
			- 자식 클래스의 객체를 가리킬 수 있다.