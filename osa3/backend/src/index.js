require("dotenv").config()
const express = require("express")
var morgan = require("morgan")
const cors = require("cors")
const PhoneBook = require("./models/phoneBook")

const app = express()

morgan.token("body", (req) => JSON.stringify(req.body))

app.use(express.static("build"))
app.use(express.json())
app.use(morgan(":method :url :status - :response-time ms :body"))
app.use(cors())

app.get("/info", (req, res) => {
  PhoneBook.find({}).then((persons) => {
    res.send(
      `<div><p>Phonebook has info for ${
        persons.length
      } people</p><p>${Date().toString()}</p></div>`
    )
  })
})

app.get("/api/persons", (request, response, next) => {
  PhoneBook.find({})
    .then((persons) => response.json(persons))
    .catch((e) => {
      next(e)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
  PhoneBook.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((e) => {
      next(e)
    })
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  PhoneBook.findByIdAndUpdate(request.params.id, person, {
      new: true
    })
    .then((updatedPerson) => updatedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson)
    })
    .catch((e) => {
      next(e)
    })
})

app.delete("/api/persons/:id", (request, response, next) => {
  PhoneBook.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const person = new PhoneBook({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((newPerson) => newPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson)
    })
    .catch((e) => {
      next(e)
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id"
    })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)