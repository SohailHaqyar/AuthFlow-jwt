const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "HelloWelloDello",
    DATABASE: "mongodb://localhost:27017/learninggate",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
