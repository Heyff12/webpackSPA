import axios from "axios";
import {
  getDomain
} from "../util"
let baseUrl = getDomain();
//url必须写完整
let url = {
  listUrl: baseUrl + "/vuessr/v1/list/info"
};
export function fetchList() {
  return axios.get(url.listUrl)
    .then((response) => {
      console.log(response);
      let data_return = response.data;
      if (data_return.respcd == "0000") {
        return data_return.data;
      } else {
        if (data_return.respmsg) {
          alert(data_return.respmsg);
        } else {
          alert(data_return.resperr);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
