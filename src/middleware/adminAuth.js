
module.exports = {};

module.exports.adminAuth = (req, res, next) => {
    let token = "xyz1";
    if(token === "xyz") {
        next();
    }
    else {
        res.status(401).send("Not authorized")
    }
}