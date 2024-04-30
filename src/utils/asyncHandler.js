//as we will be asyn function again and again so we will create a function that will handle the async function

const asyncHandler =(requestHandler) => (req, res, next) => {   //here next is used in middleware i.e go to next middleware
    Promise.resolve(requestHandler(req, res, next)).catch(next);
} 