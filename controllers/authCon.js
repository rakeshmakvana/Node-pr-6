const Auth = require('../modules/authMod');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const index = async (req, res) => {
    const userId = req.cookies.userId;
    const user = await Auth.findById(userId);
    console.log(user);

    if (user) {
        return res.render('index', { user: user });
    } else {
        return res.redirect('/login');
    }
};

const profile = async (req, res) => {
    const userId = req.cookies.userId;
    const user = await Auth.findById(userId);
    res.render('profile',{ user: user });
}

const loginForm = (req, res) => {
    res.render('login');
};

const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const user = await Auth.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
            res.cookie('userId', user._id);
            return res.redirect('/');
        } else {
            return res.redirect('/signup');
        }
    });
};

const signupForm = (req, res) => {
    res.render('signup');
};

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = new Auth({ username, email, password: hash });
            await user.save();
        });
    });
    res.redirect('/login');
};

const logout = (req, res) => {
    res.clearCookie('userId');
    res.redirect('/login');
};

module.exports = { index, signupForm, signup, loginForm, login, logout, profile };