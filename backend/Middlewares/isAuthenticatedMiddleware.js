import jwt from 'jsonwebtoken';

// -----------------------------In CAse of only access token

// const IsAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if(!token){
//             return res.status(401).json({ success: false, message: "user not authenticated"})
//         }

//         const decode = jwt.verify(token, process.env.SECRET_KEY);
//         if(!decode){
//             return res.status(400).json({ success: false, message: "Invalid Token"});
//         }

//         req.id = decode.userId;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({success: false, message: "Authentication failed "});
//     }
// }

// export default IsAuthenticated;


// ------------------------------------------------------In case of refresh and access tokens
// Also this code automatically creates a new access token on its expire by checking if refreh token present. Otherwise, manually user need to make a route for refresh token in routes.

const IsAuthenticated = (req, res, next) => {
    let accessToken = req.cookies.accessToken;

    if (!accessToken) {
        // Try using refresh token to get new access token
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        try {
            const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            // Create new access token
            accessToken = jwt.sign(
                { userId: decodedRefresh.userId },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            // Set new access token in cookie
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000 // 15 minutes
            });

        } catch (err) {
            return res.status(403).json({ success: false, message: "Invalid refresh token" });
        }
    }

    try {
        const decodedAccess = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.id = decodedAccess.userId;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, message: "Invalid access token" });
    }
};

export default IsAuthenticated;
