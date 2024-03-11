---
title: "Mysql Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect."
date: "2024-03-11"
---

데이터를 실수로 넣어 delete로 모든 행을 삭제하려고 할때 뜨는 에러가 있다.

```
Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.
```

보안의 이유로 데이터를 직접 수정/삭제할때는 where로 key값을 특정해줘야만 수행이 가능하다.

![alt text](image.png)
개발 단계에서는 영구적으로 설정을 통해 경고를 disable 해주는 방법도 괜찮을 것이다.

혹은 일시적으로 해제하는 방법이 있다.
SQL문 전 행에
```
set sql_safe_updates=0;
```
을 적용해주면 일시적으로 disable이 가능하다.