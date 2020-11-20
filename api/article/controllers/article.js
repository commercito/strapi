'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async search_in_title(ctx) {
        return await runSearch(ctx, 'title')
    },
    async search_in_content(ctx) {
        return await runSearch(ctx, 'content')
    },
};


async function runSearch(ctx, field) {
    let result = false;
    let condition = ['`', field, '`', ' LIKE "%', ctx.query._q, '%"'].join('');

    condition = condition.toLowerCase();

    try {
        if (ctx.query._q) {
            result = await strapi
                .query('article')
                .model.query(qb => {
                    qb.whereRaw(condition);
                })
                .fetchAll();
        }
    } catch (err) {
        return ctx.badRequest('ValidationError', err);
    }

    return result;
}
