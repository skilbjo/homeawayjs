module.exports = function(sequelize, DataTypes) {
  var Listing = sequelize.define('Listing', {
    ListingId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true
    },
    Year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Month: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
    Hour: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Paid: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'Listing',
    timestamps: false, 
    classMethods: {
      // associate: function(models) {
      //   Transaction.belongsTo(models.Merchant);
      // }
    }
  }); 
  return Listing;
};