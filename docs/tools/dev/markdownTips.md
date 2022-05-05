# Markdonw 小技巧

## 使用diff表达式标示文档改进

```diff
@@ -10,7 +10,7 @@
 # the default is not to use systemd for cgroups because the delegate issues still
 # exists and systemd currently does not support the cgroup feature set required
 # for containers run by docker
-ExecStart=/usr/bin/dockerd -H fd:// -H unix:// -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock
+ExecStart=/usr/bin/dockerd -H fd:// -H unix:// --containerd=/run/containerd/containerd.sock
 ExecReload=/bin/kill -s HUP $MAINPID
 TimeoutSec=0
 RestartSec=2

```

