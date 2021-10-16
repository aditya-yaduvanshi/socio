const router = require("express").Router();
const AccountSchema = require("./models");
const Validate = require("../utils/validate");

// login
router.get("/auth", async (req, res, next) => {
  let data = req.query,
    user,
    email = await Validate.isEmail(data.username),
    phone = await Validate.isPhone(data.username);
  try {
    if (email) {
      user = await AccountSchema.findOne({
        email: data.username,
        password: data.password,
      });
    } else if (phone) {
      user = await AccountSchema.findOne({
        phone: data.username,
        password: data.password,
      });
    } else return res.status(400);

    if (!user) return res.status(400);

    return res.status(200).json({
      access: "bwjbyu678er82ijbwehgfvewe",
      refresh: "sa12t7vbhbdvimskdnhudg6we",
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});
// signup
router.post("/auth", async (req, res, next) => {
  let data = req.body,
    user;
  try {
    if (
      (await Validate.isEmail(data.email)) &&
      (await Validate.isPhone(data.phone)) &&
      data.name &&
      data.password.length >= 6 &&
      data.password === data.password2
    ) {
      user = AccountSchema({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      let newuser = await user.save();
      if (newuser) return res.status(201).json({"success": "Account created successfully!"});
      else return res.status(500).json({"error": "Something went wrong!"});
    } else return res.status(400).json({"error": "Invalid data!"});
  } catch (err) {
    console.log(err);
    return res.status(400).json({"error": "Invalid data!"});
  }
});

module.exports = router;
