---
title: '[linux] 우분투 호스트명 변경'
date: 2024-04-03
---
```ter
$ hostname //확인
$ hostnamectl //상세한 정보 표시

$ sudo hostnamectl set-hostname {호스트네임}
$ cat /etc/hostname //변경확인
$ hostnamectl
```