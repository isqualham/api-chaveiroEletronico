import { Joi, Segments } from "celebrate";

const userAvatarUpdateValitation = {
    [Segments.COOKIES]: Joi.object().keys({
        avatar: Joi.string().required()
    }),
}

export { userAvatarUpdateValitation };