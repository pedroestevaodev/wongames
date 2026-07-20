import React from "react";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/public/styles/global";
import ApolloProviderWrapper from "./apolloProvider";
import ThemeProviderWrapper from "./themeProvider";
import { CartProvider } from "@/hooks/useCart";
import NextProgressbar from "../NextProgressbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/services/auth";
import { WishlistProvider } from "@/hooks/useWishlist";
import ModalProvider from "./modalProvider";

const Providers = async ({ children }: React.PropsWithChildren) => {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<StyledComponentsRegistry>
				<ApolloProviderWrapper>
					<ThemeProviderWrapper>
						<CartProvider>
							<WishlistProvider>
								<ModalProvider>
									<GlobalStyles removeBg={false} />
									<NextProgressbar />
									{children}
								</ModalProvider>
							</WishlistProvider>
						</CartProvider>
					</ThemeProviderWrapper>
				</ApolloProviderWrapper>
			</StyledComponentsRegistry>
		</SessionProvider>
	);
};

export default Providers;