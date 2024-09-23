
// const asyncHandler = (fn) => (req, res, next) => {};
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// or

// const asyncHandler = (fn) => {
//   return async (req, res, next) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       res.status(error.code || 500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };
// };

export { asyncHandler };

// const asyncHandler = (fn) => {
//     return () => {
//       try {
//         fn(); // Call the function inside a try block to handle potential errors
//       } catch (error) {
//         console.error("Error:", error); // Log any errors
//       }
//     };
//   }

//   const asyncHandler2 = (fn) => async () => {
//     try{
//       await fn()
//     } catch(error) {
//       console.error("Error:", error);
//     }
//   }

//   function fn() {
//     console.log("I am fnn")
//   }

//   const handledFn = asyncHandler2(fn);
//   handledFn(); // Now calling the function
