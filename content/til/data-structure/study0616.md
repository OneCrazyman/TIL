---
title: "[Data Structure] 정적 변수와 재귀 함수 Static and Global Variable in Recursion"
date: 2024-06-15
---
재귀함수에서 일반 변수를 사용하면 매번 호출마다 메모리에 새로운 복사본이 생성된다. 그리고 그것이 일반 로컬 변수의 기능이기도 하다. 

static 정적 변수를 사용하면 재귀함수에서 어떤일이 일어나는지 살펴보자

### static varible
```cpp
int func (int n)
{
    Static int x =0; // static variables in recursion
    if(n>0)
    {
        x++
        return fun(n-1)+ x ;
    }
 return 0;

}
main()
{
    int a = 5;
    printf("%d", fun(a));

}
```

내부에서 static으로 선언한 x변수는 최초 호출시 메모리에 생성되며, 이후 호출시에는 무시된다. 이전에 생성되었던 x변수 그대로 메모리에서 사용할 수 있게 된다.

정적 변수를 사용하면 모든 함수 호출에서 사용이 가능한 것.

### global varible
```cpp
int x = 0; // global variable in recursion
int func (int n)
{
    if(n>0)
    {
        x++
        return fun(n-1)+ x ;
    }
    return 0;

}
main()
{
    int a = 5;
    printf("%d", fun(a));

}
```
같은 기능을 하도록 전역 변수로 선언했을때의 경우를 살펴보자.  

static의 경우와 같은 출력값을 낼것이다.
다만, 함수외부, 전역에 선언,생성된 변수이기에, static 경우와 다르게 함수 호출이 모두 종료되어도 메모리에 남아있을것이다. 
- static으로 생성했던 변수는 해당 스코프가 끝나면 함께 메모리에서 삭제됨
