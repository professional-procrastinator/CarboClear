import styles from "./index.module.scss";
import useSession from "@/utils/hooks/useSession";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside, { Popup } from "@/components/Popup";
import LeaderboardPopup from "../cards/leaderboards";
import axios from "@/utils/axios";
import { getName } from "country-list";
import Button from "@/components/Button";

const HomePage = () => {
    const user = useSession();
    const leaderRef = useRef(null);
    const [leader, setLeader] = useState(false);
    const [posData, setPosData] = useState({});
    useOnClickOutside(leaderRef, () => setLeader(false));

    const getPositions = async () => {
        const intData = await axios.get('/leaderboard/international');
        const natData = await axios.get('/leaderboard/national');
        setPosData({
            international: intData.data.position,
            national: natData.data.position,
        })
    }

    useEffect(() => {
        getPositions();
    }, [])

    return (
        <div className={styles.home}>
            <h1 className={styles.home__intro}>Good Day,{" "}
                <span className={styles.highlight}>{user?.user?.name.split(" ")[0]}</span>         
            </h1>
            {console.log(user)}
            <div className={styles.home__cards}>
                <div className={styles.home__cards__first}>
                    <div className={styles.home__cards__first__card} onClick={() => {setLeader(true)}}>
                        <div className={styles.first}>
                            <div>
                                <h1 className={styles.cards__heading}>{user?.user?.name}</h1>
                                <h1 className={styles.cards__points}>You've scored <span className={styles.highlight}>{user?.user?.points}</span> points</h1>
                            </div>
                            <Button style={{marginLeft: 'auto', marginRight: '30px', width: '145px'}} onClick={() => {}}>Leaderboard</Button>
                        </div>
                        <div className={styles.cards__headings}>
                        <div className={styles.cards__subheading}>
                            <span className={styles.highlights}>#{posData["international"]}</span>
                            <span className={styles.s}>in the world</span>

                       </div>
                        <div className={styles.cards__subheading}>
                            <span className={styles.highlights}>#{posData["national"]}</span>
                            <span className={styles.s}>in your country</span>
                        </div>
                        </div>
                    </div>
                    <div className={styles.home__cards__first__card}>

                    </div>
                    <div className={styles.home__cards__first__card}>

                    </div>
                </div>
                <div className={styles.home__cards__second}>
                    <div className={styles.home__cards__second__card1}>

                    </div>
                    <div className={styles.home__cards__second__card}>
        
                    </div>
                </div>
            </div>
            <Popup ref={leaderRef} popupState={leader} >
                <LeaderboardPopup></LeaderboardPopup>
            </Popup>
        </div>
    )
}

export default HomePage;