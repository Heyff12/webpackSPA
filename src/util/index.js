//获取域名
let getDomain = val => {
  let url = location.protocol + "//" + location.hostname;
  if (location.port) {
    url += ":" + location.port;
  }
  return url;
};

// export default {
//   getDomain
// }
exports.getDomain = getDomain