import Fastify from "fastify";
import { deletePageContent, getPageContent, insertPageContent, updatePageContent } from "./contentDB";
import { DeleteSchema, getContentSchema, InsertSchema, updateContentSchema } from "./schemas/contentSchemas";

const fastify = Fastify({ logger: true });

fastify.get<{ Querystring: GetContentBody }>(
    '/getContent',
    { schema: getContentSchema },
    async (req, reply) => {
    try {
        const { language, textKey } = req.query;

        const row = await getPageContent(language, textKey);
        if (!row) {
            return reply.code(400).send({ error: 'Not found' });
        }
        return reply.send({row});
    } catch (error: any) {
        console.error('Failed to get page content:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
});

fastify.post<{ Body: InsertContentBody }>(
    '/insertContent', 
    { schema: InsertSchema },
    async (req, reply) => {
        try {
            const { language, textKey, body } = req.body;

            const result = await insertPageContent(language, textKey, body);
            switch (result) {
                case 'ALREADY EXISTS':
                    return reply.code(409).send({ error: 'Duplicate found' });
                case 'ERROR':
                    return reply.code(500).send({ error: 'Failed to insert page content' });
                case 'OK':
                    return reply.send({ success: 'Content successfully added' });
                default:
                    return reply.code(500).send({ error: 'Unknown error' });
            }
        } catch (error: any) {
            console.error('Error Inserting page content:', error);
            return reply.code(500).send({ error: 'Internal server Error' });
        }
    });

fastify.patch<{ Body: UpdateContentBody }>(
    '/updateContent', 
    { schema: updateContentSchema }, 
    async (req, reply) => {
    try {
        const { languageOld, languageNew, textKeyOld, textKeyNew, bodyNew } =  req.body ;

        const result = await updatePageContent(languageOld, languageNew, textKeyOld, textKeyNew, bodyNew);
        switch (result) {
            case 'NOT FOUND':
                return reply.code(400).send({ error: 'Not found'});
            case 'DUPLICATE':
                return reply.code(409).send({ error: 'Duplicate found' });
            case 'ERROR':
                return reply.code(500).send({ error: ' Failed to update page content' });
            case 'OK':
                return reply.send({ success: 'Page content updated successfully' });
            default:
                return reply.code(500).send({ error: 'Unkown error' });
        }
    } catch (error: any) {
        console.error('Failed to update page content:', error);
        return reply.code(500).send({ error: 'Internal server error' });
    }
});

fastify.delete<{ Body: DeleteContentBody }>(
    '/deleteContent',
    { schema: DeleteSchema },
    async (req, reply) => {
        try {
            const { language, textKey } = req.body;

            const result = await deletePageContent(language, textKey);
            switch (result) {
                case 'NOT FOUND':
                    return reply.code(400).send({ error: 'Not found' });
                case 'ERROR':
                    return reply.code(500).send({ error: 'Failed to delete page content' });
                case 'OK':
                    return reply.send({ success: 'Page content deleted' });
                default:
                    return reply.code(500).send({ error: 'Unknown error' });
            }
        } catch (error: any) {
            console.error('Failed to delete page content:', error);
            return reply.code(500).send({ error: 'Internal Server Error' });
        }
    });



fastify.listen({ host: '0.0.0.0', port: 3004 }, error => {
    if (error) {
        fastify.log.error((error));
        process.exit(1);
    }
});

interface GetContentBody {
    language: string;
    textKey: string;
}

interface InsertContentBody {
    language: string;
    textKey: string;
    body: string;
}

interface UpdateContentBody {
    languageOld: string;
    languageNew: string;
    textKeyOld: string;
    textKeyNew: string;
    bodyNew: string;
}

interface DeleteContentBody {
    language: string;
    textKey: string;
}