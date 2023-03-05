import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "@/components/Button";
import styles from "./index.module.scss";

export default function Landing() {
  const router = useRouter();

  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  return (
    <div className={styles.content}>
      <div className={styles.left}>
        <div>
          <h1>
            <span className={styles.blue}>CarboClear</span>.
          </h1>
          <h1>
            <span className={styles.bluee}>Sustainability made simpler</span>
          </h1>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.primary}
            onClick={() => {
              setRegisterLoading(true);
              if (router.pathname === "/register") {
                return setRegisterLoading(false);
              }

              router.push("/register");
            }}
            loading={loginLoading ? false : registerLoading}
          >
            <div className={styles.apart}>
              <div>Get Started</div> <div>→</div>
            </div>
          </button>
          <button className={styles.textbutton} onClick={() => {router.push('/login')}}>
            <div className={styles.something}>
              <div>Sign In</div> <div>→</div>
            </div>
          </button>
        </div>
      </div>
      <img src="/mockup.png" className={styles.img} />
    </div>
  );
}