import request from '@/utils/request'

export function login(parms) {
  return request({
    url: '/api/admin/auth',
    method: 'post',
    params: parms
  })
}

export function order(parms = {}) {
  return request({
    url: '/api/shop_zr/get',
    method: 'get',
    params: parms
  })
}


export function addOrder(parms) {
  return request({
    url: '/api/shop_zr/insert',
    method: 'post',
    params: parms
  })
}

export function removeOrder(parms = {}) {
  return request({
    url: '/api/shop_zr/delete',
    method: 'get',
    params: parms
  })
}

export function updateOrder(parms) {
  return request({
    url: '/api/shop_zr/update',
    method: 'post',
    params: parms
  })
}

export function getTeacherFilter() {
  return request({
    url: 'api/jl/get',
    method: 'get'
  })
}

export function getTeacher(parms) {
  return request({
    url: '/api/business/get',
    method: 'get',
    params: parms
  })
}

export function addTeacher(parms) {
  return request({
    url: '/api/business/insert',
    method: 'post',
    params: parms
  })
}

export function updateTeacher(parms) {
  return request({
    url: '/api/business/update',
    method: 'post',
    params: parms
  })
}

export function removeTeacher(parms) {
  return request({
    url: `/api/business/delete`,
    method: 'get',
    params: parms
  })
}

export function course() {
  return request({
    url: `/api/setting/get`,
    method: 'get'
  })
}

export function addCourse(parms) {
  return request({
    url: `/api/course/insert`,
    method: 'post',
    params: parms
  })
}

export function updateCourse(parms) {
  return request({
    url: `/api/setting/update`,
    method: 'post',
    params: parms
  })
}

export function removeCourse(parms) {
  return request({
    url: `api/course/delete?id=${parms}`,
    method: 'get'
  })
}

export function addShop(parms) {
  return request({
    url: `/api/shop_qz/insert`,
    method: 'post',
    params: parms
  })
}

export function updateShop(parms) {
  return request({
    url: `/api/shop_qz/update`,
    method: 'post',
    params: parms
  })
}

export function shop(params) {
  return request({
    url: `/api/shop_qz/get`,
    method: 'get',
    params: params
  })
}

export function removeShop(params) {
  return request({
    url: `/api/shop_qz/delete`,
    method: 'get',
    params: params
  })
}

export function carousel(params) {
  return request({
    url: `/api/carousel/get`,
    method: 'get',
    params: params
  })
}

export function uploadCarousel(parms) {
  console.log(parms)
  return request({
    url: `/api/carousel/insert`,
    method: 'post',
    params: parms
  })
}

export function updateCarousel(parms) {
  return request({
    url: `api/carousel/update`,
    method: 'post',
    params: parms
  })
}

export function removeCarousel(params) {
  return request({
    url: `/api/carousel/delete`,
    method: 'get',
    params: params
  })
}
