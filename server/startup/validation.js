import Joi from "joi";
import JoiObjId from "joi-objectid";

const JoiObjectIdValidation = () => {
  const JoiObjectId = JoiObjId(Joi);
  return JoiObjectId;
};

export default JoiObjectIdValidation;
