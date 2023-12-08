import { Joi, Segments } from "celebrate";

const userResetPasswordValitation = {
    [Segments.BODY]: Joi.object().keys({
        token: Joi.string().min(36).max(36).required(),
        password: Joi.string().min(8).max(14).required()
    }),
}

export { userResetPasswordValitation };