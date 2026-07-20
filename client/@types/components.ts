export interface ModalProps {
	children: React.ReactNode;
	className?: string;
	modalId: string;
	onClose?: () => void;
	desktopOnly?: boolean;
	preventDefaultClose?: boolean;
};