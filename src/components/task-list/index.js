import { useRef, useState } from 'react';
import { Button, Input, Popconfirm, Space, Table, Tag } from 'antd';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { PRIORITIES, useTasks } from '../../contexts/task-context';
import { EditTaskModal } from '../task-edit-modal';

export default function TasksList() {
  const [openEditTaskModal, setOpenEditTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const { tasks, deleTask } = useTasks();
  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 4 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onInput={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            confirm({ closeDropdown: false });
          }}
        />
      </div>
    ),
    filterIcon: (filter) => (
      <BiSearch size="1.3rem" color={filter ? '#1890ff' : ''} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100);
    },
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '70%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      ...getColumnSearchProps('priority'),
      width: '20%',
      render: (priority) => (
        <Tag color={PRIORITIES[priority].color}>{priority}</Tag>
      ),
      defaultSortOrder: 'descend',
      sorter: (a, b) => PRIORITIES[b.priority].id - PRIORITIES[a.priority].id,
    },
    {
      title: 'Action',
      render: (task) => (
        <Space size="middle">
          <Button
            type="default"
            size="small"
            icon={<BsPencil color="gray" />}
            onClick={() => {
              setSelectedTask(task);
              setOpenEditTaskModal(true);
            }}
          ></Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleTask(task.id)}
          >
            <a>
              <BsTrash color="gray" />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h2>Job List</h2>
      <Table columns={columns} rowKey="id" dataSource={tasks} size="small" />
      <EditTaskModal
        task={selectedTask}
        isModalOpen={openEditTaskModal}
        handleCancel={() => setOpenEditTaskModal(false)}
      />
    </>
  );
}
