module.exports = function time(req, res, next) {
  const currentD = new Date();
  const startHappyHourD = new Date();
  startHappyHourD.setHours(9, 0, 0); // 9.00 am
  const endHappyHourD = new Date();
  endHappyHourD.setHours(17, 0, 0); // 5.00 pm

  console.log("happy hour?");
  if (currentD >= startHappyHourD && currentD < endHappyHourD) {
    next();
  } else {
    console.log("time");
    return res.status(403).send("please try again in your work hours");
  }
};
