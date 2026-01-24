---
title: "[c++] 예제: 문자열 복사"
date: 2024-05-21
---

```cpp
//동적할당을 사용한 문자열 복사
#include <iostream>
using namespace std;
const int MAX_STR = 100;
int Min(int a, int b) {
	return (a < b ? a : b);
}

int main()
{
	//문자열을 복사하고 싶은데 문자열은 포인터이고 심지어 배열 크기가 다르다.
	char str1[] = "Hello, World!";
	char str2[MAX_STR]; //static array

	//memcpy(destination,source,size) //copy size of src to dest
	memcpy(str2, str1, Min(sizeof(str1), sizeof(str2)));
	cout << str2 << endl;
	
	//dynamic array
	char* dynamic_array = new char[MAX_STR];

	//dynamic array의 사이즈는 포인터 사이즈이므로 주의
	memcpy(dynamic_array, str1, Min(sizeof(str1),MAX_STR));
	cout << dynamic_array << endl;

	cout << str1 << " " << str2 << " " << dynamic_array << endl;
	cout << size_t(str1) << " " << size_t(str2) << " " << size_t(dynamic_array) << endl;

	delete[] dynamic_array;

	return 0;
}

//결과: 1014187947080 1014187947136 3017905820496
//정적은 스택에서 동적은 힙에서 관리하기때문에 주소적 차이가 난다.
```