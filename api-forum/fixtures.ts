import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import {Post} from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('posts');
        await db.dropCollection('comments');
        await db.dropCollection('users');
    } catch (error) {
        console.log('Skipping drop...');
    }

    const firstUser = await User.create({
        username: 'admin',
        password: 'admin',
        token: randomUUID(),
    });

    const secondUser = await User.create({
        username: 'user',
        password: 'user',
        token: randomUUID(),
    });

    const [post1, post2] = await Post.create(
        {
            title: 'Эксперты назвали топ-10 технологий, которые в 2025 году изменят мир',
            image: 'post2.jpg',
            user: secondUser,
        },
        {
            title: 'Интерес российских IT-компаний к рынку Кыргызстана растет',
            image: 'fixtures/post1.JPG',
            description: 'Все больше российских компаний интересуется рынками Центральной Азии, особенно Кыргызстана. В прошедшем году торгпредство организовало и провело более 100 различных мероприятий для российских и кыргызстанских организаций',
            user: firstUser,
        },
    );

    await Comment.create(
        {
            user: firstUser,
            post: post1,
            text: 'Это большой прорыв в мире технологий',
        },
        {
            user: secondUser,
            post: post2,
            text: 'Очень хорошая новость для КР IT индустрий',
        },
        {
            user: secondUser,
            post: post1,
            text: 'Программисты лишь убивают самих себя создавая ИИ',
        },
        {
            user: firstUser,
            post: post2,
            text: 'Это создаст больше рабочих мест для программистов',
        },
    );

    await db.close();
};

void run();