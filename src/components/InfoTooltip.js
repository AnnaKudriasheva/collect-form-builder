import React from 'react';
import { Tooltip } from '@vgs/elemente';
import { InfoCircleOutlined } from '@ant-design/icons';

const InfoTooltip = (props) => {
  const { title } = props;

  return (
    <Tooltip title={title}>
      <InfoCircleOutlined style={{ marginLeft: '.5rem'}}/>
    </Tooltip>
  )
}

export default InfoTooltip;
