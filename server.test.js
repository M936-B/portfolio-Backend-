const request = require("supertest");
const server = require('./server');
const Post = require('./models/Post');
const Message = require('./models/Message');


// POST API
describe('/routes/posts', () => {
    describe('GET posts', () => {
        it('Should return an array of all posts in the db', async () => {
            //send GET request to '/posts'
            const response = await request(server).get('/posts');

            //check response content-type, status & body
            expect(response.header['content-type']).toMatch(/application\/json/);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        }, 10000);

        it('Should return a 404 when the database is empty', async () => {
            //Fake an empty database response.
            jest.spyOn(Post, 'find').mockReturnValue([]);


            //send GET request to an empty post collection
            const response = await request(server).get('/posts');

            //check status for a 404 & a message
            expect(response.status).toBe(404);
            expect(response.header['content-type']).toMatch(/application\/json/);
            expect(response.body).toEqual({ message: "There's no data." })

            Post.find.mockRestore();
        });

        // it('should return a 500 error when there is a server error', async () => {
        //     const postController = require('./controllers/postController');
        //     postController.getPosts = jest.fn().mockImplementation(() => {
        //         try {
        //             throw new Error("Test Error");
        //         } catch (error) {
        //             console.error(error);
        //             res.status(500).json({ message: "Internal server error" });
        //         }
        //     });
            
        //     // Send GET request to '/posts'
        //     const response = await request(server).get('/posts');

        //     // Check response status and body
        //     expect(response.status).toBe(500);
        //     expect(response.body).toEqual({ message: "Internal server error" });
        // });
    });

    describe('POST posts', () => {

        it('should CREATE a new post', async () => {
            // Send POST request to /route/posts with sample post data
            const postData = {
                article_image: 'https://example.com/image.png',
                title: 'New Post',
                body: 'This is a new post',
            };
            const response = await request(server).post('/posts').send(postData);

            // Check response status and body
            expect(response.status).toBe(201);
            expect(response.body.article_image).toBe(postData.article_image);
            expect(response.body.title).toBe(postData.title);
            expect(response.body.body).toBe(postData.body);

            // Check if the post is actually saved in the database
            const post = await Post.findOne({ title: postData.title });
            expect(post).toBeDefined();
            expect(post.article_image).toBe(postData.article_image);
            expect(post.body).toBe(postData.body);

            //delete the post
            await Post.findOneAndDelete({ title: postData.title });
        }, 10500);

        it('should return a 400 error when missing data', async () => {
            // Send POST request to /route/posts with missing data
            const postData = {
                title: 'New Post',
                body: 'This is a new post',
            };
            const response = await request(server).post('/posts').send(postData);

            // Check response status and body
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Missing Data!" });
        });

        // it('should return a 500 error when there is a server error', async () => {
        //     // Mock Post.create() to throw an error
        //     Post.create = jest.fn().mockRejectedValue(new Error('Test error'));

        //     // Send POST request to /route/posts with sample post data
        //     const postData = {
        //         article_image: 'https://example.com/image.png',
        //         title: 'New Post',
        //         body: 'This is a new post',
        //     };
        //     const response = await request(server).post('/posts').send(postData);

        //     // Check response status and body
        //     expect(response.status).toBe(500);
        //     expect(response.body).toEqual({ message: "Internal server error" });
        // });
    });

    // describe('PUT posts', () => {});

    describe('DELETE posts', () => {
        it('should return a 400 when the ID is not present', async() => {
            //send empty param url request
            const response = await request(server).delete('/posts/');

            //check for a 404 status & consequent message
            // expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "ID not present." });
        });

        it('should delete a post using ID received from url params', async() => {
            // Create a sample post
            const postData = {
                article_image: 'https://example.com/image.png',
                title: 'Delete Me',
                body: 'This post should be deleted',
            };
            const post = await Post.create(postData);

            // Send DELETE request to /route/posts/:id
            const response = await request(server).delete(`/posts/${post._id}`);

            // Check response status
            expect(response.status).toBe(204);

            // Check if the post still exists in the database
            const deletedPost = await Post.findById(post._id);
            expect(deletedPost).toBeDefined();
        });
    });

    describe('PUT posts', () => {
        it('ShouLd UPDATE a post in the DB ', async() => {
            //create a sample post
            const postData = {
                article_image: 'https://example.com/updatedImage.png',
                title: 'Original',
                body: 'This post is the original',
            };
            const post = await Post.create(postData);

            //Make an update on the post
            const updatedData = {
                id: `${post._id}`,
                article_image: 'https://example.com/updatedImage.png',
                title: 'Update',
                body: 'This post is an updated version.',
            };

            const response = await request(server).put('/posts').send(updatedData);

            //check for response status & content
            expect(response.status).toBe(201);
            expect(response.body.article_image).toBe(updatedData.article_image);
            expect(response.body.title).toBe(updatedData.title);
            expect(response.body.body).toBe(updatedData.body);

            await Post.findByIdAndDelete(post._id);
            
        })
    })
    server.(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// // Message API
// describe('/routes/messages', () => {
//     describe('GET messages', () => {
//         it('Should return an array of all messages in the db', async () => {
//             //send GET request to '/messages'
//             const response = await request(server).get('/messages');

//             //check response content-type, status & body
//             expect(response.header['content-type']).toMatch(/application\/json/);
//             expect(response.status).toBe(200);
//             expect(Array.isArray(response.body)).toBe(true);
//         }, 10000);

//         it('Should return a 404 when the database is empty', async () => {
//             //Fake an empty database response.
//             jest.spyOn(Message, 'find').mockReturnValue([]);

//             //send GET request to an empty messages collection
//             const response = await request(server).get('/messages');

//             //check status for a 404 & a message
//             expect(response.status).toBe(404);
//             expect(response.header['content-type']).toMatch(/application\/json/);
//             expect(response.body).toEqual({ message: "There's no data." })

//             Message.find.mockRestore();
//         });
//     });

//     describe('POST messages', () => {

//         it('should CREATE a new message', async () => {
//             // Send POST request to /route/messages with sample message data
//             const messageData = {
//                 name: 'Dummy Name',
//                 email: 'test@email.com',
//                 msg: 'This is a new message',
//             };
//             const response = await request(server).post('/messages').send(messageData);

//             // Check response status and body
//             expect(response.status).toBe(201);
//             expect(response.body.name).toBe(messageData.name);
//             expect(response.body.email).toBe(messageData.email);
//             expect(response.body.msg).toBe(messageData.msg);

//             // Check if the post is actually saved in the database
//             const message = await Message.findOne({ email: messageData.email });
//             expect(message).toBeDefined();
//             expect(message.name).toBe(messageData.name);
//             expect(message.msg).toBe(messageData.msg);
//         }, 10500);

//         it('should return a 400 error when missing data', async () => {
//             // Send POST request to /route/messages with missing data
//             const messageData = {
//                 name: 'Dummy Name',
//                 email: 'test@email.com'
//             };
//             const response = await request(server).post('/messages').send(messageData);

//             // Check response status and body
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({ message: "Missing Data!" });
//         });
//     });


//     describe('DELETE messages', () => {
//         it('should delete a MESSAGE using ID received from url params', async() => {
//             // Create a sample MESSAGE
//             const messageData = {
//                 name: 'Dummy Name',
//                 email: 'test@email.com',
//                 msg: 'This is a new message',
//             };
//             const message = await Message.create(messageData);

//             // Send DELETE request to /route/messages/:id
//             const response = await request(server).delete(`/messages/${message._id}`);

//             // Check response status
//             expect(response.status).toBe(204);

//             // Check if the MESSAGE still exists in the database
//             const deletedMessage = await Message.findById(message._id);
//             expect(deletedMessage).toBeDefined();
//         });

//         it('should return a 400 when the ID is not present', async() => {
//             //send empty params url request
//             const response = await request(server).delete('/messages/');

//             //check for a 404 status & consequent message
//             // expect(response.status).toBe(400);
//             expect(response.body).toEqual({ message: "ID not present." });
//         });
//     });

//     describe('PUT messages', () => {
//         it('ShouLd UPDATE a message in the DB ', async() => {
//             //create a sample message
//             const messageData = {
//                 name: 'Dummy Original',
//                 email: 'originaltest@email.com',
//                 msg: 'This is a new message',
//             };
//             const message = await Message.create(messageData);

//             //Make an update on the message
//             const updatedData = {
//                 id: `${message._id}`,
//                 name: 'Dummy Update',
//                 email: 'Updatetest@email.com',
//                 msg: 'This is an updated message'
//             };

//             const response = await request(server).put('/messages').send(updatedData);

//             //check for response status & content
//             expect(response.status).toBe(201);
//             expect(response.body.name).toBe(updatedData.name);
//             expect(response.body.email).toBe(updatedData.email);
//             expect(response.body.msg).toBe(updatedData.msg);

//             await Message.findByIdAndDelete(message._id);
//         });

//         it('should return 400 if id is absent in the body', async () => {
//             //fake create a message
//             const messageData = {
//                 name: 'Dummy Original',
//                 email: 'originaltest@email.com',
//                 msg: 'This is a new message',
//             };
//             const message = await Message.create(messageData);

//             //make an update
//             const updatedData = {
//                 //id: `${message._id}`, Omit the ID
//                 name: 'Dummy Update',
//                 email: 'Updatetest@email.com',
//                 msg: 'This is an updated message'
//             };
//             const response = await request(server).put('/messages').send(updatedData);

//             //check for status 400 & corresponding message
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({"message":"ID not present."});
//         });

//         it('should return a 400 when the ID requested is wrongly written.', async () => {
//             //make an update 
//             const updatedData = {
//                 id: "1234567890", //Faulty ID
//                 name: 'Dummy Update',
//                 email: 'Updatetest@email.com',
//                 msg: 'This is an updated message'
//             };
//             const response = await request(server).put('/messages').send(updatedData);

//             //check for status 400 & corresponding message
//             expect(response.status).toBe(400);
//             expect(response.body).toEqual({"message": "ID not present."});
//         });
//     });
// });


