const cartGamesIds = async (cart) => {
    return cart.map((game) => ({
        documentId: game.id,
    }));
};

const cartItems = async (cart) => {
    let games = [];

    for (const game of cart) {
        const validatedGame = await strapi.query('api::game.game').findOne({
            where: { documentId: game.documentId },
        });

        if (validatedGame) {
            games.push(validatedGame);
        }
    }

    return games;
};

const total = async (games) => {
    const amount = games.reduce((acc, game) => acc + game.price, 0);

    return Number((amount * 100).toFixed(0));
};

export {
    cartGamesIds,
    cartItems,
    total,
};