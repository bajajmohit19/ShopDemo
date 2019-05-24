import 'babel-polyfill';
import User from '../app/controllers/user'

process.env.NODE_ENV = 'test';
// process.env['NODE_ENV'] = 'test';

// const User = require('../app/controllers/user');
const AdminUser = {
  email: 'admin@scizers.com',
  password: '12345678',
}
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

const should = chai.should();
const assert = chai.assert
const expect = chai.expect
chai.use(chaiHttp);
let JWT = {}

describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err, res) => {
      console.error(err, res, ' err ,res')
      done();
    });
  });
});

describe('general setup', () => {
  it('it should GET a valid response', (done) => {
    chai.request(app)
      .get('/ping')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a('string');
        res.text.should.be.eql('pong');
        done();
      });
  });

  it('remove all users', async () => {
    const user = await User.removeAll()
    expect(user).to.be.a('object');
    expect(user.error).to.be.a('boolean');
    assert.equal(user.error, false, 'expected error to be false');
  })

  it('it should add new admin user', async () => {

    const user = await User.add({
      ...AdminUser,
      userType: 'admin'
    })

    expect(user).to.be.a('object');
    expect(user.error).to.be.a('boolean');

    assert.equal(user.error, false, 'expected error to be false');
  })

  it('it should login admin user', (done) => {

    chai.request(app)
      .post('/login')
      .send({
        ...AdminUser
      })
      .end((err, res) => {
        // console.log(err, res)
        res.should.have.status(200);
        res.body.should.be.a('object');

        const user = res.body
        assert.equal(user.error, false, 'expected error to be false');
        JWT = {Authorization: `Bearer ${user.token}`}
        done();
      });


  })

});

describe('Users Functions', () => {
  it('it should GET all the users', (done) => {
    chai.request(app)
      .get('/user')
      .set(JWT)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        // console.log(res.body)
        // res.body.data.should.be.a('array');
        // res.body.data.length.should.be.eql(1);
        done();
      });
  });
});
