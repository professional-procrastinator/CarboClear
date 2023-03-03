import styles from './index.module.scss';

const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      placeholder={placeholder}
      className={styles.input}
      type={type}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

export default Input;
