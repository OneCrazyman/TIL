---
title: "[Algorithm/c++] c++ 코딩테스트에 필요한 코드"
date: "2024-08-18"
---

### 파일로 입력 한번에 받기
```cpp
freopen("input.txt", "r", stdin);
```

### 각종 사이트 제출시 시간 초과 에러 방지
```cpp
ios_base::sync_with_stdio(false);
cin.tie(0);
```
- 대규모 데이터 처리나 알고리즘 문제 제출시 유용한 코드

`ios_base::sync_with_stdio(false);`
sync_with_stdio값이 디폴트로 true 상태인데, 이때는 cpp의 기본적인 특성으로 입출력 함수로 printf나 scanf 그리고 cin, cout을 함께 사용이 가능하지만,

이 동기화는 수많은 입출력 데이터가 있는 경우, 성능 저하를 초래한다.

`cin.tie(0);`
디폴트로 cin과 cout은 서로 연결되어 있는 상태이다. 

이를 cin.tie(0)을 통해 연결을 끊어 cin과 cout을 독립적으로 실행하기 때문에 성능 향상을 도모할 수 있다.

*일반적인 프로그램에서는 비정상적인 상황이 연출되지만, 단순 문제 풀이에서는 프로그램에 별 상관이 없어 성능 향상을 위해 사용한다.

### 이진 탐색 binary_search
binary_search : 이진 탐색을 이용하여 O(log N) 시간 복잡도

정렬된 상태에서 빠른 탐색이 가능한 방법

- 정렬된 범위: binary_search는 정렬된 범위에서만 제대로 동작해. 만약 범위가 정렬되어 있지 않으면 잘못된 결과를 반환할 수 있어. 벡터가 정렬되지 않았다면 std::sort로 먼저 정렬해줘야 해.

`예시`
```cpp
int main() {
    std::vector<int> v = {1, 2, 4, 4, 5, 6, 7};

    // 요소가 벡터에 존재하는지 확인
    bool found = std::binary_search(v.begin(), v.end(), 4);

    std::cout << (found ? "Found" : "Not found") << std::endl;

    return 0;
}
```