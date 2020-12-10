import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography, Space, Input, Form, message } from 'antd';
import { ConnectTest } from '@/services/global';
import { useModel, history } from 'umi';

const { Title } = Typography;

const LoginPageInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const FormOuter = styled.div`
  position: relative;
  height: 80px;
  display: flex;
`;

interface ILoginPage {}

const LoginPage: React.FC<ILoginPage> = props => {
  const [form] = Form.useForm();
  const [connectTestLoading, setConnectTestLoading] = useState<boolean>(false);
  const [connectContestLoading, setConnectContestLoading] = useState<boolean>(
    false,
  );

  const { setGlobalInfo } = useModel('globalModel');

  const ConnectTestService = async (token: string, id: number) => {
    setConnectTestLoading(true);
    const result = await ConnectTest({ token, contestId: id });
    const { data } = result;
    data.status === 'success' && message.success('验证成功！');
    setConnectTestLoading(false);
  };

  const ConnectContestService = async (token: string, id: number) => {
    setConnectContestLoading(true);
    const result = await ConnectTest({ token, contestId: id });
    const { data } = result;
    const contestName = data.contest_name;
    setGlobalInfo({
      contestName,
      token,
      contestId: id,
    });
    data.status === 'success' && message.success('连接成功！');
    history.push('/home');
    setConnectContestLoading(false);
  };

  const handleTest = () => {
    form.validateFields().then((values: any) => {
      const { token, id } = values;
      ConnectTestService(token, id);
    });
  };

  const handleLogin = () => {
    form.validateFields().then((values: any) => {
      const { token, id } = values;
      ConnectContestService(token, id);
    });
  };

  return (
    <LoginPageInner>
      <Center>
        <Title level={2} style={{ textAlign: 'center' }}>
          Wejudge 比赛服专用气球机
        </Title>
        <Space>
          <FormOuter>
            <Form
              form={form}
              initialValues={{ id: '', token: '' }}
              layout="inline"
            >
              <Form.Item
                name="id"
                rules={[{ required: true, message: '请输入比赛 ID' }]}
              >
                <Input placeholder="比赛 ID"></Input>
              </Form.Item>
              <Form.Item
                name="token"
                rules={[{ required: true, message: '请输入比赛令牌' }]}
              >
                <Input placeholder="比赛令牌"></Input>
              </Form.Item>
              <Form.Item>
                <Button onClick={handleTest} loading={connectTestLoading}>
                  连接测试
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={handleLogin}
                  loading={connectContestLoading}
                >
                  进入
                </Button>
              </Form.Item>
            </Form>
          </FormOuter>
        </Space>
      </Center>
    </LoginPageInner>
  );
};

export default LoginPage;
