'use strict'
const User = use('App/Models/User');

class UserController {

  async register ({request, response}) {
    const {username, email, password} = request.only([
      'username',
      'email',
      'password'
    ])

    const usernameCheck = await User
      .query()
      .where('username', '=', username)
      .fetch()

    if (usernameCheck.rows.length)
      return response.send({message: `Ошибка, пользователь с логином ${username} уже зарегистрирован!`})

    const emailCheck = await User
      .query()
      .where('email', '=', email)
      .fetch()

    if (emailCheck.rows.length)
      return response.send({message: `Ошибка, пользователь с ${email} уже зарегистрирован!`})

    await User.create({
      username: username,
      email: email,
      password: password
  })

    return response.send({message: 'Пользователь успешно создан'})
  }

  async login ({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password']);
    const token = await auth.attempt(email, password);

    return response.json(token);
  }

  async show ({ params, response }) {
    const user = await User.find(params.id);
    if (user === null)
      return response.send({message: 'Пользователь не найден!'})

    const data = {
      username: user.username,
      email: user.email
    }

    return response.json(data)
  }
}

module.exports = UserController
