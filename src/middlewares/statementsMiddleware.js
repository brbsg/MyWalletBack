import joi from "joi";

const statementSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
});

export default function statementsMiddleware(req, res, next) {
  const validation = statementSchema.validate(req.body);

  if (validation.error) return res.sendStatus(422);

  next();
}
