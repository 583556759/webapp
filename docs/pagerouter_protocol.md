### 前端页面跳转协议（PageRouter Protocol）

规范App各平台（H5、Android、iOS）页面间跳转过程，同时保留足够的跳转灵活性。

#### 1. 协议目标

- a. 支持`Native`、`Web`界面间的互相跳转。
- b. `同一`被调用页面支持`无限制`跳转来源，即界面显示逻辑不依赖于跳转来源，只依赖于输入参数。
- c. `协议内容跨平台`，方面服务器端控制客户端跳转行为。此目标主要用于实现`广告位`、`系统消息`等点击跳转行为多变的场景。
- d. 所有页面跳转都支持，所有页面跳转都可以通过该协议实现跳转。

#### 2. 协议本质

该协议的本质是将每一个页面都抽象为一个可调用`接口`，一个接口需要提供给主动调用方（来源）一个调用规则（界面ID，输入参数）。只要符合调用规则的调用请求都是合法的。

- 不同平台同一界面的ID是一样的，但在不同平台中对应的界面实现不一样。比如用户界面“我”:
  
  ```
  ID: user.home
  在Android中：对应一个类
  在iOS中：对应一个类
  在web中：对应一个网页地址
  ```
- 不同平台的参数传输通道不一样，但参数名称和参数值可以统一。
  比如web使用Url参数传值

#### 3. 协议设计

- 角色关系

    ```
    调用源页面（SourcePage）    ---->   PageRouter    ---->   被调用页面（TargetPage）
                                                           |
                                        <----（可选返回）----|
    ```

- 角色定义

    ```
       页面：一个可刷新的区域
    1. 调用源页面（SourcePage）：调用来源
    2. 被调用页面（TargetPage）：被调用页面，具有以下属性
           - pageid: [string]页面ID：
           - pagetype: [string]页面类型：
               web: 网页
               native: 原生
           - pageparams: [string]该页面被刷新时需要的参数，格式是`字典类型json`字符串，有以下公共通用参数：			
           - returnsource: [string]可选，`字典类型json`字符串，包含调用源界面时所需的四个参数。returnsoruce一般由调用源界面添加。
               默认不用添加,直接返回调用界面（web端利用window.location.go(-1)）
    3. PageRouter：页面跳转路由器，根据pageid,pagetype确定被调用页面，带着pageparams参数启动调用。
        
    
    ```

#### 4. 场景举例

- 首页广告位跳转到不同页面，每个广告点击后需要的跳转都可能不一样。广告信息一般都由服务器返回，通过返回参数pagerouter={pageid:'', pagetype:'', pageparams:''}实现服务器对客户端跳转的控制。
- 系统消息，系统消息类型很多。如某人关注了你，点击消息后跳转到该人主页；如官方发布了活动，点击后跳转到活动主页；如您的订单已被确认发货，点击后跳转到该订单详情等。通过每条消息返回的pageaction={pageid:'', pagetype:'', pageparams:''}实现点击消息跳转的控制。

#### 5.web端实现

- 需要实现功能

    ```
    1.页面属性定义(实现对页面基本信息的统一管理),每个页面的属性信息包括:
        - pageid    : [string]页面ID：
        - pageType  : [string]页面类型：
            web: 网页
            native: 原生
        - pageTitle : [string]页面标题
        - pageHash  : [string]页面hash,需要包含所在html文件,如index.heml#/business
        - pageParams : [String] 页面所需参数,只是参数名,可以用来检测跳转过程中传递参数是否齐全
    2.PageRouter:
      基于reactRouter实现,利用hash值跳转,这里所说的pageRouter是对页面进行统跳管理,如下:
      
      
                                  --------   
                 page request    |        |  -------->page1
                 ------------->  |  Page  |  -------->page2
                                 | Router |  -------->page3
                                 |        |  -------->page5
                                  --------
      所有页面跳转请求经过PageRouter统一管理,通过pageid分发到不同页面, 请求过程中传递页面所需参数,             
      
    ```
