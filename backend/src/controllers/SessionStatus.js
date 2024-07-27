import { Session } from "../models/sessionModel.js";

export const sessionStatusController = async (req, res) => {
    try {
        const sessionId = req.cookies?.sessionId;
        if (!sessionId) {
            return res.status(200).json({ status: "unauthenticated", isLoggedIn: false });
        }
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(200).json({ status: "unauthenticated", isLoggedIn: false });
        }
        res.status(200).json({ status: "authenticated", isLoggedIn: true });
    } catch (error) {
        console.error("Error occurred while verifying session status:", error);
        res.status(500).json({ message: "Internal Error", details: error.message });
    }
};
