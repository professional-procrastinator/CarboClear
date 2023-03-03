import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import styles from "./index.module.scss";

const Header = () => {
    const router = useRouter()
    return (
        <div className={styles.header}>
            <h1 className={styles.header__heading}>CarboClear.</h1>
            <div className={styles.header__actions}>
                <Link href="/login" className={styles.header__actions__login}><span>Sign In</span></Link>
                <Button style={{width: '135px', height: '42px', fontSize: '16px'}} onClick={() => {router.push("/register")}}>Register</Button>
            </div>
        </div>
    )
}

export default Header;