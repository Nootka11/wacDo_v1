module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.role !== requiredRole) {
            return res.status(403).json({ message: 'Accès refusé, rôle non autorisé' });
        }
        next();
    };
};