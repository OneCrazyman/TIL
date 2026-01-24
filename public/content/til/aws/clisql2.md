---
title: '[AWS] EC2상 mysql에서 csv파일 로드하기'
date: 2024-04-04
---
## 그동안의 과정
사실 rds로 db를 운영하기로 해서 rds에 파일을 로드하기 위해 s3를 이용하는 방법, 따로 Bastion을 거쳐 전송하는 방법.. 등을 시도했으나 실패했고, 다른 방법을 찾아보다 여기까지 오게 되었다.

## 에러 발생
mysql 최신버전에서 항상 볼 수 있는 에러인데, aws상에서 해결하려니 조금 애를 먹었다.
```
ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
``` 

그럼 경로를 확인해주고
```
mysql> show variables like 'secure_file_priv';
+------------------+-----------------------+
| Variable_name    | Value                 |
+------------------+-----------------------+
| secure_file_priv | /var/lib/mysql-files/ |
+------------------+-----------------------+
1 row in set (0.00 sec)
```

하지만 터미널상에서 mysql에 관련된 디렉토리는 권한이 없어서 접근을 하지 못했다.

### 관리자 권한을 사용해 폴더에 접근
```
sudo su //루트 권한으로 쉘을 실행
cd /var/lib/mysql-files //이런식으로 이제 접근이 가능

root@mysql:/# cp /home/ubuntu/ITEM.CSV /var/lib/mysql-files //파일 이동, 복사
```

이후 잘되나 싶었는데 똑같은 에러 발생
```
ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
```

임포트 마법사를 통해 로드할때는 대문자 확장자면 에러가 발생할 수 있었어서 이것도 그런가 해서 다음 명령어를 사용했는데도 해결이 되지 않았다.
```
mv ITEM.CSV item.csv
```

결과적으로 해결은 했는데, 단순히 로드할 경로를 제대로 설정해주지 않았던 탓이였다. 아래처럼 지정해주었다.
```
LOAD DATA INFILE '/var/lib/mysql-files/item.csv'
```
![alt text](image-5.png)