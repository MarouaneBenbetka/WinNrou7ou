import styles from "@/styles/typing.module.css";

const TypingAnimation = () => {
	return (
		<div className={styles["chat-bubble"] + " bg-gray-800"}>
			<div className={styles.typing}>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
			</div>
		</div>
	);
};

export default TypingAnimation;
