import request from '@/utils/request'

export function fetchMovieList(query) {
  return request({
    url: '/movie/list',
    method: 'get',
    params: query
  })
}

export function fetchMovieAll() {
  return request({
    url: '/movie/all',
    method: 'get'
  })
}

export function createMovie(data) {
  return request({
    url: '/movie/create',
    method: 'post',
    data
  })
}

export function deleteMovie(data) {
  return request({
    url: '/movie/delete',
    method: 'post',
    data
  })
}

export function updateMovie(data) {
  return request({
    url: '/movie/update',
    method: 'post',
    data
  })
}
