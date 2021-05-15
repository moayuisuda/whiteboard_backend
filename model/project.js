const { v4 } = require("uuid");
const Sequelize = require("sequelize");
const { sequelize } = require("../seq");
const { tempData } = require("./template");

const Project = sequelize.define(
  "project",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    data: Sequelize.STRING(10000),
    name: Sequelize.STRING,
  },
  {
    timestamps: false,
  }
);

const create = async (data = tempData) => {
  const id = v4();
  data.id = id;
  await Project.create({
    id,
    data: JSON.stringify(data),
    name: "未命名项目",
  });

  return id;
};

module.exports = {
  Project,
  create,
};
