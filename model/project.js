const { v4 } = require("uuid");
const Sequelize = require('sequelize');
const { sequelize } = require("../seq");

const Project = sequelize.define(
  "project",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    data: Sequelize.STRING(10000),
  },
  {
    timestamps: false,
  }
);

const create = async (data) => {
  const id = v4();
  data.id = id;
  // await query(
  //   `INSERT INTO project VALUES ('${id}', '${JSON.stringify(data)}')`
  // );
  await Project.create({
    id,
    data: JSON.stringify(data)
  })

  return id;
};

module.exports = {
  Project,
  create,
};
