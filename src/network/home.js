import {request} from './request'

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export function getGoodsData(type, page) {
  return request({
    url:'/test/getGoods',
    params:{
      type,
      page
    }
  });
}
