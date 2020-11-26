import {request} from './request'

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

// export function getGoodsData(type, page) {
//   return request({
//     url:'/test/getGoods',
//     params:{
//       type,
//       page
//     }
//   });
// }
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
} 