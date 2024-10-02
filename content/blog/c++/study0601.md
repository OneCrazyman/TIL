---
title: "[c++] C에서 C++로의 리팩토링 이해하기"
date: '2024-06-01'
---
c의 코드를 cpp로 리팩토링 하는 과정을 통해 c++를 이해해보자.

### c언어 예제
```c
#include <iostream>

struct Rectangle {
	int length;
	int breadth;
};

//c에서는 struct를 붙여줘야함
void Intializer(struct Rectangle *r, int l, int b) {
	r->breadth = l;
	r->length = b;
}

//call by value
int area(struct Rectangle r) {
	return r.length * r.breadth;
}

void changeLength(struct Rectangle* r, int l) {
	r->length = l;
}
int main() {
	struct Rectangle r;
	Intializer(&r, 10, 20);
	area(r);
	changeLength(&r, 15);
	return 0;
}
```

간단한 코드인데, Rectangle 인스턴스를 선언하고, 함수를 사용해 초기화, area 반환, 값을 변경하는 기능을 포함하고 있다. 이걸 c++ 식으로 리팩토링 하려면 어떻게 해야할까.

구조체는 클래스로 구현하고, 변수는 private로 해야 cpp다운 코드일거고, 포인터를 이용해서 인스턴스에 접근하는 함수는 애초에 목적이 구조체에 관련되어 있기 때문에, 멤버 메소드로 편입하면 되겠다. 특히 Intializer는 ? cpp의 생성자가 되고, 인스턴스를 생성할때 바로 초기화가 가능해질 것이다.

### cpp 예제
```cpp
#include <iostream>

class Rectangle {
private:
	int length;
	int breadth;

public:
	//생성자로 변경
	//void Intializer(struct Rectangle* r, int l, int b) {
	Rectangle(int l, int b){
		length = l;
		breadth = b;
	}

	//call by value
	int area() {
		return length * breadth;
	}

	void changeLength(int l) {
		length = l;
	}
};


int main() {
	Rectangle r(10,20);
	//Intializer(&r, 10, 20);
	r.area();
	r.changeLength(15);
	return 0;
}
```
