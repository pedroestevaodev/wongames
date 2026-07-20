"use client";

import { useState } from "react";
import { ModalContext } from "@/contexts/modalCtx";
import { ChildrenProps } from "@/@types/nextjs";
import { WarningModal } from "../modals/WarningModal";

const ModalProvider = ({ children }: ChildrenProps) => {
	const [modals, setModals] = useState<{ [key: string]: boolean }>({});

	const openModal = (modalId: string) => {
		setModals((prev) => ({ ...prev, [modalId]: true }));
	};

	const closeModal = (modalId: string) => {
		setModals((prev) => ({ ...prev, [modalId]: false }));
	};

	const toggleModal = (modalId: string) => {
		setModals((prev) => ({ ...prev, [modalId]: !prev[modalId] }));
	};

	const isModalOpen = (modalId: string) => !!modals[modalId];

	return (
		<ModalContext.Provider
			value={{ modals, openModal, closeModal, toggleModal, isModalOpen }}
		>
			{children}

			<WarningModal />
		</ModalContext.Provider>
	);
};

export default ModalProvider;
