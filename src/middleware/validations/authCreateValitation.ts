import { Joi, Segments } from "celebrate";

const authCreateValitation = {
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string().min(8).max(14),
        registration: Joi.string().min(10).max(10)
    }),
}

export { authCreateValitation };