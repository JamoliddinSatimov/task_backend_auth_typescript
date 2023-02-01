import jwt from "jsonwebtoken"

const sign = payload => jwt.sign(payload, "JUDAYAM_SECRET_KEY")

export {sign}
