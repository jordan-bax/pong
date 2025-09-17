import { fastify, FastifyRequest, FastifyReply } from 'fastify'
import TourService from "./tournament"
import {
    createSchema,
    gameDoneSchema,
    getTourSchema,
    getToursSchema,
    joinSchema,
    leaveSchema,
    userTours
} from "../schemas/responseSchema"
import { DBError } from "./tournamentDB"

const DBPATH = process.env.TOURNAMENT_DATABASE_PATH
const { ADDRESS = 'localhost', PORT = '3003' } = process.env;
const server = fastify()
const tour = new TourService

server.get('/tournament/:id',
    { schema: getTourSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string }
            const tournament = await tour.getByID(Number(id))
            reply.status(200).send(tournament)
        } catch (error) {
            console.error('Get tournament by ID error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.get('/user/:id',
    { schema: userTours },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string }
            const tournament = await tour.getUserTours(Number(id))
            reply.status(200).send(tournament)
        } catch (error) {
            console.error('Get users tournament by ID error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.get('/idle',
    { schema: getToursSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const tournament = await tour.idle()
            reply.status(200).send(tournament)
        } catch (error) {
            console.error('Get all idle tours error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.get('/running',
    { schema: getToursSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const tournament = await tour.running()
            reply.status(200).send(tournament)
        } catch (error) {
            console.error('Get all running tours error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.get('/finished',
    { schema: getToursSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const tournament = await tour.finished()
            reply.status(200).send(tournament)
        } catch (error) {
            console.error('Get all finished tours error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.get('/tours',
    { schema: getToursSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const tournament = await tour.allTours()
            reply.status(200).send(tournament)
        } catch (error) {
            console.error('Get all tours error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.post('/create',
    { schema: createSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { name, maxPlayers, userID, lockTime, username } = request.body as {
                name: string,
                maxPlayers: number,
                userID: number,
                lockTime: number | undefined,
                username: string
            }

            const tournament = await tour.create(
                name,
                maxPlayers,
                userID,
                lockTime,
                username)

            reply.status(201).send(tournament)
        } catch (error) {
            console.error('Create tournament error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.post('/join',
    { schema: joinSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { tournamentID, userID, username } = request.body as {
                tournamentID: number,
                userID: number,
                username: string
            }

            await tour.join(tournamentID, userID, username)
            reply.status(201).send({ 'tournamentID': tournamentID })
        } catch (error) {
            console.error('join tournament error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
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

            await tour.leave(tournamentID, userID)
            reply.status(201).send({ 'tournamentID': tournamentID })
        } catch (error) {
            if (error instanceof DBError) {
                console.error('leave tournament error:', error)
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

server.post('/done',
    { schema: gameDoneSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
        const { tournamentID, player1ID, player2ID, player1Score, player2Score } = request.body as {
            tournamentID: number,
            player1ID: number,
            player2ID: number
            player1Score: number,
            player2Score: number
        }

        try {
            await tour.matchDone(
                tournamentID,
                player1ID,
                player2ID,
                player1Score,
                player2Score
            )

            reply.status(201).send({ 'message': 'OK' })
        } catch (error) {
            console.error('done tournament error:', error)
            if (error instanceof DBError) {
                reply.status(500).send({ error: "Internal server error" })
            } else {
                reply.status(400).send({
                    error: error instanceof Error ? error.message : String(error)
                })
            }
        }
    })

const start = async () => {
    try {
        await tour.init(DBPATH)
        await server.listen({ host: ADDRESS, port: parseInt(PORT, 10) });
        const address = server.server.address();
        if (typeof address === 'string') {
            console.log(`Server listening at ${address}`);
        } else {
            console.log(`Server listening at ${address.address}:${address.port}`);
        }
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start();
