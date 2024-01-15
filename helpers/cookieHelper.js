const CookieHelper = (req) => {
    const jwtToken = req.cookies['auth'];
    // console.log(jwtToken);
    return jwtToken || null;
};

module.exports = CookieHelper