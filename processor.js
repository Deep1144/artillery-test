const { registerUser } = require("./register.js");

module.exports = {
  registerUser: async function (_, context) {
    const user = context.vars; // Get user based on index
    if (!user) {
      console.error("User not found");
      return;
    }

    console.log("Registering user:", user);
    const { companyName, companyEmail, password } = user;

    if (!companyName || !companyEmail || !password) {
      console.error("Missing user information in context:");
      return;
    }
    await registerUser(companyName, companyEmail, password);
  },
};
