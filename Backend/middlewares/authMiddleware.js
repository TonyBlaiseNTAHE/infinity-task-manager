import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';

// Middleware to project routes
 export const protect = async (req, resizeBy, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")){
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.employee =  await Employee.findById(decoded.id).select("-password");
            next();
        } else {
            res.status(401).json({ message: "Not authorized, no token"});
        }
    } catch (error){
        res.status(401).json({ message: "Token failed", error: error.message});
    }
};

// Middleware for Admin-only access
 export const adminOnly = (req, res, next) => {
    if ( req.employee && req.employee.role === "admin"){
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only"});
    }
}
 export default {protect, adminOnly}
