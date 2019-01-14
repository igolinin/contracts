function expireDate() {
  return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
}
console.log(expireDate());
