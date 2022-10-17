import Layout from '../components/layout';
import { TasksProvider } from '../contexts/task-context';
import TasksList from '../components/task-list';
import CreateTask from '../components/task-create';
import { Space } from 'antd';

const Home = () => (
  <Layout>
    <TasksProvider>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <CreateTask />
        <TasksList />
      </Space>
    </TasksProvider>
  </Layout>
);

export default Home;
