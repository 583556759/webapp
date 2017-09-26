## Require webpack & React

### 菜鸟们，先来了解点“来龙去脉”的基础
```
- 菜鸟们，先来了解点“来龙去脉”
  这里打包运营需要一个完整的nodejs打包环境。
  - nodejs是一个javascript运行环境，简称node, 是用js来开发后端服务器程序的。
  - npm (node package manager) 是用来管理node不同依赖包之间的关系，以及打包工作。
    使用javascript开发的应用程序，不管有多少文件，都会被打包（压缩）成一个可以在nodejs环境中运行的js文件。
   （就像C语言、Java语言一样，都会被编译成一个可执行二进制文件）
  - Reactjs 是一个前端UI库，一定要记住，仅仅是一个UI库。
    是将js与html标签合并的一种混合写法，将界面元素组件化，方便重用，提高可维护性。

- 我们现在在哪儿？
  我们用的React是一个UI库，但本质上还是js，通过js生成界面html元素。
  既然React依然是js，那么就可以用npm来打包，将很多的js、css等打包成一个js文件。
  这个打包压缩后的js文件，下载到客户端浏览器就可以执行。也就是我们的App了。

- 运行环境（nodejs打包运行环境）, 安装一下程序，以ubuntu为例。（mac os, 可以使用homebrew工具）
  apt-get install node
  apt-get install npm 
  
  补充点homebrew的安装和使用（大家都用mac嘛！）
  其实，打开官网主页，就一目了然了：http://brew.sh/

- npm 几个命令（都在项目根目录下运行，权限不够时，需要sudo）
  - npm init 初始化项目描述(项目名字，包依赖，打包、版权等)，即package.json
  - npm install 在本项目目录创建“node_modules”，用于下载本项目依赖的包，仅限于本项目使用；
    如果加上 -g 参数，则创建全局依赖，一般不用。

- 不想当菜鸟?! 你需要补补课了
  webpack学习文档: 
    1. 'https://fakefish.github.io/react-webpack-cookbook/'
    2. 'http://webpack.github.io/docs/cli.html'
  React学习资料:
    1. 'http://reactjs.cn/'                 React中文文档 （0.13.0）
    2.更多: 'https://github.com/dingyiming/learn-Js-react/issues/1?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io'
  
```

### 初始化项目

```
1、clone项目到本地或者部署目录

2、cd /<YourWorkspace>/buddyreact  

3、初始化项目，如果已经存在package.json，则可以跳过
  npm init   

4、下载包依赖
  npm install  
```
### 关于项目目录结构
```
-buddyReact
 --assets                       项目发布时的输出目录
  ---[hash]                     里面是最终要发布的js文件
  ---img                        发布目录所需的图片文件
  ---wechat                     微信认证服务器的文件
  ---index.html                 用户的入口页面
 
 --dev                          项目开发时的输出目录
 --docs                         模块说明文档
 --lib                          项目所需的依赖文件(不方便用node安装的依赖)
 --node_modules                 项目所需的依赖库,package.json中配置,node安装,文件比较大在.gitignore中过滤掉
 
 --src                          未打包的源文件目录
  ---css                        各模块所需的CSS文件
  ---fonts                      项目所需的字体文件
  ---icon                       项目所需的图标文件
  ---img                        项目所需的图片文件
  ---js                         js文件,核心原文件,所有的模块和页面都在这里
   ----components               自定义组件
   ----functions                公用函数和类,包括xdock,xuser等
   ----pages                    页面文件
   ----*.js                     项目的几个主页面
  ---util                       项目所需的工具类,url,加密,输入校验等相关函数
  
 --配置文件
  ---.gitignore                 git过滤文件的配置文件
  ---package.json               项目依赖库的配置文件
  ---webpack.config.js          开发时webpack所需的配置文件
  ---webpack.production.config.js 发布时webpack所需的配置文件
 
```
### 关于开发环境和发布环境

