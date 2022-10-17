import { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { PRIORITIES, useTasks } from '../../contexts/task-context';
const { Option } = Select;

export const EditTaskModal = ({ task, isModalOpen, handleCancel }) => {
  const { editTask } = useTasks();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ priority: task?.priority });
  }, [form, task]);

  const handleOk = () => {
    editTask({
      taskId: task?.id,
      priority: form.getFieldValue('priority'),
    });
    handleCancel();
  };

  return (
    <Modal
      title="Job Edit"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
    >
      <Form layout="vertical" name="edit" requiredMark={false} form={form}>
        <Form.Item label="Job Name">
          <Input value={task?.name} disabled />
        </Form.Item>
        <Form.Item name="priority" label="Job Priority">
          <Select placeholder="Choose" allowClear>
            {Object.keys(PRIORITIES).map((priority) => (
              <Option value={priority} key={priority}>
                {priority}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
