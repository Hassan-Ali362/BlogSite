//the validate() middleware will check that the data from req.body matches the schema.

const validate = (schema) => { 
    return async (req, res, next) => {   // return must be written bcoz otherwise outer function donot return and just inner function return and so error occurs when used routes.
        try{
            const parseBody = await schema.parseAsync(req.body); 
            req.body = parseBody;
            next();
        }
        catch(err){
            const status = 422;
            const message = "Fill the blanks";
            const extraDetails = err.errors?.[0]?.message || "invalid inputs";

            const error = {
                status,
                message,
                extraDetails
            }

            next(error)
        }
}};

export default validate;


