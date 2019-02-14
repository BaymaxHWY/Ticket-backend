import request from '@/utils/request'

export function fetchCinemaMovieList(query) {
  return request({
    url: '/movieCinema/list',
    method: 'get',
    params: query
  })
}

export function fetchAll() {
  return request({
    url: '/cinema/all',
    method: 'get'
  })
}

export function createCinemaMovie(data) {
  return request({
    url: '/movieCinema/create',
    method: 'post',
    data
  })
}

export function deleteCinemaMovie(data) {
  return request({
    url: '/movieCinema/delete',
    method: 'post',
    data
  })
}

export function updateCinemaMovie(data) {
  return request({
    url: '/movieCinema/update',
    method: 'post',
    data
  })
}
