import { fastify, FastifyRequest, FastifyReply } from 'fastify'
import { guestDB, DBError }from "./guestDB.ts"

const db = new guestDB

const DBPATH = process.env.TOURNAMENT_DATABASE_PATH
const { ADDRESS = 'localhost', PORT = '3006' } = process.env;
const server = fastify()

server.get('/create', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const result = await db.create()
            reply.status(200).send(result)
        } catch (error) {
            console.error('updatename error:', error)
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
        await db.initDB(DBPATH)
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
    } finally {
        await db.closeDB()
    }
}
start();
