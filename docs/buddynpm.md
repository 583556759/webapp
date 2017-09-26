### Buddynpm 巴迪艾斯私有npm库

#### 一.为什么使用私有npm库
>1.确保npm服务快速、稳定：对于企业来说，上线生产系统的时候，需要花半小时甚至更久等待npm模块依赖安装完毕，是不可接受的。部署镜像后，可以确保高速、稳定的npm服务。
 2.发布私有模块：官方的npm上的模块全部是开源的。一些与企业业务逻辑相关的模块可能不适合开源。这部分私有的模块放在私有NPM仓库中，使用起来各种方便。
 3.控制npm模块质量和安全：npm上的模块质量参差不齐，搭建私有仓库，可以更严格地控制模块的质量和安全，只有经过审核的模块才允许被加入私有仓库。
 
#### 二.Buddynpm官方架构

![cnpm](http://blog.fens.me/wp-content/uploads/2014/09/cnpm-architect.png)
      
#### 三.怎么使用Buddynpm
- 切换客户端默认公有npm库到私有库
```
 1.npm install -g cnpm  
 2.alias cnpm="npm --registry=http://br.buddydc.com:7001 \
 --cache=$HOME/.npm/.cache/cnpm \
 --disturl=http://br.buddydc.com:7001 \
 --userconfig=$HOME/.cnpmrc"
```
- 下载私有package
  npm install [packname] --save-dev