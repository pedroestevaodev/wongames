'use client';

import { Modal } from "@/components/modals/Modal";
import { useModal } from "@/contexts/modalCtx";
import { useEffect } from "react";

const WarningModal = () => {
	const modalId = "warningModal";
	const { openModal, closeModal } = useModal();

	useEffect(() => {
	    const hasVisited = localStorage.getItem("hasVisitedEcommerce");
	    if (!hasVisited) {
	        openModal(modalId);
	        localStorage.setItem("hasVisitedEcommerce", "true");
	    }
	}, [openModal]);

	return (
		<Modal modalId={modalId} desktopOnly>
			<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
				<div className="relative transform overflow-hidden rounded-lg bg-base text-left shadow-xl transition-all sm:my-8 w-full min-[400px]:w-fit min-[400px]:min-w-[350px] max-w-[500px]">
					<button
						onClick={() => closeModal(modalId)}
						className="absolute top-2 right-2 bg-transparent border-none shadow-none h-auto p-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
						aria-label="Fechar modal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					<div className="bg-white p-[18px]">
						<div className="sm:flex sm:items-start">
							<div className="text-center mt-0 w-full">
								<div className="relative grid mt-2 w-full">
									<div className="relative flex flex-col gap-9">
										<h3 className="text-[32px] text-primary font-bold text-center">
											Warning - <i>Aviso</i>
										</h3>

										<div className="flex flex-col gap-5 my-3">
											<p className="text-[16px] text-gray-600 m-0 p-0">
												This is a fictitious project. No purchases made here will be successful.
											</p>
											<p className="text-[16px] text-gray-600 m-0 p-0">
												<i>Este é um projeto fictício. Nenhuma compra realizada aqui será efetivada.</i>
											</p>
										</div>

										<div className="flex items-center justify-center gap-[20px]">
											<button
												type="button"
												className="border-1 border-solid bg-primary text-white hover:opacity-80 text-lg sm:text-xl rounded-[5px] min-w-[100px] p-[8px] transition-colors duration-200"
												onClick={() => closeModal(modalId)}
											>
												Ok
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export { WarningModal };
