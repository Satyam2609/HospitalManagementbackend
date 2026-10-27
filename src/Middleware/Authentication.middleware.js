export const onlyReception = (req, res, next) => {
  
  if (req.user.department === "Reception") {
       res.status(200).json({
    success: true,
    message: "reception",
    data:req.user.department
  });
    return next();
  }

   res.status(403).json({
    success: false,
    message: "Only Reception department can access this",
  });
};