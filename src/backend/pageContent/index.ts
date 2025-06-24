import Fastify from "fastify";
import { getAllContentOfPage, seedContentDb } from "./contentDB";
import { getContentSchema } from "./schemas/contentSchemas";

interface GetContentBody {
    language: string;
    textKey: string | string[];
}

const fastify = Fastify({ logger: true });

fastify.get<{ Querystring: GetContentBody }>(
    '/getContent',
    { schema: getContentSchema },
    async (req, reply) => {
    try {
        const language: string = req.query.language;
        const textKey: string[] = Array.isArray(req.query.textKey) ? req.query.textKey : [req.query.textKey];
        console.log(`language is [${language}] adn textKey is [${textKey}]`);
        const row = await getAllContentOfPage(language, textKey);
        if (row == 'ERROR') {
            return reply.code(500).send({ error: 'Database error' });
        }
        if (!row) {
            return reply.code(404).send({ error: 'Not found' });
        }
        return reply.send({ row: Object.fromEntries(row) });
    } catch (error: any) {
        console.error('Failed to get page content:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
});

fastify.listen({ host: '0.0.0.0', port: 3004 }, error => {
    seedContentDb();
    if (error) {
        fastify.log.error((error));
        process.exit(1);
    }
});