import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("emilll", email);
    if (!email) {
      return res.json({ msg: "Email is required", staus: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.User.findUnique({ where: { email } });
    if (!user) {
      console.log("userrrr", user);
      return res.json({ msg: "User not found", status: false });
    } else {
      console.log("userrrr", user);
      return res.json({ msg: "User found", staus: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};
