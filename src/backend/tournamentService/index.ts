import fastify from 'fastify'
import TournamentService from "./tournament"
import { createSchema, gameDoneSchema, joinSchema, leaveSchema } from "./schemas/responseSchema"

const server = fastify()
const tournamentObj = TournamentService

server.post('/create', { schema: createSchema }, async (request, reply) => {
    const { name, description, playerCount, userID, lockTime } = request.body as { name: string, description: string, playerCount: number, userID: number, lockTime: number | undefined }
    const tournament = await tournamentObj.create(name, description, playerCount, userID, lockTime)
    if (tournament === undefined) {
        reply.status(400).send({ 'error': 'playerCount must be even number' })
    } else {
        reply.status(201).send(tournament)
    }
})

server.post('/join', { schema: joinSchema }, async (request, reply) => {
    const { tournamentID, userID } = request.body as { tournamentID: number, userID: number }
    try {
        await tournamentObj.join(tournamentID, userID)
        reply.status(201).send({ 'tournamentID': tournamentID })
    } catch (error) {
        reply.status(400).send({ 'error': error })
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

server.post('/done', { schema: gameDoneSchema }, async (request, reply) => {
    const { tournamentID, playerID1, playerID2, winnerID } = request.body as { tournamentID: number, playerID1: number, playerID2: number, winnerID: number }
    const result = await tournamentObj.matchDone(tournamentID, playerID1, playerID2, winnerID)
    switch (result) {
        case 0:
            reply.status(201).send({ 'message': 'OK' })
            break
        case 1:
            reply.status(400).send({ 'error': 'Invalid tournamentID' })
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
