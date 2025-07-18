exports.isSuperAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied: Super Admin only' });
};

exports.checkPermission = (action) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    if (req.user.role === 'superadmin') return next();

    const hasPermission = req.user.permissions?.[action];
    if (hasPermission) return next();

    return res.status(403).json({ message: `Access denied: ${action}` });
  };
};