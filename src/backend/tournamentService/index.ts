import fastify from 'fastify'
import TournamentService from "./tournament"
import { createSchema, joinSchema, leaveSchema } from './schemas/responseSchema'

const server = fastify()
const tournamentObj = TournamentService

server.post('/create', { schema: createSchema }, async (request, reply) => {
    const { name, description, playerCount, userID, lockTime } = request.body as { name: string, description: string, playerCount: number, userID: number, lockTime: number | undefined }
    const tournament = await tournamentObj.create(name, description, playerCount, userID, lockTime)
    reply.status(201).send(tournament)
})

server.post('/join', { schema: joinSchema }, async (request, reply) => {
    const { tournamentID, userID } = request.body as { tournamentID: number, userID: number }
    const result = await tournamentObj.join(tournamentID, userID)

    switch (result) {
        case 0:
            reply.status(201).send({ 'tournamentID': tournamentID })
            break
        case 1:
            reply.status(400).send({ 'error': `No tournament with ID: ${tournamentID}` })
            break
        case 2:
            reply.status(400).send({ 'error': 'Tournament is full' })
            break
        case 3:
            reply.status(400).send({ 'error': 'You already joined the tournament' })
            break
        case 4:
            reply.status(400).send({ 'error': 'Tournament is already started' })
            break

    }
})

server.post('/leave', { schema: leaveSchema }, async (request, reply) => {
    const { tournamentID, userID } = request.body as { tournamentID: number, userID: number }
    const result = await tournamentObj.leave(tournamentID, userID)

    switch (result) {
        case 0:
            reply.status(201).send({ 'tournamentID': tournamentID })
            break
        case 1:
            reply.status(400).send({ 'error': `No tournament with ID: ${tournamentID}` })
            break
        case 2:
            reply.status(400).send({ 'error': 'You was never in this tournament' })
            break
    }
})

const start = async () => {
    try {
        await server.listen({ port: 3003 });
        console.log(`Server listening at ${server.server.address()}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start();
