const router = require('express').Router();
const User = require('../models/User');
const EmailOtp = require('../models/EmailOtp');
const jwt = require('jsonwebtoken');
const { generateOtp, sendSignupOtpEmail } = require('../utils/otpEmail');

const JWT_SECRET = process.env.JWT_SECRET || 'kumbh-sahyogi-secret-key-2024';
const JWT_EXPIRES_IN = '7d';
const OTP_EXPIRY_MINUTES = 10;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Send OTP for signup
router.post('/send-signup-otp', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please login instead.'
      });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await EmailOtp.deleteMany({ email, purpose: 'signup' });
    await EmailOtp.create({ email, otp, purpose: 'signup', expiresAt });

    const mailResult = await sendSignupOtpEmail(email, otp);

    if (!mailResult.sent && !mailResult.devLogged) {
      return res.status(503).json({
        success: false,
        message: 'Unable to send verification email. Please check SMTP settings.'
      });
    }

    res.json({
      success: true,
      message: mailResult.sent
        ? 'Verification code sent to your email'
        : 'Verification code generated. Check server console (SMTP not configured).',
      expiresInMinutes: OTP_EXPIRY_MINUTES
    });
  } catch (error) {
    console.error('Send signup OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send verification code'
    });
  }
});

// Signup Route (requires email OTP)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, otp } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!name || !normalizedEmail || !phone || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required, including the email verification code'
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const otpRecord = await EmailOtp.findOne({
      email: normalizedEmail,
      purpose: 'signup'
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Please request a verification code for your email first'
      });
    }

    if (otpRecord.expiresAt < new Date()) {
      await EmailOtp.deleteMany({ email: normalizedEmail, purpose: 'signup' });
      return res.status(400).json({
        success: false,
        message: 'Verification code expired. Please request a new one.'
      });
    }

    if (String(otp).trim() !== otpRecord.otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code'
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const user = new User({
      name,
      email: normalizedEmail,
      phone,
      password,
      isVerified: true
    });

    await user.save();
    await EmailOtp.deleteMany({ email: normalizedEmail, purpose: 'signup' });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during signup'
    });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Get Current User (Protected Route)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;
