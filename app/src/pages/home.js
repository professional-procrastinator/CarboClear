import HomePage from "@/modules/Home";

const { default: Layout } = require("@/components/Layout")

const Home = () => {
    return (
        <Layout>
            <HomePage />
        </Layout>
    )
}

export default Home;