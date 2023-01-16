import React, { useContext } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';
import { QosOption } from './index'

const Publisher = ({ publish }) => {
  const [form] = Form.useForm();
  const qosOptions = useContext(QosOption);

  const record = {
    topic: "EdgeXYZ",
    qos: 0,
  };

  const onFinish = (values) => {
    publish(values);
  };

  const PublishForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item label="Topic" name="topic">
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="QoS" name="qos">
            <Select options={qosOptions} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Payload" name="payload">
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: "right" }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Publish
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  /*{"apiVersion":"v2",
  "id":"249ac56f-d615-464b-8790-3d163c5b0478",
  "deviceName":"Random-Float-Device",
  "profileName":"Random-Float-Device",
  "sourceName":"Float32","origin":1673740025362590200,"readings":[
    {"id":"841e09ec-aaa6-4d29-b9df-0f4532b8b6c0",
    "origin":1673740025362590200,
    "deviceName":"Random-Float-Device",
    "resourceName":"Float32",
    "profileName":"Random-Float-Device",
    "valueType":"Float32",
    "binaryValue":null,
    "mediaType":"",
    "value":"-6.552586e+36"}
  ]
  } */
  return <Card title="Publisher">{PublishForm}</Card>;
}

export default Publisher;
