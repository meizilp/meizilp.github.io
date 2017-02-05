# 使用Syncthing搭建私有云

通过syncthing搭建私用云同步，使用起来更方便。  

## 下载

从<https://syncthing.net/>下载对应平台的压缩包。

## Windows平台使用

### 1. 启动

1. 解压缩后双击syncthing.exe启动。
1. 会自动打开浏览器进行配置，也可以在浏览器输入<http://127.0.0.1:8384>打开配置页面。

### 2. 设备标识

1. 页面右上角【操作】->【显示ID】
1. 可以在弹出窗口中看到一串字符，这就是其它客户端连接此设备的设备标识。(后面会用到)

### 3. 添加文件夹

1. 在配置页面左侧区域找到【添加文件夹】
1. 输入文件夹标签（起个名字）
1. 输入文件夹ID（默认已经生成了一个）
1. 输入对应的本地文件夹路径（也可以点击后从下拉菜单选择）
1. 选择要共享给哪些设备
1. 【高级设置】可以修改扫描间隔稍微大一些（比如300）
1. 点击保存就生效了

### 4. 添加远程设备

1. 页面右下角【添加远程设备】
1. 输入要添加远程设备的标识(是远程设备的，不是自身的)
1. 输入设备名（给远程设备命个名）
1. 勾选【介绍人设备】（这样远程设备上已经有的设备都会添加到本机，不用一个个手工添加了）
1. 选择要与新添加的远程设备共享哪些文件夹
1. 【重要】**在远程设备上也要按照上面的步骤把本机添加上，这样远程设备才会允许本机连接**

### 4. 同步文件

1. 复制文件到共享文件夹，或者修改共享文件夹中的文件
1. 在扫描间隔到了之后就会被扫描到有修改，自动与其他在线的远程设备同步

PS:有时windows下的syncthing会挂掉，可以在要同步的时候手工启动。

## Linux 平台使用 (CentOS7)

### 1. 下载安装

```sh
wget https://github.com/syncthing/syncthing/releases/download/v0.14.11/syncthing-linux-amd64-v0.14.11.tar.gz
tar xzvf syncthing-linux-amd64-v0.14.11.tar.gz
```

### 2. 配置文件

1. 执行`./syncthing`
1. 会生成配置文件`~/.config/syncthing/config.xml`
1. 终端下没浏览器就直接修改配置文件了
    * folder节点  
        新增一个共享目录就增加一个folder节点；  
        要把某个目录共享给某个设备就把设备id加入到folder节点中。

        ```xml
        <folder id="phkgr" label="Default Folder" path="/home/mysshuser/xxx/"  
            type="readwrite" rescanIntervalS="60" ignorePerms="false" autoNormalize="true">
            <device id="XX1" introducedBy=""></device>
            <device id="XX2" introducedBy=""></device>
        </folder>
        ```

    * device节点  
        要新增一个远端设备就增加一个device节点。

        ```xml
        <device id="XX-XX" name="device name" compression="metadata"  
                introducer="true" skipIntroductionRemovals="false" introducedBy="">
            <address>dynamic</address>
        </device>
        ```

### 3. 配置为自启动服务

1. 切换到root用户
1. 在/usr/bin里面创建指向syncthing可执行文件的符号链接

    ```bash
    cd /usr/bin
    ln -s /home/xxxx/xxx/syncthing
    ```

1. 复制启动脚本到linux系统服务脚本目录

    ```bash
    cp ~/syncthing-linux-amd64-v0.14.11/etc/linux-systemd/system/syncthing@.service /etc/systemd/system/
    ```

1. 设置服务boot时启动

    ```bash
    systemctl enable syncthing@myuser.service   #myuser要替换成syncthing保存config文件的用户目录对应的用户
    ```

    PS:服务使用@传递参数给脚本可以参见：
    * <https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sect-Managing_Services_with_systemd-Unit_Files.html> Working with Instantiated Units
    * <https://wiki.archlinux.org/index.php/Systemd> Using units

1. 启动服务

    ```bash
    systemctl start syncthing@myuser.service
    ```

1. 查询服务状态

    ```bash
    systemctl status syncthing@myuser.service
    ```

## TODO 智能路由器平台使用
