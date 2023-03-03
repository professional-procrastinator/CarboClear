const { default: Layout } = require('@/components/Layout');
import TasksCard from '@/modules/cards/tasks';
import useSession from '@/utils/hooks/useSession';

const Home = () => {
  return (
    <Layout>
      <div>
        <h1>Home</h1>
        <TasksCard />
      </div>
    </Layout>
  );
};

export default Home;
