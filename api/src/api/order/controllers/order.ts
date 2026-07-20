/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import * as cartUtils from "../../../utils/cart";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export default factories.createCoreController(
    'api::order.order',
    ({ strapi }) => ({
        async createPaymentIntent(ctx) {
            const { cart } = ctx.request.body;

            if (!cart || cart.length === 0) {
                ctx.response.status = 400;
                return { error: "Cart is empty or invalid" };
            }

            let cartGamesIds = null;
            try {
                cartGamesIds = await cartUtils.cartGamesIds(cart);
            } catch (err) {
                ctx.response.status = 500;
                return { error: "Error retrieving cart games IDs" };
            }

            if (!cartGamesIds || cartGamesIds.length === 0) {
                ctx.response.status = 404;
                return { error: "No valid games found!" };
            }

            const games = await cartUtils.cartItems(cartGamesIds);

            if (!games.length) {
                ctx.response.status = 404;
                return { error: "No valid games found!!" };
            }

            const total = await cartUtils.total(games);

            if (total === 0) return { freeGames: true };

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: total,
                    currency: "usd",
                    metadata: { cart: JSON.stringify(cartGamesIds) },
                });

                return paymentIntent;
            } catch (err) {
                return { error: err.message };
            }
        },

        async create(ctx) {
            const { cart, paymentIntentId, paymentMethod } = ctx.request.body;

            if (!cart || cart.length === 0) {
                ctx.response.status = 400;
                return { error: "Cart is empty or invalid" };
            }

            const token = await strapi.plugin("users-permissions").service("jwt").getToken(ctx);

            if (!token) {
                return ctx.unauthorized("User not authenticated");
            }

            const userId = token.id;

            const userInfo = await strapi.entityService.findMany("plugin::users-permissions.user", {
                filters: { id: userId },
                limit: 1,
            });

            if (!userInfo.length) return ctx.badRequest("User not found");

            const cartGamesIds = await cartUtils.cartGamesIds(cart);
            const games = await cartUtils.cartItems(cartGamesIds);
            const total_in_cents = await cartUtils.total(games);

            let paymentInfo = null;
            if (total_in_cents !== 0) {
                try {
                    paymentInfo = await stripe.paymentMethods.retrieve(paymentMethod);
                } catch (err) {
                    ctx.response.status = 402;
                    return { error: err.message };
                }
            }

            const entry = await strapi.db.query("api::order.order").create({
                data: {
                    total_in_cents,
                    payment_intent_id: paymentIntentId,
                    card_brand: paymentInfo?.card?.brand,
                    card_last4: paymentInfo?.card?.last4,
                    user: userId,
                    games: games.map((game) => game.id),
                },
            });

            try {
                await strapi.plugin("email-designer-5").service("email").sendTemplatedEmail(
                    {
                        to: userInfo[0].email,
                        from: "no-reply@wongames.com",
                    },
                    {
                        templateReferenceId: 1,
                    },
                    {
                        USER: userInfo[0],
                        payment: {
                            total: `$ ${total_in_cents / 100}`,
                            card_brand: entry.card_brand,
                            card_last4: entry.card_last4,
                        },
                        games,
                    }
                );
            } catch (emailErr) {
                console.error("Error sending email:", emailErr);
            }

            return entry;
        }
    }),
);
