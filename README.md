This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## 这是一个利用creat-react-app脚手架创建的project

### 由于工作中经常遇到时间转换的问题，遂这里进行了一些方法的总结和转换，以备不时之需，引擎一般给我们日期的格式是这样的: `"/Date(-62135596800000-0000)/"` 这里在utils文件夹下进行了时间转换的各种方法，也借用了moment组件，那么，让我们开始吧！ 

#### 北京时间 = UTC时间 + 8h

> 简单的安装使用
1. npm install -g create-react-app

> 装完之后，生成一个新的项目，可以使用下面的命令:
1. create-react-app [project-name]
2. cd [project-name]

> 创建了[project-name]目录，这个时候，使用下面的命令就可以开始开发应用了。
1. npm start 

> 默认情况下，会在开发环境下启动一个服务器，监听在3000端口，它会主动给你打开浏览器的，可以立刻就看到这个app的效果。

> 源码结构简单清晰

- 所有的源码你将放到src目录下，什么配置文件，各种乱七八糟都不用管，你只需要专注开发就好了，create-react-app都给你处理好了。整个源码简单，又小又清爽！管理起来也方便！

- 如果你使用过webpack-dev-server或webpack搭建过开发环境，你就会发现，create-react-app的开发环境也有类似webpack-dev-server的--inline --hot自动刷新的功能。

#### 什么意思呢？

- 就是一旦源码文件，一更新，再保存之后，浏览器会自动刷新，让你能实时查看效果。

- 你总要探究一下是怎么回事，难道create-react-app也用上了webpack-dev-server?

- 翻看了一下源码，没有找到webpack.config.js文件，如果有使用webpack就应该有这个文件，好奇怪。

- 看了一下node_modules目录，也没找到webpack相关的东西。

- 先源头入手，我是用npm start命令来运行项目的。

- 就从package.json文件入手，它的内容里看到了`"start": "react-scripts start"`

#### react-scripts又是什么？

- 在node_modules目录中能找到它，它果然依赖了好多工具，其中就包括'webpack'。里面果然也有webpack的配置文件，也有好多脚本文件。

> 线上编译命令

- 这个是create-react-app的一个大亮点，它能让你的应用骗译出在线上生产环境运行的代码，编译出来的文件很小，且文件名还带hash值，方便我们做cache，而且它还提供一个服务器，让我们在本地也能看到线上生产环境类似的效果，真的超级方便。
1.只需一行命令：`npm run build`


> 上传github

1. 本地创建一个文件夹

2. git init   

3. git add .

4. git commit -m 'xxx'

5. 创建SSH KEY   这个自行百度,此处省略

6. 登录github，找到Settings 进行账号关联

7. github上创建一个git仓库

8. 在Github上创建好Git仓库之后我们就可以和本地仓库进行关联了，根据创建好的Git仓库页面的提示，可以在本地TEST仓库的命令行输入：`git remote add origin https://github.com/acmwln/timeFormat.git`

9. 关联好之后我们就可以把本地库的所有内容推送到远程仓库（也就是Github）上了，通过：
`git push -u origin master` [^_^]:由于新建的远程仓库是空的，所以要加上-u这个参数，等远程仓库里面有了内容之后，下次再从本地库上传内容的时候只需下面这样就可以了： `git push origin master`

10. 如果是自己新建的分支，先把此分支和远程仓库连接，也就是推送到远程仓库，
`git push --set-upstream origin topic_wln  `



暂时到这，有啥问题欢迎指正哈，共同进步，本来这次想自己搭个react全家桶，实现react-redux的配置，觉得这个小demo没必要，其实。。。。这个项目已经配了react-redux文件夹，框架已搭好，只是运行还没好，待下次更新~~~


