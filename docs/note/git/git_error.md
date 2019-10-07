---
tags: git, background, 前端
description: git
---

# git 报错

## error：Your local changes to the following files would be overwritten by merge

1、服务器代码合并本地代码
```
$ git stash  // 暂存当前正在进行的工作。
$ git pull origin master // 拉取服务器的代码
$ git stash pop // 合并暂存的代码
```
2、服务器代码覆盖本地代码
```
$git reset --hard // 回滚到上一个版本
$git pull origin master
```

## remote: Enumerating objects

网速问题，更换网络尝试