import styles from "@/styles/typing.module.css";

const TypingAnimation = () => {
	return (
		<div className={styles["chat-bubble"] + " bg-white"}>
			<div className={styles.typing}>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
			</div>
		</div>
	);
};

export default TypingAnimation;
