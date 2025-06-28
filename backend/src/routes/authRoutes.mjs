import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.mjs';
import { generateToken } from '../controllers/userController.mjs';
import passport from 'passport';


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const allowedOrigins = ['http://localhost:5173'];
    const user = req.user;
    const token = generateToken(user);

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send(`
        <html>
            <body>
            <script>
                window.opener.postMessage({
                type: 'google-auth-success',
                data: {
                    token: "${token}",
                    name: "${user.name}",
                    email: "${user.email}"
                }
                }, "${allowedOrigins[0]}");
                window.close();
            </script>
            </body>
        </html>
    `);
  }
);

router.get('/verify', authController.verifyAuth);

export default router;