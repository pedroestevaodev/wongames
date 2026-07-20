import { BannerProps } from '@/components/Banner';
import { GameCardProps } from '@/components/GameCard';
import { HighlightProps } from '@/components/Highlight';
import {
	BannerFragmentFragment,
	GameFragmentFragment,
	HighlightFragmentFragment,
} from '@/graphql/generated/graphql';
import { formatImageUrl, formatPrice } from "../formats";
import { OrdersFragmentFragment } from "@/@types/graphql-extended";
import { OrderProps } from "@/components/OrdersList";

export const bannerMapper = (banners: BannerFragmentFragment[]) => {
	return (
		(banners.map((banner) => ({
			img: `${banner.image.url}`,
			title: banner.title || '',
			subTitle: banner.subTitle || '',
			buttonLabel: banner.button?.label || '',
			buttonLink: banner.button?.link || '',
			...(banner.ribbon && {
				ribbon: banner.ribbon?.text || null,
				ribbonColor: banner.ribbon?.color || null,
				ribbonSize: banner.ribbon?.size || null
			})
		})) as BannerProps[]) || []
	);
};

export const gamesMapper = (games: GameFragmentFragment[]) => {
	return (
		(games.map((game) => ({
			id: game.id,
			title: game.name,
			slug: game.slug,
			developer: game.developers?.length ? game.developers[0]?.name : 'Unknown',
			img: formatImageUrl(game.cover?.url),
			price: game.price
		})) as GameCardProps[]) || []
	);
};

export const highlightMapper = (highlight: HighlightFragmentFragment | null | undefined) => {
	if (!highlight) return {} as HighlightProps;

	return (
		({
			title: highlight.title,
			subTitle: highlight.subTitle,
			backgroundImage: formatImageUrl(highlight.background?.url),
			floatImage: formatImageUrl(highlight.floatImage?.url),
			buttonLabel: highlight.buttonLabel,
			buttonLink: highlight.buttonLink,
			alignment: highlight.alignment
		} as HighlightProps)
	);
};

export const cartMapper = (games: GameFragmentFragment[]) => {
	return games ? games.map((game) => ({
		id: game.id,
		title: game.name,
		img: formatImageUrl(game.cover?.url),
		price: formatPrice(game.price),
	})) : [];
};

export const ordersMapper = (orders: OrdersFragmentFragment[] | undefined) => {
	return orders ? orders.map((order) => {
		return {
			id: order.id,
			paymentInfo: {
				flag: order.card_brand,
				img: order.card_brand ? `/img/${order.card_brand}.png` : null,
				number: order.card_last4
					? `**** **** **** ${order.card_last4}`
					: 'Free Game',
				purchaseDate: `Purchase made on ${new Intl.DateTimeFormat('en-US', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				}).format(new Date(order.createdAt))}`
			},
			games: (order.games as GameFragmentFragment[]).map((game) => ({
				id: game.id,
				title: game.name,
				downloadLink: 'https://wongames.com/game/download/yuYT56Tgh431LkjhNBgdf',
				img: `${formatImageUrl(game.cover?.url)}`,
				price: formatPrice(game.price)
			}))
		}
	}) as OrderProps[] : [];
};
