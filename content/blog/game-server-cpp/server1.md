---
title: '[Server Programming/cpp] 멀티스레드 예제 - 소수 찾기'
date: "2024-06-25"
---
## 전체 코드
```cpp
#include <iostream>
#include <vector>
#include <chrono>
#include <thread>
#include <memory>
#include <mutex>

using namespace std;
const int MaxCount = 150000;
const int ThreadCount = 4;

//소수인지 판단
bool IsPrimeNumber(int number){
	if (number == 1) return false;
	if (number == 2 || number == 3) return true;
	for (int i = 2; i < number - 1; i++) {
		if ((number % i) == 0) {
			return false;
		}
	}
	return true;
}

//출력
void PrintNumbers(const vector<int>& primes) {
	for (int v : primes) {
		cout << v << endl;
	}
}

int main() {
    //변수 정의
	int num = 1;
	vector<int> primes;
	recursive_mutex num_mutex; //num 변수를 락할때 필요한 mutex 변수 선언
	recursive_mutex primes_mutex; // ""

	auto t0 = chrono::system_clock::now();
	
	//작동할 워커 스레드
	vector<shared_ptr<thread>> threads;

	for (int i = 0; i < ThreadCount; i++)
	{
		//외부 변수를 참조 캡쳐하여 쓰레드를 생성 * [&] 참조 캡처 : 람다 함수 내부에서 외부 변수 자체, 실제 값을 변경할 수 있다.
		//공유 변수를 사용하는 경우, 특히 동기화일때 참조 캡처를 사용해야 동기화를 이룰 수 있다.
		shared_ptr<thread> thread(make_shared<thread>([&]() {
			//각 스레드의 메인 함수
			//값을 가져올 수 있으면 루프를 돈다.
			while (true)
			{
				int n;
				{
					//num을 락시킨다.
					lock_guard<recursive_mutex> num_lock(num_mutex);
					n = num;
					num++;
				} // 스코프를 벗어나면서 num_lock 지역 변수가 삭제되며, unlock이 자동적으로 실행된다.
				if (n >= MaxCount) break;
                //소수인 경우
				if (IsPrimeNumber(n)) {
                    //접근할 primes에 락을 건 후 소수를 리스트에 넣어준다.
					lock_guard<recursive_mutex> primes_lock(primes_mutex);
					primes.push_back(n);
				} // 여기도 마찬가지로 스코프를 벗어나며 unlock실행
			}
		}));
		//쓰레드 객체를 쓰레드 벡터에 가지고 있는다.
		threads.push_back(thread);
	}

	//모든 스레드가 일을 마칠때까지 대기한다.
	for (auto thread : threads) {
		thread->join();
	}

	auto t1 = chrono::system_clock::now();
	auto duration = chrono::duration_cast<chrono::milliseconds>(t1 - t0).count();
	cout << "Took " << duration << "milliseconds." << endl;
	
	return 0;
}
```

스마트 포인터와 뮤텍스 클래스를 사용해 코드의 안정성을 높였다.

### lock_guard<recursive_mutex>의 역할
- 이 클래스는 스코프가 종료될 때 자동으로 뮤텍스를 해제한다.
- recursive_mutex는 뮤텍스를 재귀적으로 잠글 수 있게 해주는 뮤텍스 타입.

- lock_guard 객체가 생성되면서 뮤텍스를 잠근다.
- lock_guard 객체가 소멸되면, 해당 뮤텍스를 자동으로 해제한다.
- 예외가 발생하더라도 뮤텍스가 해제되므로, 코드의 안정성을 높여준다.

본 코드에서는 `lock_guard<recursive_mutex> num_lock(num_mutex);` 와 같이 num_mutex를 잠그고 num 변수에 접근하였다. 

### 결론
thread 클래스를 사용해서 멀티 스레드 프로그램을 작성해보았다. 뮤텍스 기법을 사용해 자원을 동기화하여 문제없이 cpu의 다중 스레드를 효율적으로 사용해 프로그램의 속도를 높이는 것이 가능했다. 