const console = require("console")

const { fastify, FastifyRequest, FastifyReply } = require('fastify')
const TourService = require("./tournament")
const { createSchema, gameDoneSchema, joinSchema, leaveSchema, getTourSchema, getToursSchema } = require("./schemas/responseSchema")

const server = fastify()
const tournamentObj = new TourService

server.get('/id/:id', { schema: getTourSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const { id } = request.params as { id: string }
        const tournament = await tournamentObj.getByID(Number(id))
        reply.status(200).send(tournament)
    } catch (error) {
        reply.status(400).send({ error: error instanceof Error ? error.message : String(error) })
    }
})

server.get('/idle', { schema: getToursSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const tournament = await tournamentObj.idle()
        reply.status(200).send(tournament)
    } catch (error) {
        reply.status(400).send({ error: error instanceof Error ? error.message : String(error) })
    }
})

server.get('/running', { schema: getToursSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const tournament = await tournamentObj.running()
        reply.status(200).send(tournament)
    } catch (error) {
        reply.status(400).send({ error: error instanceof Error ? error.message : String(error) })
    }
})

server.get('/finished', { schema: getToursSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const tournament = await tournamentObj.finished()
        reply.status(200).send(tournament)
    } catch (error) {
        reply.status(400).send({ error: error instanceof Error ? error.message : String(error) })
    }
})

server.get('/tours', { schema: getToursSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const tournament = await tournamentObj.allTournaments()
        reply.status(200).send(tournament)
    } catch (error) {
        reply.status(400).send({ error: error instanceof Error ? error.message : String(error) })
    }
})

server.post('/create', { schema: createSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const { name, description, maxPlayers, userID, lockTime } = request.body as { name: string, description: string, maxPlayers: number, userID: number, lockTime: number | undefined }
        const tournament = await tournamentObj.create(name, description, maxPlayers, userID, lockTime)
        reply.status(201).send(tournament)
    } catch (error) {
        reply.status(400).send({ error: error instanceof Error ? error.message : String(error) })
    }
})

server.post('/join', { schema: joinSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const { tournamentID, userID } = request.body as { tournamentID: number, userID: number }
        await tournamentObj.join(tournamentID, userID)
        reply.status(201).send({ 'tournamentID': tournamentID })
    } catch (error) {
        reply.status(400).send({ 'error': error })
    }
})

server.post('/leave', { schema: leaveSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
    try {
        const { tournamentID, userID } = request.body as { tournamentID: number, userID: number }
        await tournamentObj.leave(tournamentID, userID)
        reply.status(201).send({ 'tournamentID': tournamentID })
    } catch (error) {
        reply.status(400).send({ 'error': error })
    }
})

// server.post('/done', { schema: gameDoneSchema }, async (request: typeof FastifyRequest, reply: typeof FastifyReply) => {
//     const { tournamentID, playerID1, playerID2, winnerID } = request.body as { tournamentID: number, playerID1: number, playerID2: number, winnerID: number }
//     const result = await tournamentObj.matchDone(tournamentID, playerID1, playerID2, winnerID)
//     switch (result) {
//         case 0:
//             reply.status(201).send({ 'message': 'OK' })
//             break
//         case 1:
//             reply.status(400).send({ 'error': 'Invalid tournamentID' })
//     }
// })

// endpoint notification [{'timestamp', 'message: str'}] leeg als er niks is

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
