import request from 'supertest'
import { Connection, Migration } from 'typeorm'
import createConnection from '../../database'
import { app } from '../../app'

describe('Users', function () {
  let migrations: Migration[]
  let connection: Connection
  let userId: string

  beforeAll(async () => {
    try {
      connection = await createConnection()
    } catch (error) { console.log(error) }

    try {
      migrations = await connection.runMigrations()
    } catch (error) { console.log(error) }
  })

  afterAll(async () => {
    for (const _migration of migrations) {
      try {
        await connection.undoLastMigration()
      } catch (error) { console.log(error) }
    }

    try {
      await connection.close()
    } catch (error) { console.log(error) }
  })

  it('Should be able to create a new user.', done => {
    request(app)
      .post('/users')
      .send({
        username: 'user-example',
        email: 'user@example.com',
        password: '1234abcd'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        expect(response.body.message).toEqual('User created successfully.')
        done()
      })
      .catch(error => done(error))
  })

  it('Should be able to get all users.', done => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.message[0].username).toEqual('user-example')
        expect(response.body.message[0].email).toEqual('user@example.com')
        userId = response.body.message[0].id
        done()
      })
      .catch(error => done(error))
  })

  it('Should be able to get a user.', done => {
    request(app)
      .get('/users/' + userId)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.message.username).toEqual('user-example')
        expect(response.body.message.email).toEqual('user@example.com')
        done()
      })
      .catch(error => done(error))
  })

  it('Should be able to update a user.', done => {
    request(app)
      .patch('/users/' + userId)
      .send({
        username: 'user-example-2',
        email: 'user-2@example.com'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.message).toEqual('User updated successfully.')
        done()
      })
      .catch(error => done(error))
  })

  it('Should be able to delete a user.', done => {
    request(app)
      .delete('/users/' + userId)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.message).toEqual('User deleted successfully.')
        done()
      })
      .catch(error => done(error))
  })
})