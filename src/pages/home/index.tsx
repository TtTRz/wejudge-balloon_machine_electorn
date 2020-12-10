import React, { useEffect, useState, useRef } from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  PageHeader,
  Progress,
  Space,
  Select,
  Typography,
  Tag,
} from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { useModel } from 'umi';
import { HtmlPrinter } from '../components/HtmlPrinter';
import { GetPrintList } from '@/services/global';
const { Option } = Select;
const { Title } = Typography;
const HomePageInner = styled.div`
  max-width: 1024px;
  min-width: 800px;
  min-height: 600px;
  max-height: 768px;
  height: 100%;
  background: #fafafa;
`;
let timer: any = undefined;
const HomePage: React.FC<{}> = props => {
  const { globalInfo } = useModel('globalModel');
  const contestName = globalInfo?.contestName ?? '';
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const progressPercentRef = useRef(0);
  const [listenStatus, setListenStatus] = useState<boolean>(false);
  const [printList, setPrintList] = useState<Array<any>>([]);
  const [lastTime, setLastTime] = useState<number>(0);
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);
  const TABLE_COLUMNS = [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
      width: 60,
    },
    {
      key: 'nickname',
      title: '队伍名',
      dataIndex: 'nickname',
    },
    {
      key: 'problem',
      title: '题目名',
      dataIndex: 'problem',
    },
    {
      key: 'create_time',
      title: '提交时间',
      dataIndex: 'create_time',
      render: (record: any) => {
        return moment(record * 1000).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      width: 80,
      key: 'print',
      title: '打印状态',
      render: (item: any) => {
        if (item.status) {
          return <Tag color="success">已打印</Tag>;
        }
        return <Tag color="processing">未打印</Tag>;
      },
    },
    {
      key: 'action',
      title: '操作',
      width: 80,
      render: (item: any, _: any, index: number) => {
        console.log(index);
        return (
          <Button
            size="small"
            onClick={() => {
              const list = [...printList];
              list[index].status = true;
              setPrintList(list);
            }}
          >
            打印
          </Button>
        );
      },
    },
  ];

  const GetPrintListService = async (
    token: string,
    id: string | number,
    createTime: number | string,
  ) => {
    const result = await GetPrintList({ token, contestId: id, createTime });
    const { data } = result;
    data.reverse();
    let newData = [...data, ...printList];
    if (newData.length) {
      setLastTime(newData[0].create_time * 1000);
      setPrintList(newData);
    }
  };

  const refreshList = () => {
    const token = globalInfo?.token ?? '';
    const contestId = globalInfo?.contestId ?? '';
    const createTime = lastTime;
    console.log(token, contestId);
    token && contestId && GetPrintListService(token, contestId, createTime);
  };
  const handleListen = () => {
    if (!listenStatus) {
      // 开始监听
      refreshList();
      timer = setInterval(() => {
        if (progressPercentRef.current === 100) {
          refreshList();
          progressPercentRef.current = -1;
        }
        progressPercentRef.current += 1;
        setProgressPercent(progressPercentRef.current);
      }, 100);
    } else {
      // 停止监听
      progressPercentRef.current = 0;
      setProgressPercent(progressPercentRef.current);
      clearInterval(timer);
    }
    setListenStatus(!listenStatus);
  };

  return (
    <HomePageInner>
      <PageHeader
        title={contestName}
        extra={[
          <Button>打印测试</Button>,
          <Select defaultValue="none">
            <Option value="none">选择打印机</Option>
          </Select>,
        ]}
      />
      <Row
        style={{
          padding: '0 24px',
          marginRight: '0px',
          marginLeft: '0',
        }}
        gutter={16}
      >
        <Col span={18}>
          <Table
            bordered
            size="small"
            columns={TABLE_COLUMNS}
            dataSource={printList}
            pagination={false}
            scroll={{ y: 400 }}
          />
          <Progress
            percent={progressPercent}
            status="active"
            style={{ margin: '8px 0 ' }}
          />
          <Button
            type="primary"
            block
            style={{ margin: '8px 0 ' }}
            onClick={handleListen}
            danger={listenStatus}
          >
            {listenStatus ? '停止监听' : '开始监听'}
          </Button>
        </Col>
        <Col span={6}>
          <Space direction="vertical">
            <Title level={5}>打印样式</Title>
            <HtmlPrinter />
          </Space>
        </Col>
      </Row>
    </HomePageInner>
  );
};

export default HomePage;
