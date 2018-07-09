/* eslint-disable consistent-return */
const router = require('koa-router')()

module.exports = function () {

  //接口返回数据
  const list = require('./api/list')
  router.get('/vuessr/v1/list/info', list.info); 

  return router
}
