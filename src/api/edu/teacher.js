// import request from '@/utils/request'
// // http://localhost:8110/admin/edu/teacher
// // const api_name = '/admin/edu/teacher'
//
// export default {
//   getList() {
//     return request({
//       url: 'http://localhost:8110/admin/edu/teacher',
//       method: 'get',
//     })
//   }
// }

// const api_name = '/admin/edu/teacher'

import request from '@/utils/request'
// http://localhost:8110/admin/edu/teacher
const api_name = '/admin/edu/teacher'
export default {
  getList() {
    return request({
      url: `http://localhost:8110/admin/edu/teacher?`,
      method: 'get'
    })
  },

  getPageList(page, limit, searchObj) {
    return request({
      // url: `http://localhost:8110/admin/edu/teacher/${api_name}/${page}/${limit}`,
      url: `http://localhost:8110/${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `http://localhost:8110/${api_name}/${id}`,
      method: 'delete'
    })
  },

  save(teacher) {
    return request({
      url: api_name,
      method: 'post',
      data: teacher
    })
  },

  getById(id) {
    return request({
      url: `http://localhost:8110/${api_name}/${id}`,
      method: 'get'
    })
  },

  updateById(teacher) {
    return request({
      url: `http://localhost:8110/${api_name}/${teacher.id}`,
      method: 'put',
      data: teacher
    })
  }

}
