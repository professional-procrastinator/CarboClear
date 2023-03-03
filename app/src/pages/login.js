const { default: Layout } = require("@/components/Layout")
const { default: LoginPage } = require("@/modules/Login")

const Login = () => {
    return (
        <Layout>
            <LoginPage />
        </Layout>
    )
}

export default Login;