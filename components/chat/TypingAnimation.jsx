import styles from "@/styles/typing.module.css";

const TypingAnimation = () => {
	return (
		<div class={styles["chat-bubble"] + " bg-gray-800"}>
			<div class={styles.typing}>
				<div class={styles.dot}></div>
				<div class={styles.dot}></div>
				<div class={styles.dot}></div>
			</div>
		</div>
	);
};

export default TypingAnimation;
