module.exports = function time(req, res, next) {
  const currentD = new Date();
  const startHappyHourD = new Date();
  startHappyHourD.setHours(9, 0, 0); // 5.30 pm
  const endHappyHourD = new Date();
  endHappyHourD.setHours(17, 0, 0); // 6.30 pm

  console.log("happy hour?");
  if (currentD >= startHappyHourD && currentD < endHappyHourD) {
    next();
  } else {
    return res.status(403).send("please try again in your work hours");
  }
};
