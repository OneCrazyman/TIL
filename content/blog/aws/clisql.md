---
title: '[AWS] EC2에 터미널 환경에서 mysql 구축하기'
date: '2024-04-03'
---

## 이유
aws환경에서 db를 구축하려면 여러 방법이 있다. 대표적으로 rds를 사용하거나 ec2에 직접 배포하는 법.

rds의 기능이 강력하고 편한 장점이 있지만, ec2에 직접 배포하는 게 공부의 차원에서 직접 커스텀하고 최초환경을 세팅하는 등 할게 많아보여 선택하게 되었다. 비용도 절반인 것도 한 몫 하였다.

## 진행
기존과 같은 방식으로 ec2를 생성하고 원격으로 접속하였다.

```
sudo apt update
sudo apt install mysql-server

sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf // 원격 접속 허용

sudo mysql_secure_installation // 기초 설정 마법사

mysql -u root -p //루트로 접속
CREATE USER '사용자이름'@'호스트' IDENTIFIED BY '비밀번호'; //데이터베이스를 관리할 유저 생성 (%는 모든 연결 허용을 의미)
GRANT ALL PRIVILEGES ON *.* TO '사용자이름'@'호스트';
FLUSH PRIVILEGES; //변경사항을 적용
```

### 유저로 접속
```
ubuntu@mysql:/var/lib$ mysql -u gaseyola -p
Enter password:

```
이렇게 접속한 후 데이터베이스이나 테이블을 생성할 수 있게 되었다.

```
CREATE DATABASE 데이터베이스이름;
USE 데이터베이스이름;
SHOW TABLES;
```