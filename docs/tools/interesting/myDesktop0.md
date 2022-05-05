# ThinkPad X1配置笔记

## 背景

非常阴差阳错的情况下因为工作原因购买了ThinkPad X1 Nano，多年之后告别macOS重回Window怀抱，除了本子意外的比MacBook更轻更塑料很匹配中年图吧人设外，在命令行工具、Markdown写作以及浏览器上都可以达到基本无障碍键盘使用，也足够堪用了

吃饭的家伙什兼具好用、好玩儿和唬人多重需求，所以反复折腾出以下结果，当然特别感谢老婆给予如此多的 :dollar: 支持

![Lenovo ThinkPad X1 Nano ultrabook review (Core i7, 16:10 matte screen)](../lenovo-thinkpad-x1-caron-main.jpg)

## 主要软硬件工具

作为业余开发、伪极客精神爱好者使用的工具其实并不多，大致有

- 终端相关

  - Windows 11/WSL2/Ubuntu 20
  - Docker Desktop
  - Windows Terminal
  - zsh/oh-my-zsh
  - zsh/oh-my-tmux
  - nvim

- 浏览、写作和办公

  - Webchat/WeCom
  - Chrome
  - VuePress
  - Typora
  - Office 365
  - Power Toy
  - Github

- 开发相关

  - JetBrains
  - VS Code

- 硬件设备

  - HHKB perfessional 2
  - ThinkPad USB-C Dock Gen 2
  - HP Z22n G2*2

- 关联设备

  - Ryzen 3/16GB Ubuntu docker host

  - iPad Pro
  - iPhone XR

## 终端相关

### 方案选择

Windows终端问题由来已久，备选解决方案无外乎

- 独立终端如putty、Xshell搭配真正的Linux/Unit环境，问题在于
  - 内建虚拟机如vmare、virtualmachine或hyperV+在性能上较为狼狈 而优势即测试系统随着自己移动，当然前提是公司没有机器（可能性较低）或者没有VPN（后一清时代可能性也变低）的情况下才具有价值
  - 外部虚拟甚至实体机除了可能有令人不愉快的延迟问题外，把一系列人机工具链部署到非自己本机似乎也不合情理
- POSIX 兼容环境，如Cygwin和Mingw，当然也包括cmder和git bash，但实践表明在于兼容环境深深浅浅的腻子层会和真正的Linux工具链冲突

Windows WSL历经多次升级，基本稳定，搭配微软自己的Windows Terminal较为妥善，一些劣势有

- WLS升级配置猥琐，错误比比皆是，随着Windows 11的出现这个问题得到有效解决
  - 实际基于WLS2 的Hyper-V仍然较为繁琐，不建议轻易尝试
- Windows Terminal和老牌终端比，功能略有欠缺，如不支持lrzsz，剪贴板处理也可以进一步优化，但借本合格

### 基本安装配置

新版本较为简单，详见https://docs.microsoft.com/zh-cn/windows/wsl/install

