# spa

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 1、初始打包
```js
const PrerenderSPAPlugin = require('prerender-spa-plugin')  

new PrerenderSPAPlugin({
    // Required - The path to the webpack-outputted app to prerender.
    staticDir: path.join(__dirname, '../dist'),
    // Required - Routes to render.
    routes: ['/'],
})
```

# 2、增加路由-增加components——>page1 page2
### router.js  
```js
const HelloWorld = () =>
  import ("@/components/HelloWorld");
const page1 = () =>
  import ("@/components/page1");
const page2 = () =>
  import ("@/components/page2");

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    }
  ]
})
```
```js
const PrerenderSPAPlugin = require('prerender-spa-plugin')  

new PrerenderSPAPlugin({
    // Required - The path to the webpack-outputted app to prerender.
    staticDir: path.join(__dirname, '../dist'),
    // Required - Routes to render.
    routes: ['/','/page1'],
})
```
### 生存的page1.html和index.html内容相同
### 在路由为page2的时候，刷新，则页面报错，不显示
### 讲路由的mode更改成--history，则生成的html相对应；单身没有进行编译的page2在浏览器查看源代码时，为空
### router.js  
```js
const router = new VueRouter({
  routes,
  mode: 'history'
})
```


# 3、调整--render 
### webpack.prod.conf.js  

```js
const PrerenderSPAPlugin = require('prerender-spa-plugin')  

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer  


new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, '../dist'),
    routes: ['/','/page1'],

    renderer: new Renderer({
    inject: {
        foo: 'bar'
    },
    headless: false,
    renderAfterDocumentEvent: 'render-event'
    })
})
```


### main.js  
```js
new Vue({
    el: '#app',
    router,
    // components: { App },
    // template: '<App/>'
    render: h => h(App),
    mounted () {
      // You'll need this for renderAfterDocumentEvent.
      document.dispatchEvent(new Event('render-event'))
    }
})
```

# 备注  
1、跟上面的生存内容一致  
2、跟是否异步加载没有关系  
3、在路由为page2的时候，刷新，则页面报错，不显示

# 4、增加 created 调动ajax 请求，获取数据  
1、通过mock,可以获取到内容，源代码里面没有mock返回的数据  
2、取消mock,则在page1页面会有请求发出，404  

# 5、增加 store,同时在actions里面通过ajax获取数据  
1、通过mock,可以获取到内容，源代码里面    有mock返回的数据  
2、取消mock,则在page1页面会有请求发出，404  
