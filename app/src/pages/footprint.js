import Footprint from '@/modules/Footprint';
import HomePage from '@/modules/Home';

const { default: Layout } = require('@/components/Layout');

const Home = () => {
  return (
    <Layout>
      <Footprint />
    </Layout>
  );
};

export default Home;
