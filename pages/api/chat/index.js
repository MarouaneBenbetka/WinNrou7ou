import { openai } from "@/controllers/chat";

export default async function handler(req, res) {
	const chatHistory = req.body;
	console.table(chatHistory);

	try {
		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: chatHistory,
		});

		const chatGptResponse = completion.data.choices[0].message?.content;
		console.log(chatGptResponse);
		res.status(200).json({ chatGptResponse });
	} catch (e) {
		res.status(400).json({
			message: `${e}`,
		});
	}
}
