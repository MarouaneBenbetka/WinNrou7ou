
import fillDb from "../../functions/fillDb"


export default async function handler (req, res) {
    const { method} = req
    if (method === 'GET') {
        await fillDb();
        return res.json({message:"db filled"});
    }
}