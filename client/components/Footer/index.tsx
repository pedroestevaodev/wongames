'use client';

import React from 'react';
import * as S from './styles';
import Logo from '../Logo';
import Heading from '../Heading';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

const Footer = () => {
	return (
		<S.FooterContainer>
			<Logo $color="black" />

			<div className="ra-content grid grid-cols-minmax-50 gap-gutter mt-medium md:grid-cols-4">
				<div className="ra-column">
					<Heading
						className="uppercase"
						color="black"
						size="small"
						lineBottom
						lineColor="secondary"
					>
						Contact
					</Heading>

					<Link
						href="#"
						className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
					>
						sac@wongames.com
					</Link>
				</div>

				<div className="ra-column">
					<Heading
						className="uppercase"
						color="black"
						size="small"
						lineBottom
						lineColor="secondary"
					>
						Follow us
					</Heading>

					<nav className="ra-footer-links" aria-labelledby="social media">
						<Link
							href="https://www.instagram.com/won-games"
							className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
							target="_blank"
							rel="noopenner, noreferrer"
						>
							Instagram
						</Link>
						<Link
							href="https://www.twitter.com/won-games"
							className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
							target="_blank"
							rel="noopenner, noreferrer"
						>
							Twitter
						</Link>
						<Link
							href="https://www.youtube.com/won-games"
							className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
							target="_blank"
							rel="noopenner, noreferrer"
						>
							Youtube
						</Link>
						<Link
							href="https://www.facebook.com/won-games"
							className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
							target="_blank"
							rel="noopenner, noreferrer"
						>
							Facebook
						</Link>
					</nav>
				</div>

				<div className="ra-column">
					<Heading
						className="uppercase"
						color="black"
						size="small"
						lineBottom
						lineColor="secondary"
					>
						Links
					</Heading>

					<nav className="ra-footer-links" aria-labelledby="footer resources">
						<Link
							href="/"
							className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
						>
							Home
						</Link>
						<Link
							href="/games"
							className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
						>
							Store
						</Link>
						<Link
							href="/search"
							className="block text-gray no-underline mb-xxsmall text-small hover:underline w-fit"
						>
							Buscar
						</Link>
					</nav>
				</div>

				<div className="ra-column">
					<Heading
						className="uppercase"
						color="black"
						size="small"
						lineBottom
						lineColor="secondary"
					>
						Location
					</Heading>

					<span className="block text-gray no-underline mb-xxsmall text-small w-fit">
						Lorem ipsum dolor sit
					</span>
					<span className="block text-gray no-underline mb-xxsmall text-small w-fit">
						Lorem ipsum
					</span>
					<span className="block text-gray no-underline mb-xxsmall text-small w-fit">
						Lorem, ipsum dolor
					</span>
				</div>
			</div>

			<div className="ra-footer text-gray text-xsmall mt-large mb-medium text-center">
				Won Games {currentYear} © All rights reserved
			</div>
		</S.FooterContainer>
	);
};

export default Footer;
