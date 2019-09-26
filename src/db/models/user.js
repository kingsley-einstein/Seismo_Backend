import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeSave: (user) => {
        if (user.changed('password')) {
          const salt = bcrypt.genSaltSync(15);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  });

  User.updateById = (update, id) => User.update(update, {
    where: {
      id
    }
  });
  return User;
};
