import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';

const Visualizer = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic) {
      let message = JSON.parse(payload.message)
      let deviceType = message.profileName;
      
      console.log(deviceType);
      if (deviceType === "Random-Integer-Device") {
        let value = { value: message.readings[0].value };
        setMessages((messages) => [...messages, value]);
      }
    }
  }, [payload])

  const renderListItem = (item) => (
    <List.Item>
      <List.Item.Meta
        title={item.topic}
        description={item.value}
      />
    </List.Item>
  )

  return (
    <Card
      title="Visualizer"
    >
      <List
        size="small"
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      />
    </Card>
  );
}

export default Visualizer;
