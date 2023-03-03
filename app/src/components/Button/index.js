import styles from "./index.module.scss";

const Button = ({onClick, children, style}) => {
    return (
        <button className={styles.button} onClick={() => {onClick()}} style={style}>
            {children}
        </button>
    )
}

export default Button;