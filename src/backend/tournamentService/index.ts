import { fastify, FastifyRequest, FastifyReply } from 'fastify'
import TourService from "./tournament"
import {
    createSchema,
    gameDoneSchema,
    joinSchema,
    leaveSchema,
    getTourSchema,
    getToursSchema,
    notificationSchema
} from "./schemas/responseSchema"
import { DBError } from "./tournamentDB"

const server = fastify()
const tournamentObj = new TourService

server.get('/tournament/:id',
           { schema: getTourSchema },
           async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string }
        const tournament = await tournamentObj.getByID(Number(id))
        reply.status(200).send(tournament)
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.get('/user/:id',
           async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as { id: string }
        const tournament = await tournamentObj.getUserTours(Number(id))
        reply.status(200).send(tournament)
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.get('/notifactions',
           { schema: notificationSchema },
           async (request: FastifyRequest, reply: FastifyReply) => {
    const notifactions = await tournamentObj.getNotifications()
    reply.status(200).send(notifactions)
})


server.get('/idle',
           { schema: getToursSchema },
           async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tournament = await tournamentObj.idle()
        reply.status(200).send(tournament)
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.get('/running',
           { schema: getToursSchema },
           async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tournament = await tournamentObj.running()
        reply.status(200).send(tournament)
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.get('/finished',
           { schema: getToursSchema },
           async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tournament = await tournamentObj.finished()
        reply.status(200).send(tournament)
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.get('/tours',
           { schema: getToursSchema },
           async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const tournament = await tournamentObj.allTournaments()
        reply.status(200).send(tournament)
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.post('/create',
            { schema: createSchema },
            async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { name, maxPlayers, userID, lockTime } = request.body as {
            name: string,
            maxPlayers: number,
            userID: number,
            lockTime: number | undefined
        }

        const tournament = await tournamentObj.create(
            name,
            maxPlayers,
            userID,
            lockTime)

        reply.status(201).send(tournament)
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.post('/join',
            { schema: joinSchema },
            async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { tournamentID, userID } = request.body as {
            tournamentID: number,
            userID: number
        }

        await tournamentObj.join(tournamentID, userID)
        reply.status(201).send({ 'tournamentID': tournamentID })
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.post('/leave',
            { schema: leaveSchema },
            async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { tournamentID, userID } = request.body as {
            tournamentID: number,
            userID: number
        }

        await tournamentObj.leave(tournamentID, userID)
        reply.status(201).send({ 'tournamentID': tournamentID })
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

server.post('/done',
            { schema: gameDoneSchema },
            async (request: FastifyRequest, reply: FastifyReply) => {
    const {
        tournamentID,
        player1ID,
        player2ID,
        winnerID,
        player1Score,
        player2Score } = request.body as {
            tournamentID: number,
            player1ID: number,
            player2ID: number,
            winnerID: number,
            player1Score: number,
            player2Score: number
        }

    try {
        await tournamentObj.matchDone(
            tournamentID,
            player1ID,
            player2ID,
            winnerID,
            player1Score,
            player2Score
        )

        reply.status(201).send({ 'message': 'OK' })
    } catch (error) {
        if (error instanceof DBError) {
            reply.status(500).send({ error: "Internal server error" })
        } else {
            reply.status(400).send({
                error: error instanceof Error ? error.message : String(error) })
        }
    }
})

const start = async () => {
    try {
        await tournamentObj.init()
        await server.listen({ port: 3003 });
        console.log(`Server listening at ${server.server.address()}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start();
