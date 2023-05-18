import mongoose from 'mongoose';

export const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@blog-web-app.jka9gry.mongodb.net/?retryWrites=true&w=majority`;
    try {

        await mongoose.connect(URL, { useNewUrlParser: true });

        console.log('Database connected successfully');
    }

    catch (error) {
        console.log('Error while connecting wih the database', error);
    }
}
export default Connection;