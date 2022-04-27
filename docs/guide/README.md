## 基础设施

### 选型

对于1k以下的规模，并不需要进行多节点部署，可以直接使用Docker单容器方案，规避了复杂度带来的可靠性下降的问题，实际可以通过快速恢复解决可用性忧虑

> 多节点部署涉及Gitaly集群及其背后的对象存储，HTTP均衡负载等等话题复杂度较高
相关性能和可用性可以参考[https://docs.gitlab.com/ee/administration/reference\_architectures/1k\_users.html](https://docs.gitlab.com/ee/administration/reference\_architectures/1k\_users.html)

### 部署

#### 环境准备

安装简单的Docker非常容易，请参考[https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

> 为了加快速度推荐使用Docker镜像或为其设置http代理
>
> 如果是在Window本机搭建测试环境，可以选择docker desktop版本，结合WSL2也非常方便。
>
> 建议选择Ubuntu+Windows terminal+Oh My Zsh作为终端，后者提供了Docker插件使用方便快捷
不妨安装Portainer和作为Docker可视化管理界面，它同时提供了基本的监控功能省去了配置prometheus的麻烦。

```bash
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always \
           -v /var/run/docker.sock:/var/run/docker.sock \ 
           -v portainer_data:/data portainer/portainer-ce:2.11.1
```

![](<.gitbook/assets/image (13).png>)

#### GitLab安装

GitLab单容器部署极为简单，可以直接使用引擎命令或者Compose [https://docs.gitlab.com/ee/install/docker.html#install-gitlab-using-docker-engine](https://docs.gitlab.com/ee/install/docker.html#install-gitlab-using-docker-engine)

```bash
sudo #基本安装
docker run --detach
--hostname gitlab.example.com
--publish 443:443 --publish 80:80 --publish 22:22
--name gitlab
--restart always
--volume $GITLAB_HOME/config:/etc/gitlab
--volume $GITLAB_HOME/logs:/var/log/gitlab
--volume $GITLAB_HOME/data:/var/opt/gitlab
--shm-size 256m
gitlab/gitlab-ee:latest
##日志
sudo docker logs -f gitlab
##密码
sudo docker exec -it gitlab grep 'Password:' /etc/gitlab/initial_root_password
```

#### 网络相关

一般的使用docker engine的端口映射即可解决外部网络访问，如果需要暴露docker私有IP则可以尝试在全局路由表中增加条目

```bash
##Windows：route add -p 172.17.0.0 mask 255.255.0.0 192.168.1.7
ip route add 172.17.0.0/16 via 192.168.1.7
```

> rootless会干扰Ping
>
> [https://docs.docker.com/engine/security/rootless/](https://docs.docker.com/engine/security/rootless/)
>
> 如果使用Docker Desktop也会干扰Ping
>
> 可能需要进一步更改host的NAT配置，请参考[https://blog.csdn.net/lvshaorong/article/details/69950694](https://blog.csdn.net/lvshaorong/article/details/69950694)
#### 改变URL

[https://docs.gitlab.com/omnibus/settings/configuration.html](https://docs.gitlab.com/omnibus/settings/configuration.html)

### 备份恢复

#### 备份

GitLab自带备份机制，支持热备份和增量备份，在docker单container的情况下较为简单

```bash
##全备份
docker exebas <container name> gitlab-backup create
##增量备份
docker exebas <container name> gitlab-backup create INCREMENTAL=yes
```

备份存档保存在文件backup\_path中指定的 中 config/gitlab.yml。文件名是\[TIMESTAMP]\_gitlab\_backup.tar，其中TIMESTAMP标识每个备份的创建时间，加上 GitLab 版本。如果您需要恢复 GitLab 并且有多个备份可用，则需要时间戳。

例如，如果备份名称为1493107454\_2018\_04\_25\_10.6.4-ce\_gitlab\_backup.tar，则时间戳为1493107454\_2018\_04\_25\_10.6.4-ce。

**同时需要注意，从安全角度考虑该机制没有备份config文件夹数据，需要额外手动进行备份**

GitLab同时支持旧文件删除，后者需要配置/etc/gitlab/gitlab.rb

```ruby
gitlab_rails['backup_archive_permissions'] = 0644 # Makes the backup archives world-readable
```

#### 恢复

在准备了同样的环境后，首先需要手工恢复config相关文件，至少需要恢复/etc/gitlab/gitlab-secrets.json 和/etc/gitlab/gitlab.rb，之后使用GitLab恢复命令即可恢复

```bash
## Stop the processes that are connected to the database
docker exec -it <name of container> gitlab-ctl stop puma
docker exec -it <name of container> gitlab-ctl stop sidekiq
## Verify that the processes are all down before continuing
docker exec -it <name of container> gitlab-ctl status
## Run the restore. NOTE: "_gitlab_backup.tar" is omitted from the name
docker exec -it <name of container> gitlab-backup restore BACKUP=11493107454_2018_04_25_10.6.4-ce
## Restart the GitLab container
docker restart <name of container>
## Check GitLab
docker exec -it <name of container> gitlab-rake gitlab:check SANITIZE=true
```

\
