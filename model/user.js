const { v4 } = require("uuid");
const Sequelize = require('sequelize');
const { sequelize } = require("../seq");
const project = require("./project");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    projects: Sequelize.STRING,
    last_edit_project: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

const regist = async (email, password, data) => {
  const id = v4();
  const projectId = await project.create(data);

  // await query(
  //   `INSERT INTO user VALUES ('${id}', '${email}', '${password}', '${projectId}', '${projectId}')`
  // );
  await User.create({
    id,
    email,
    password,
    projects: projectId,
    last_edit_project: projectId,
  });
};

module.exports = {
  User,
  regist,
};
