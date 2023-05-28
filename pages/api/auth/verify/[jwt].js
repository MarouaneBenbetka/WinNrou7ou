import { handleEmailVerification } from "../../../../controllers/Auth"

export default async function handler (req, res) {
  const {method} = req
if (method==="GET")
return handleEmailVerification(req,res)
}
