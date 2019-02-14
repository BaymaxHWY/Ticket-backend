import request from '@/utils/request'

export function fetchCinemaList(query) {
  return request({
    url: '/cinema/list',
    method: 'get',
    params: query
  })
}

export function fetchCinemaAll() {
  return request({
    url: '/cinema/all',
    method: 'get'
  })
}

export function createCinema(data) {
  return request({
    url: '/cinema/create',
    method: 'post',
    data
  })
}

export function deleteCinema(data) {
  return request({
    url: '/cinema/delete',
    method: 'post',
    data
  })
}

export function updateCinema(data) {
  return request({
    url: '/cinema/update',
    method: 'post',
    data
  })
}
