import { request } from 'umi'
import { APIS } from '@/constants/apis'
import { compile } from 'path-to-regexp'

interface IConnectTest {
  contestId: number;
  token: string;
}

export const ConnectTest = (params: IConnectTest) => {
  const pattern = compile(APIS.TEST)
  return request(pattern({
    cid: params.contestId,
    token: params.token
  }), {
    method: 'get'
  })
}

interface IGetPrintList {
  contestId: string | number
  token: string
  createTime: number | string
}

export const GetPrintList = (params: IGetPrintList) => {
  console.log(params)
  const pattern = compile(APIS.PRINT_LIST)
  return request(pattern({
    cid: params.contestId,
    token: params.token
  }), {
    method: 'get',
    params: {
      create_time: params.createTime
    }
  })
}