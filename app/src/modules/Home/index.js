import styles from "./index.module.scss";
import useSession from "@/utils/hooks/useSession";

const HomePage = () => {
    const user = useSession();
    console.log(user)
    return (
        <div className={styles.home}>
            <h1 className={styles.home__intro}></h1>
        </div>
    )
}

export default HomePage;