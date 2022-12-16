/*
 * @Description: 
 * @Version: 1.0
 * @Autor: solid
 * @Date: 2022-12-13 18:48:41
 * @LastEditors: solid
 * @LastEditTime: 2022-12-16 19:03:02
 */
import request from '@/utils/request'
import request_upload from '@/utils/request-upload'

export function reqFileList(fileType) {
  let params = {
    'fileType': fileType
  }
  return request({
    url: '/upload/fileList',
    params: params,
    method: 'get'
  })
}


// 文件上传url地址
export function fileUpload(fileType) {
  return `${process.env.VUE_APP_BASE_API}/upload/fileUpload?fileType=${fileType}`
}

export function reqFileDelete(fileName,fileType) {
  let params = {
    'fileName': fileName,
    'fileType': fileType
  }
  return request({
    url: '/upload/deleteFile',
    params: params,
    method: 'delete'
  })
}


export function reqFileImport(fileName,fileType) {
  let params = {
    'fileName': fileName,
    'fileType': fileType
  }
  return request_upload({
    url: '/fileLoad',
    params: params,
    method: 'get'
  })
}



//一键导入
export function postFileloadlist(data) {
  return request({
      url: '/fileLoadList',
      method: 'post',
      data
  })
}
export function getRelationship(params) {
  return request({
      url: '/basics/relationship',
      method: 'get',
      params
  })
}