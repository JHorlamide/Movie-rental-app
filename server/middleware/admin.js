export const admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access Denied" });
  }
  
  next()
};
