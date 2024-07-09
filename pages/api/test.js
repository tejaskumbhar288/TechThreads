import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    res.status(200).json({ message: 'Connected to MongoDB!' });
};

export default connectDb(handler);
