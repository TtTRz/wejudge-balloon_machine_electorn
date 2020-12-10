import { RequestConfig } from 'umi';
import { message } from 'antd'

const ConnectTestErrorText: any = {
  "比赛信息不存在": "请检查比赛 ID 是否正确",
  "token 验证失败": '请检查比赛令牌是否正确'
}
export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
  errorHandler: (error: any) => {
    if (error.response) {
      const { data } = error
      if (data.errors) {
        message.error(`${ConnectTestErrorText[data.errors[0].message]}`)
        return { data: { status: "error" } }
      } else
        message.error(data)
    } else {
      // 请求初始化时出错或者没有响应返回的异常
      console.log(error.message);
    }
    return error.response.json()
  }
};