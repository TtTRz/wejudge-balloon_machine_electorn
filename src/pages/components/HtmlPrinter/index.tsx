import React from 'react';
import styled from 'styled-components';
import { Typography, Divider } from 'antd';
const HtmlPrinterInner = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  margin-bottom: 16px;
`;
const Title: any = styled.div`
  font-size: ${(props: any) => props.fontSize}px;
  font-weight: ${(props: any) => props.fontWeight};
  margin: 6px 0;
`;

interface IHtmlPrinter {
  title?: string;
  nickname?: string;
  judgeTime?: string;
  problem?: string;
}

export const HtmlPrinter: React.FC<IHtmlPrinter> = props => {
  const { title, nickname, problem, judgeTime } = props;
  return (
    <HtmlPrinterInner>
      <Title fontSize={32} fontWeight={650}>
        WeJudge
      </Title>
      <Title fontSize={20} fontWeight={600}>
        {title ?? '{比赛名}'}
      </Title>
      <Title fontSize={20} fontWeight={600}>
        ---------------------------
      </Title>
      <Title fontSize={20} fontWeight={600}>
        【过题队伍】
      </Title>
      <Title fontSize={20} fontWeight={600}>
        {nickname ?? '{队伍名}'}
      </Title>
      <Title fontSize={20} fontWeight={600}>
        【过题题目】
      </Title>
      <Title fontSize={20} fontWeight={600}>
        {problem ?? '{题目名}'}
      </Title>
      <Title fontSize={20} fontWeight={600}>
        【通过情况】
      </Title>
      <Title fontSize={20} fontWeight={600}>
        已通过
      </Title>
      <Title fontSize={20} fontWeight={600}>
        ---------------------------
      </Title>
      <Title fontSize={20} fontWeight={600}>
        {judgeTime ?? '{过题时间}'}
      </Title>
    </HtmlPrinterInner>
  );
};
