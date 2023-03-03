import Layout from "@/components/Layout";

const { default: RegisterPage } = require("@/modules/Register")

const Register = () => {
    return (
        <Layout>
            <RegisterPage />
        </Layout>
    )
}

export default Register;