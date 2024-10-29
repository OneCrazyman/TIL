---
title: "[c++] 생성자, 소멸자, 멤버초기화 목록"
date: '2024-05-15'  
---
## 생성자와 소멸자
### 생성자(constructor)
- 초기값 제공, 초기화 절차를 실행
- 메모리공간이나 파일 같은 자원을 할당
- 객체 생성시 자동 호출
- 클래스이름과 동치
- 매개변수 가능
- 중복 정의 가능
*생성자 = 구성자
### 소멸자(destructor)
- 객체가 소멸되는 시점에 마무리 작업
	- 동적 메모리 반납 등
- 객체 소멸시 자동 호출
- 클래스 이름 앞에 ~
- 매개변수 불가능
- 중복 정의 불가능

### 생성자의 외부정의
생성자도 멤버 함수와 마찬가지로 클래스 내 외부에서 정의가 가능하다.
- 클래스이름::생성자() 로 정의

### 생성자 중복정의
```
Car::Car() 
{
	cout << "디폴트 생성자 호출<< endl;
	speed = 0;
	gear = 1;
	color = "white"
}
Car::Car(int s, int g, string c) 
{
	cout << "매개변수가 있는 생성자 호출<< endl;
	speed = s;
	gear = g;
	color = c;
}
```

### 생성자 호출 방법
```
int main()
{
	Car c1; // ①디폴트 생성자 호출
	Car c2(); // ②생성자 호출이 아니라 c2()라는 함수의 원형 선언
	Car c3(100, 3, "white"); // ③생성자 호출
	Car c4 = Car(0, 1, "blue"); // ④이것은 먼저 임시 객체를 만들고 이것을 c4에 복사
	return 0;
}
```

### 디폴트 매개변수
```cpp
Car(int s=0, int g=1, string c=“red")
```

## 멤버 초기화 목록
### 멤버 초기화 목록(Member Initialization List)
- 생성자() : 멤버(매개 변수) 형식으로 작성
	```cpp
	Car (int s, int s, string c) : speed(s), gear(g), color(c)
	```
- 사용하는 이유
	- 멤버가 상수인 경우
	- " 참조자인 경우
	- " 객체인 경우  

### 상수인 경우
- 객체가 생성되기 전까지 초기화가 연기
- 초기화 리스트로만 값을 초기화 가능
```cpp
class Car
{
	const int MAX_SPEED;
	int speed; // 속도
public:
	Car() : MAX_SPEED(300) 
	{
	}
};
```

### 객체인 경우
- 생성자 안에서 다른 클래스의 생성자를 호출할 수 없다.
- 디폴트 값이 아닌 다른 값으로 초기화하기
```
class Point
{
	int x, y;
public:
	Point(int a, int b) : x(a), y(b) { }
};

class Rectangle
{
	Point p1, p2;
public:
	Rectangle(int x1, int y1, int x2, int y2) : p1(x1, y2), p2(x2, y2) { }
};
```
## 복사 생성자(Copy Constructor)
- 객체의 내용을 다른 객체로 복사
- 자동으로 디폴트 복사 생성자가 생성

```cpp
public:
Car(int s, int g, string c) : speed(s), gear(g), color(c) 
{
	cout << "생성자 호출" << endl; 
}
Car(const Car &obj) : speed(obj.speed), gear(obj.gear), color(obj.color) 
{
	cout << "복사 생성자 호출" << endl; 
}
```
### 디폴트 복사 생성자
- 메모리 소멸에 비해 메모리 할당이 부족하다.
-> 즉 __얕은 복사(shallow copy)__ 문제 발생
	- 메모리 할당 시 멤버에 있는 주소값만 복사된다.

#### 해결법
- 직접 복사 생성자를 구현 (deep copy)
