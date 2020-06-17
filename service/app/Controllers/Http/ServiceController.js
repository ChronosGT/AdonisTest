'use strict'
const Service = use('App/Models/Service')

class ServiceController {
  async all({request, response}) {
    const services = await Service.all();
    return response.json(services.toJSON())
  }

  async create ({request, response}) {
    const {name, cost} = request.only([
      'name',
      'cost'
    ])

    const code_name = await Service.toTranslit(name.toLowerCase())

    const nameCheck = await Service
      .query()
      .where('code_name', '=', code_name)
      .fetch()

    if (nameCheck.rows.length)
      return response.send({message: `Ошибка, товар с таким названием уже существует!`})

    await Service.create({
      name: name,
      code_name: code_name,
      cost: cost
    })

    return response.send({message: 'Новый сервис успешно добавлен'})
  }

  async remove ({ params, response }) {
    const services = await Service.find(params.id);
    if (services === null)
      return response.send({message: 'Сервис не найден!'})

    await services.delete()

    const data = {
      name: services.name,
      message: 'Успешно удален!'
    }

    return response.json(data)
  }
}

module.exports = ServiceController
