import { Joi, Segments } from "celebrate";

const userPasswordTemporyValitation = {
    [Segments.BODY]: Joi.object().keys({
        registration: Joi.string().min(10).max(10)
    }),
}

export { userPasswordTemporyValitation };