const config = require('config');
const ServiceError = require('./serviceError');
const bodyParser = require('koa-bodyparser');
const koaCors = require('@koa/cors');
const emoji = require('node-emoji');
const koaHelmet = require('koa-helmet');
const { getLogger } = require('./logging');
const AuthError = require('./authError');

const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');

const NODE_ENV = config.get('env');

module.exports = function installMiddleware(app) {
    app.use(
        koaCors({
            origin: (ctx) => {
                if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
                    return ctx.request.header.origin;
                }
                return CORS_ORIGINS[0];
            },
            allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
            maxAge: CORS_MAX_AGE,
        })
    );

    app.use(async (ctx, next) => {
        getLogger().info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);
      
        const getStatusEmoji = () => {
            if (ctx.status >= 500) return emoji.get('skull');
            if (ctx.status >= 400) return emoji.get('x');
            if (ctx.status >= 300) return emoji.get('rocket');
            if (ctx.status >= 200) return emoji.get('white_check_mark');
            return emoji.get('rewind');
        };
      
        try {
            await next();
      
            getLogger().info(
                `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`
            );
        } catch (error) {
            getLogger().error(
                `${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`,
                {
                error,
                }
            );
            throw error;
        }
    });

    app.use(bodyParser());

    app.use(koaHelmet());

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            getLogger().error('Error occured while handling a request', {error});
            let statusCode = error.status || 500;
            let errorBody = {
                code: error.code || 'INTERNAL_SERVER_ERROR',
                message: error.message,
                details: error.details || {},
                stack: NODE_ENV !== 'production' ? error.stack : undefined
            };

            if(error instanceof ServiceError) {
                if (error.isNotFound) {
                    statusCode = 404;
                }

                if (error.isValidationFailed) {
                    statusCode = 400;
                }

                if(error.isNoConnection) {
                    statusCode = 503;
                }
            }

            if(error instanceof AuthError) {
                if (error.isInvalidCredentials){
                    statusCode = 401;
                }

                if (error.isInvalidToken){
                    statusCode = 498;
                }

                if(error.isNotSignedIn){
                    statusCode = 401;
                }
            }

            ctx.status = statusCode;
            ctx.body = errorBody;
        }
    });

    app.use(async (ctx, next) => {
        await next();

        if(ctx.status === 404){
            ctx.status = 404;
            ctx.body = {
                code: 'NOT_FOUND',
                message: `Unknown resource: ${ctx.url}`,
            };
        }
    });

}