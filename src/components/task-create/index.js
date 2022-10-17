import { Button, Col, Form, Input, Row, Select } from 'antd';
import { BsPlus } from 'react-icons/bs';
import { PRIORITIES, useTasks } from '../../contexts/task-context';
import styles from './index.module.scss';
const { Option } = Select;

const CreateTask = () => {
  const { addTask } = useTasks();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    addTask({
      name: values.name.trim(),
      priority: values.priority,
    });
    form.resetFields();
  };

  return (
    <>
      <h2>Create New Job</h2>
      <Form
        layout="vertical"
        name="create"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
        form={form}
      >
        <Row gutter={12} align="bottom">
          <Col xs={24} md={14}>
            <Form.Item
              label="Job Name"
              name="name"
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/^[a-z0-9' 'ğüşöçıİĞÜŞÖÇ]+$/i),
                },
              ]}
            >
              <Input maxLength={255} />
            </Form.Item>
          </Col>
          <Col xs={24} md={7}>
            <Form.Item
              name="priority"
              label="Job Priority"
              rules={[{ required: true }]}
            >
              <Select placeholder="Choose" allowClear>
                {Object.keys(PRIORITIES).map((priority) => (
                  <Option value={priority} key={priority}>
                    {priority}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={3}>
            <Form.Item>
              <Button
                className={styles.create_button}
                type="primary"
                htmlType="submit"
                block
                icon={<BsPlus size="1.3rem" />}
              >
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateTask;
