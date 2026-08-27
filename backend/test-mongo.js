const mongoose = require('mongoose');

const uri = "mongodb+srv://noreplyekprayas_db_user:NGO_EK_PRAYASS%40321@ekprayss.ceaid1u.mongodb.net/?appName=Ekprayss";

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("SUCCESSFULLY CONNECTED WITH ENCODED PASSWORD!");
    process.exit(0);
  })
  .catch(err => {
    console.error("FAILED TO CONNECT:", err.message);
    process.exit(1);
  });
