# element-ui简单版后台管理平台

## 前言

可能很多初级前端开发者在开发一个基于element-ui的后台管理平台时,会找到很多很多这种模板,虽然网上很多,但是功能却特别特别多,有些人可能需要但是像我这样的就很喜欢那种简单的模板,或者只需要它的登录啊,菜单就行了,其他七七八八功能都不需要,如果去改别人的模板呢,你就会发现感觉很多东西都不能删,一删程序可能就跑不起来了,这就有点头大了,或者已经在使用别人模板的初级前端开发者,可能会发现很多包啊,或者库啊都没有用到,虽然打包的时候会自动过滤掉那些未被使用的包或者库,但是有强迫症的人看着就可能很不舒服,所以我就基于那些网上高星后台模板进行断舍离,保留出登录界面和菜单一块,其他未被使用的包啊,库啊统统删除,打造出一个相对纯净的element-ui后台管理平台

## 使用

```shell
yarn
//启动服务
yarn serve
//打包
yarn build
```

## 功能

- 登录/注销
- 登录校验
- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 自适应收缩侧边栏

## 项目截图

![list](https://raw.githubusercontent.com/OblivionTime/vue-element-admin-template-simple/main/assets/login.png)

![list](https://raw.githubusercontent.com/OblivionTime/vue-element-admin-template-simple/main/assets/index.png)

![list](https://raw.githubusercontent.com/OblivionTime/vue-element-admin-template-simple/main/assets/list.png)
