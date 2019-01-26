# vue-smile-shop
## 技术栈
* vue全家桶+koa2+vant
## vant 配置按需加载
`在.babelrc中配置plugins`
## 移动端适配
* 以iphone5为基准:  在iphone5下根标签的字体大小为16px, 刚好等于1rem
```$xslt
const domcumentWidth = document.documentElement.clientWidth || document.body.clientWidth(做兼容处理)
const htmlDom = document.getElementByTagName('html')[0] // 获取根标签字体大小
htmlDom.style.fontSize = documentWidth / 20 + 'px'      // iphone5 下320px 刚好等于20rem
另外: 在meta标签上加上 --- <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
```


## 项目中遇到的问题
1. 在使用三层循环的时候会报错, 导致页面加载不出来, 可以在上面用v-if进行判断
2.  *报错:* E11000 duplicate key error collection: smile-db.user index: userName_1 dup key: { : null }
```$xslt
  在集合里面定义了唯一值, 但是前端传递的是时候参数和集合参数不一致,导致报错
```
3. 在koa入口, 会初始化连接和数据库和引入用到的所有schema, 但是将数据库连接会不执行下面的映入语句
4. 安装bcrypt的时候一直报错,   解决办法就是安装指定版本
* 解决: 改变他们的执行顺序
## 代办
1. axios封装
2. 首页缓存
3. 首页加入高德地图

## 后续优化
1. 预检请求的处理

