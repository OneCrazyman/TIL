---
title: '[AWS] EC2에 터미널 환경에서 mysql 구축하기'
date: '2024-04-04'
---

```
ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement
``` 

```
mysql> show variables like 'secure_file_priv';
+------------------+-----------------------+
| Variable_name    | Value                 |
+------------------+-----------------------+
| secure_file_priv | /var/lib/mysql-files/ |
+------------------+-----------------------+
1 row in set (0.00 sec)
```

하지만 저 경로는 권한이 없어서 접근을 하지 못했다.

## 관리자 권한을 사용해 폴더에 접근
```
sudo su //루트 권한으로 쉘을 실행
cd /var/lib/mysql-files //이런식으로 이제 접근이 가능

root@mysql:/# cp /home/ubuntu/ITEM.CSV /var/lib/mysql-files //파일 이동, 복사
```

![alt text](image-5.png)