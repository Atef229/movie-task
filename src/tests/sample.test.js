const request = require('supertest');
const app = require('../server');


describe('comment Endpoints', () => {
    it('should create a new comment', async () => {
        const res = await request(app)
                .post('/api/comments')
                .send({
                    userId: 1,
                    postId: 1,
                    comment: 'test',
                })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('comment')
    })
})

// test("GET /api/posts", async () => {
//     const post = await Post.create({ title: "Post 1", content: "Lorem ipsum" });
  
//     await supertest(app).get("/api/posts")
//       .expect(200)
//       .then((response) => {
//         // Check type and length
//         expect(Array.isArray(response.body)).toBeTruthy();
//         expect(response.body.length).toEqual(1);
  
//         // Check data
//         expect(response.body[0]._id).toBe(post.id);
//         expect(response.body[0].title).toBe(post.title);
//         expect(response.body[0].content).toBe(post.content);
//       });
//   });

// it('gets the test endpoint', async done => {
//     const response = await request.get('/test')
  
//     expect(response.status).toBe(200)
//     expect(response.body.message).toBe('pass!')
//     done()
//   })

// describe('Todos list API Integration Tests', function() {
//     describe('#GET / users', function() { 
//         it('should get all users', function(done) { 
//             request(app) .get('/users')
//                     .end(function(err, res) { 
//                         expect(res.statusCode).to.equal(200); 
//                         expect(res.body).to.be.an('array'); 
//                         expect(res.body).to.be.empty; 
//                         done(); 
//                     }); 
//         });
//     });
// });