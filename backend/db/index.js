import mongoose from "mongoose";

const connect = async (req, res) => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongodb connection succssfull...");
  } catch (e) {
    console.log("Mongodb connection failed...", e);
  }
};

export default connect;
