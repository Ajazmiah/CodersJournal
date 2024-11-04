import userModel from "../models/userModel.js";

export const checkEmailVerification = async (req, res, next) => {
    const userId = req.user.id; // Assuming you have user information from authentication middleware

    try {
        const user = await userModel.findById(userId);
        if (!user || !user.emailVerified) {
            return res.status(403).json({ message: 'Please verify your email to access this resource.' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


