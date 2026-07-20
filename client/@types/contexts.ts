export interface ModalContextType {
	modals: { [key: string]: boolean };
	openModal: (modalId: string) => void;
	closeModal: (modalId: string) => void;
	toggleModal: (modalId: string) => void;
	isModalOpen: (modalId: string) => boolean;
};
