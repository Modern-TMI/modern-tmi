export const isEmail = (email: string) => {
  const emailTester = RegExp(
    '^([\\w\\.\\_\\-])*[a-zA-Z0-9]+([\\w\\.\\_\\-])*([a-zA-Z0-9])+([\\w\\.\\_\\-])+@([a-zA-Z0-9]+\\.)+[a-zA-Z0-9]{2,8}$'
  );
  return emailTester.test(email);
};
