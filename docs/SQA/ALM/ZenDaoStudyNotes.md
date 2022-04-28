# 禅道学习笔记

## 背景

禅道作为老牌国产ALM，既有高于同级别工具（如Redmine/JIRA）的全流程管控（如产品管理/测试执行管理），又在工作流上不具有基本的可定制性，总是非常非常具有特色，之前没有非常系统性研究，工作原因做一些备忘

## 基础设施

### 部署

禅道是PHP架构的B/S系统亦支持Docker

```shell
sudo docker run --name zentao -p 81:80  -v /srv/zentaopms:/www/zentaopms -v /srv/mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d easysoft/zentao:16.5
```

### 备份恢复机制



