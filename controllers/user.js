import User from '../models/user'

export async function getUsers (req, res) {
  try {
    // write here you code
    res.status(200).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function addUser (req, res) {
  try {

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function deleteUser (req, res) {
  try {
    res.status(404).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}
export async function patchUser (req, res) {
  try {
    res.status(200).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function getUser (req, res) {
  try {
    const { id } = req.query

    res.status(404).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}
