'use client';

import { ModalContextType } from "@/@types/contexts";
import { createContext, useContext } from "react";

export const ModalContext = createContext<ModalContextType>({
	modals: {},
	openModal: () => { },
	closeModal: () => { },
	toggleModal: () => { },
	isModalOpen: () => false,
});

export const useModal = () => {
	return useContext(ModalContext);
};
