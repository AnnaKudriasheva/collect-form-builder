import React from 'react';
import { Tooltip } from '@vgs/elemente';
import { QuestionCircleOutlined } from '@ant-design/icons';

const InfoTooltip = (props) => {
  const { title } = props;

  return (
    <Tooltip title={title}>
      <QuestionCircleOutlined style={{marginLeft: '.5rem'}}/>
    </Tooltip>
  )
}

export default InfoTooltip;
