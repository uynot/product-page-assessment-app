import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dropIn = {
	hidden: { y: -100, opacity: 0 },
	center: { y: 0, opacity: 1 },
	exit: { y: -100, opacity: 0 },
};

interface AddToCartDialogProps {
	show: boolean;
	onDone: () => void;
}

const AddToCartDialog: React.FC<AddToCartDialogProps> = ({ show, onDone }) => {
	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				onDone();
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [show, onDone]);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					variants={dropIn}
					initial="hidden"
					animate="center"
					exit="exit"
					transition={{ duration: 0.6 }}
					className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-white shadow-xl rounded-md px-6 py-3 text-sm font-medium text-gray-800">
					Added to cart successfully!
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AddToCartDialog;
