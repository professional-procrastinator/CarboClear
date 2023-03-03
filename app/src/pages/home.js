const { default: Layout } = require('@/components/Layout');
import useSession from '@/utils/hooks/useSession';

const Home = () => {
  return (
    <Layout>
      <div>
        <h1>Home</h1>
      </div>
    </Layout>
  );
};

export default Home;
