import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import axios from "@/utils/axios";

const LeaderboardPopup = () => {
    const [chosen, setChosen] = useState(0);
    const [data, setData] = useState({});
    const getData = async () => {
        const res = await axios.get(`/leaderboard/${chosen == 0 ? 'international' : 'national'}`);
        console.log(res.data)
        setData(res.data.users);
    }
    useEffect(() => {
        getData()
    }, [chosen])
    return (
        <div className={styles.popup}>
            <div className={styles.popup__switcher}>
                <div onClick={() => {
                    setChosen(0)
                }} className={styles.popup__switcher__item} style={chosen == 0 ? {borderBottomColor: 'var(--primary)'} : {}}>
                    <h1 className={styles.popup__switcher__item__heading} style={chosen == 0 ? {color: 'var(--primary)', fontWeight: '600'} : {}}>Global</h1>
                </div>
                <div onClick={() => {
                    setChosen(1)
                }} style={chosen == 1 ? {borderBottomColor: 'var(--primary)'} : {}} className={styles.popup__switcher__item} >
                    <h1 style={chosen == 1 ? {color: 'var(--primary)', fontWeight: '600'} : {}} className={styles.popup__switcher__item__heading}>National</h1>
                </div>
            </div>
            <div className={styles.popup__leaderboard}>
                {data.map((item, index) => {
                    return (
                        <div className={styles.popup__leaderboard__item}>
                             <span className={styles.popup__leaderboard__item__pos}>#{index + 1}</span>
                            <span className={styles.popup__leaderboard__item__name}>{item.name}</span>
                            <span className={styles.popup__leaderboard__item__score}>{item.points}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LeaderboardPopup;