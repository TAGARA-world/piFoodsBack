const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define ('Diet', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { 
        timestamps: false,
        createdAt: false, 
        updatedAt: false,
    })
} 