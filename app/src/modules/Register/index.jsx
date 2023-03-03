import Input from "@/components/Input";
import { useState } from "react";
import styles from "./index.module.scss";
import Button from "@/components/Button";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    return (
        <div className={styles.container}>
            <div className={styles.container__card}>
                <h1 className={styles.container__card__heading}>Register</h1>
                <form className={styles.container__card__form}>
                    <div className={styles.container__card__form__inputs}>
                        <label htmlFor="email" className={styles.container__card__form__inputs__for}>
                            Your <span className={styles.highlight}>email</span>
                        </label>
                        <Input onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={email} placeholder={"Your email"} type="email" name="email" className={styles.container__card__form__inputs__input} />
                    </div>
                    <div className={styles.container__card__form__inputs}>
                        <label htmlFor="name" className={styles.container__card__form__inputs__for}>
                            Your <span className={styles.highlight}>name</span>
                        </label>
                        <Input onChange={(e) => {
                            setName(e.target.value)
                        }} type="text" value={name} placeholder={"Your name"} name="name" className={styles.container__card__form__inputs__input} />
                    </div>
                    <div className={styles.container__card__form__inputs}>
                        <label htmlFor="password" className={styles.container__card__form__inputs__for}>
                            Your <span className={styles.highlight}>password</span>
                        </label>
                        <Input onChange={(e) => {
                            setPassword(e.target.value)
                        }} type="password" placeholder={"Your password"} value={password} name="password" className={styles.container__card__form__inputs__input} />
                    </div>
                    <div className={styles.container__card__form__inputs}>
                        <label htmlFor="country" className={styles.container__card__form__inputs__for}>
                           Your <span className={styles.highlight}>country</span>
                        </label>
                        <Input onChange={(e) => {
                            setCountry(e.target.value)
                        }} type="text" placeholder={"Your country"} value={country} name="country" className={styles.container__card__form__inputs__input} />
                    </div>
                    <Button style={{width: '85%', marginTop: '20px', height: '54px'}} type="submit"className={styles.container__card__form__button}>Register</Button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;