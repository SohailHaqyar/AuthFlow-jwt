const user = "sohail";
const user_password = "sohail123";
const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "HelloWelloDello",
    DATABASE: `mongodb+srv://${user}:${user_password}@cluster0.wnkoq.mongodb.net/Auth?retryWrites=true&w=majority`,
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
