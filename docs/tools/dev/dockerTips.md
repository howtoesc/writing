# docker 小技巧

针对运维小白的一些 docker 小技巧

## 暴露私有 IP

一般的使用 docker engine 的端口映射即可解决外部网络访问，如果需要暴露 docker 私有 IP 则可以尝试在全局路由表中增加条目

```bash
##Windows：route add -p 172.17.0.0 mask 255.255.0.0 192.168.1.7
ip route add 172.17.0.0/16 via 192.168.1.7
```

> rootless 会干扰 Ping
>
> [https://docs.docker.com/engine/security/rootless/](https://docs.docker.com/engine/security/rootless/)
>
> 如果使用 Docker Desktop 也会干扰 Ping
>
> 可能需要进一步更改 host 的 NAT 配置，请参考[https://blog.csdn.net/lvshaorong/article/details/69950694](https://blog.csdn.net/lvshaorong/article/details/69950694)

## 远程 Docker

由于 Docker 本地命令必须使用 sudo，zsh 排不上用场，不妨使用远程命令操纵 docker，一举两得

- host 配置，详见[Daemon socket option](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-optionhttps://docs.docker.com/engine/reference/commandline/dockerd/#daemon-socket-option)，具体配置如下

  - ```diff
    +++ /lib/systemd/system/docker.service  2022-05-04 22:07:52.513494783 +0800
    @@ -10,7 +10,7 @@
     # the default is not to use systemd for cgroups because the delegate issues still
     # exists and systemd currently does not support the cgroup feature set required
     # for containers run by docker
    -ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
    +ExecStart=/usr/bin/dockerd -H fd:// -H unix:// -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock
     ExecReload=/bin/kill -s HUP $MAINPID
     TimeoutSec=0
     RestartSec=2
    ```

- 在客户端配置环境变量 export DOCKER_HOST="192.168.1.7:2375"或使用参数 docker -H tcp://0.0.0.0:2375 ps 即可使用

  - ```bash
    ~/sandbox ❯ export DOCKER_HOST="192.168.1.7:2375"
    ~/sandbox ❯ docker ps --format "table {{.ID}}\t{{.Names}}"
    CONTAINER ID   NAMES
    1fed35e1420e   redmine-postgres-1
    b27f2e993ade   redmine-redmine-1
    2d34e76ae74f   tuleap-community-edition-web-1
    dfdc4c043fbb   laughing_yonath
    d06b21632d95   portainer
    55907dc1a0fb   zentao
    6da20d3e8d1b   metabase
    d84bb799b20a   gitlab
    ```

> 请注意以上两种配置仅仅用于个人测试环境，生产环境请配置相应安全密钥和权限

## docker format 参数

docker container ls 类似命令输出由于端口映射显示，往往折行，不忍直视，不妨使用--formate 参数，相关字段见于 man，go template 见于https://pkg.go.dev/text/template

```bash
❯ docker ps --format "table {{.ID}}\t{{.Names}}"
CONTAINER ID   NAMES
1fed35e1420e   redmine-postgres-1
b27f2e993ade   redmine-redmine-1
2d34e76ae74f   tuleap-community-edition-web-1
dfdc4c043fbb   laughing_yonath
d06b21632d95   portainer
55907dc1a0fb   zentao
6da20d3e8d1b   metabase
d84bb799b20a   gitlab
❯man docker-container-ls
DOCKER(1)                            Docker User Manuals                           DOCKER(1)

NAME
       docker-container-ls - List containers

SYNOPSIS
       docker container ls [OPTIONS]

.........

       Valid placeholders for the Go template are listed below:
          - .ID           - Container ID.
          - .Image        - Image ID.
          - .Command      - Quoted command.
          - .CreatedAt    - Time when the container was created.
          - .RunningFor   - Elapsed time since the container was started.
          - .Ports        - Exposed ports.
          - .Status       - Container status.
          - .Size         - Container disk size.
          - .Names        - Container names.
          - .Labels       - All labels assigned to the container.
          - .Label        - Value of a specific label for this container.
                            For example '{{.Label "com.docker.swarm.cpu"}}'.
          - .Mounts       - Names of the volumes mounted in this container.
          - .Networks     - Names of the networks attached to this container.

.........
```

## Web Admin

增加一点 UI 元素对 host 和 docker 进行管理，尤其可以进行性能相关的监控

### Portainer

安装方式如下，安装后打开 https://localhost:9443 即可

```bash
docker volume create portainer_data
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:2.11.1
docker logs -f portainer
```

### Cockpit

[Cockpit](https://cockpit-project.org/)是 RHEL 的自带

## 各种仓库的 HTTP 代理设置

首先需要保证 http 代理是可以使用的，即 xxx:7890 已经开放并好用

### 默认环境变量

```bash
export HTTP_PROXY=http://192.168.1.16:7890
export HTTPS_PROXY=http://192.168.1.16:7890
unset HTTP_PROXY HTTPS_PROXY
```

### APT

```bash
sudo echo "Acquire::https::Proxy \"${HTTP_PROXY}\";" >> /etc/apt/apt.conf.d/proxy.conf
sudo echo "Acquire::https::Proxy \"${HTTP_PROXY}\";" >> /etc/apt/apt.conf.d/proxy.conf
```

### Git

```bash
git config --global http.proxy ${HTTP_PROXY}
git config --global https.proxy ${HTTP_PROXY}
git config --global --unset http.proxy https.proxy
```

### npm/yarn

```bash
npm config set proxy ${HTTP_PROXY}
npm config set https-proxy ${HTTPS_PROXY}
yarn config set httpProxy ${HTTP_PROXY}
yarn config set httspProxy ${HTTPS_PROXY}
```

## 裸实例 apt 初始化

很多时候生产实例什么都没有，需要首先初始化 apt
