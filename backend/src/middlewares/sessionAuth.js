import { Session } from "../models/sessionModel.js";
/**
 * Middleware function to authenticate a session.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise<void>} - Resolves if the session is authenticated successfully.
 *                           Sends a 401 Unauthorized response if the session is not authenticated.
 *                           Sends a 404 Session not found response if the session is not found.
 *                           Sends a 500 Internal server error response if there is an error.
 */
const validateSession = async (req, res, next) => {
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) {
        return res.status(401).json({ message: "Unauthorized", details: "Invalid values provided" });
    }
    try {
        console.log("Session ID:", sessionId);
        const { userId: givenUserId } = { userId: req.params.userId?.trim() };
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(401).json({ messag: "Unauthorized", details: "Session not found" });
        }
        if (givenUserId === session.userId.toString()) {
            req.userId = givenUserId;
            next();
        } else {
            console.log(givenUserId, session.userId.toString(), givenUserId == session.userId.toString());
            return res.status(401).json({
                message: "Unauthorized",
                details: "Given user id differs from the one fetched from provided session id.",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", details: error.message });
    }
};

/**
 * Creates a new session for the given user ID.
 *
 * @param {string} userId - The ID of the user.
 * @return {Promise<string>} The ID of the newly created session.
 * @throws {Error} If the session creation fails due to a duplicate user ID or an unknown error.
 */
const createSession = async (userId) => {
    try {
        const session = new Session({ userId });
        await session.save();
        return session._id;
    } catch (error) {
        if (error.code == 11000) {
            // session creation for same user id gives error code 11000
            const session = await Session.findOne({ userId });
            session.createdAt = Date.now();
            await session.save();
            return session._id;
        } else {
            throw new Error(error.errorResponse.errmsg);
        }
    }
};

const destroySession = async (sessionId) => {
    if (!sessionId) {
        throw new Error("Invalid session id");
    }
    await Session.deleteOne({ _id: sessionId });
};

export { validateSession, createSession, destroySession };
