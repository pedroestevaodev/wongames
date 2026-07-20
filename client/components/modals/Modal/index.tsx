"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Drawer } from "vaul";
import { useModal } from "@/contexts/modalCtx";
import { useCallback } from "react";
import { cn } from "@/utils/formats";
import { ModalProps } from "@/@types/components";

const Modal = ({
	children,
	className,
	modalId,
	onClose,
	desktopOnly,
	preventDefaultClose,
}: ModalProps) => {
	const { modals, closeModal } = useModal();
	const { isMobile } = useMediaQuery();

	const closeModalHandler = useCallback(
		({ dragged }: { dragged?: boolean } = {}) => {
			if (preventDefaultClose && !dragged) {
				return;
			}

			if (onClose) onClose();
			closeModal(modalId);
		},
		[closeModal, modalId, onClose, preventDefaultClose],
	);

	if (isMobile && !desktopOnly) {
		return (
			<Drawer.Root
				open={modals[modalId] || false}
				onOpenChange={(open) => {
					if (!open) {
						closeModalHandler({ dragged: true });
					}
				}}
			>
				<Drawer.Overlay className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" />
				<Drawer.Portal>
					<Drawer.Content
						className={cn(
							"fixed inset-x-0 bottom-0 z-50 mt-24 overflow-hidden rounded-t-[10px] border bg-background",
							className,
						)}
					>
						<Drawer.Title className="sr-only">Componente Modal</Drawer.Title>
						<Drawer.Description className="sr-only">
							Este é o componente de modal.
						</Drawer.Description>
						<div className="sticky top-0 z-20 flex w-full items-center justify-center bg-inherit">
							<div className="my-3 h-1.5 w-16 rounded-full bg-muted-foreground/20" />
						</div>
						{children}
					</Drawer.Content>
					<Drawer.Overlay />
				</Drawer.Portal>
			</Drawer.Root>
		);
	}

	return (
		<Dialog
			open={modals[modalId] || false}
			onOpenChange={(open) => {
				if (!open) {
					closeModalHandler();
				}
			}}
		>
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				onCloseAutoFocus={(e) => e.preventDefault()}
				className={cn(
					"block bg-transparent border-none h-full min-h-screen w-full max-w-none !rounded-none p-0 overflow-x-hidden overflow-y-auto supports-[min-height:100dvh]:min-h-dvh",
					className,
				)}
				hideCloseButton
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Componente Modal</DialogTitle>
					<DialogDescription>Este é o componente de modal.</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export { Modal };
