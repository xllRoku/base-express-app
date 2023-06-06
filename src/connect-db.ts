import mongoose from 'mongoose';

const connectDb = async () => {
    await mongoose.connect(process.env.DB_URI as string, {
        connectTimeoutMS: 10000,
    });
};

export default connectDb;