### 开发环境执行

```
开发过程中执行
npm run dev 

命令解析:
1. 此命令在内存中生成一个live.bundle.js(没有在输出目录下生成bundle.js),支持react组件的热更新,非常炫,
   当组件更新后,保存编辑器里的代码后,系统会自动把更新的部分合并到live.bundle.js,并立即呈现到页面,
   你只需专注开发就好,不用每次打包bundle.js,然后再去刷新浏览器
2. 此命令执行的是开发过程中用的配置文件: webpack.config.js
3. 此命令其实是在package.json 里面配置的一条简化命令 当输入 npm run dev 时,其实执行的是以下命令 
   "webpack-dev-server --devtool eval --progress --colors --hot --content-base assets"
   了解更多请移步:"https://fakefish.github.io/react-webpack-cookbook/Running-a-workflow.html"


打开命令行中输出的本地访问地址：

输出样例：
~/Workspace/git-buddyx/buddyx/buddyreact(branch:master*) » npm run dev                                                                                                                                                                                            

> buddy@1.0.0 dev /Users/lifachang/Workspace/git-buddyx/buddyx/buddyreact
> webpack-dev-server --devtool eval --progress --colors --hot --content-base dev

 70% 1/1 build moduleshttp://localhost:8080/webpack-dev-server/
webpack result is served from /dev/
content is served from /Users/lifachang/Workspace/git-buddyx/buddyx/buddyreact/dev
Hash: 9836eee11396aada0674
Version: webpack 1.12.12
Time: 3138ms
    Asset    Size  Chunks             Chunk Names
bundle.js  976 kB       0  [emitted]  main
chunk    {0} bundle.js (main) 873 kB [rendered]
    [0] multi main 52 bytes {0} [built]
    [1] (webpack)/hot/dev-server.js 1.85 kB {0} [built]
	 ...
	 ...


在浏览器中访问：http://localhost:8080/webpack-dev-server/ 即可查看页面

注意:如果没有页面,可能是本地没有数据,输入以下地址先登录同步一下数据:http://localhost:8080/webpack-dev-server/#/login

```


### 关于利用hash值强制客户端刷新
```
1.为什么要强制客户端刷新
   项目的所有内容最后都会打包在一个js文件里,即本项目的是一个单页面的前端工程,
   在微信公众号中可以利用微信的缓存来给用户带来比较好的体验(除了首次加载),
   但是微信缓存同时会带来服务器发布新的js文件后客户端没有更新的问题,这样用户不能实时看到页面的变化
2.强制刷新的实现
  在打包bundle.js时给文件名加上该文件的hash值,最后生成的是bundle.[hash].js,例如:bundle.95c83c8aa4c62529c069.js
  由于文件的改变一定会导致hash值的改变,所以每次bundle.[hash].js的名字都不一样
  发布到服务器之前修改index.html中引入js的路径和文件名 src='./[hash]/bundle.[hash].js'(后面做到自动修改)
  发布到服务器后客户端的index.html中的js文件会改变,会从服务重新拉取最新的bundle.[hash].js文件,也就可以做到服务器和客户端界面同步了
```
### 服务器一键发布

```
生产环境:
1.登录服务器
2.cd /home/wwwroot/default/buddyreact                    //服务器上代码目录,以后可能会变
3.python deploy.py

开发线上测试环境:
1.登录服务器
2.cd /home/wwwroot/default/dev/buddyreact                 //服务器上代码目录,以后可能会变
3.python deploy_dev.py

一键发布都干了什么:
1.git stash             //保存服务器本地代码,由于每次发布服务器会生成新文件,又不能提交到git仓库,不保存不能pull新代码
2.git pull origin develop(测试环境)/master（生产环境)
3.npm install            //安装新加入的依赖库
4.备份旧的js文件
5.npm run deploy         //打包生成新的JS文件
6.生成新的index.html
```


