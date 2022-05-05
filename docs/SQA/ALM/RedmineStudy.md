# Redmine配置与使用

## 背景

Redmine作为早期和JIRA驰名的ALM管理工具，并没有在JIRA商业化大踏步演进中迷失，对于小型团队来说，完全开源的Redmine也是一个不错的选择。

## 安装与配置

### 基本部署

与目前绝大多数工具不同，可能是基于Ruby on rase的原因，Redmine并没有提供默认的Docker配置手册（实际上同样框架的Gitlab的大型部署手册更为庞杂繁琐），Redmine基于数据库，一般的使用Docker compose可以协同安装，配置文件如下：

```yaml
version: '3.1'
services:
  postgres:
    image: postgres:latest
    restart: always
    networks:
      - redmine
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - 'POSTGRES_PASSWORD=password'
      - 'POSTGRES_DB=redmine'
  redmine:
    image: redmine:latest
    restart: always
    networks:
      - redmine
    volumes:
      - redmine-data:/usr/src/redmine/files
    ports:
      - 84:3000
    environment:
      - 'REDMINE_DB_POSTGRES=postgres'
      - 'REDMINE_DB_DATABASE=redmine'
      - 'REDMINE_DB_PASSWORD=password'
volumes:
  postgres-data:
  redmine-data:
networks:
  redmine:
    driver: bridge
```

然后使用简单的docker compose操作完成部署

```bash
mkdir redmine-docker
cd redmine-docker
#将上面的内容写入名为docker-compose.yml的文件
docker compose up -d
#查看进度
docker logs -f redmine
```

一切顺利的化，访问http://dockerhost:84即可开始redmine使用

> 需要注意类似de

### 插件配置

#### 看板

Redmine并未提供看板，我们可以使用[RemineUP](https://www.redmineup.com/pages/plugins/agile)插件的免费版本添加这个功能，步骤如下

- 在其网站通过邮件注册下载相应zip包并拷贝到container中
- 将其解压缩



```
{{mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
}}
```