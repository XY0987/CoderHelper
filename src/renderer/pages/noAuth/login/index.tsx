import { Button, Form, Input, message } from 'antd'

import { useNavigate } from 'react-router'
import style from './index.module.scss'
import { signinApi } from '@renderer/aRequest/noAuth'

export default function Login() {
  const navigate = useNavigate()

  function jumpToForget() {
    navigate('/forgetPassword')
  }
  const [messageApi, contextHolder] = message.useMessage()
  function onFinish(values: any) {
    signinApi(values)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    messageApi.info('登录成功')
  }

  function jumpToReg() {
    navigate('/register')
  }

  return (
    <div className={style.container}>
      {contextHolder}
      <div className={style.background}></div>
      <div className={style.content}>
        <div className={style.header}>登录</div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          style={{ minWidth: 400 }}
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="邮箱"
            name="userEmail"
            rules={[
              { required: true, message: '请输入邮箱' },
              {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: '请输入正确的邮箱格式'
              }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password placeholder="6-10位包含数字和字母,不能包含空格" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
          <div className={style.toreg}>
            <Button onClick={jumpToForget} type="link">
              忘记密码?找回密码
            </Button>
            <Button onClick={jumpToReg} type="link">
              还没有账号？注册
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
