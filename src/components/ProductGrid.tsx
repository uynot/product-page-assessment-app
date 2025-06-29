import React from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Product } from "./ProductCatalog";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGridProps {
	products: Product[];
	isLoading?: boolean;
	onAdd: (productId: number) => void;
}

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, scale: 0.95 },
	show: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.95 },
};

const ProductGrid = ({ products, isLoading = false, onAdd }: ProductGridProps) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
			</div>
		);
	}

	if (products.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="text-gray-400 mb-4">
					<svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1}
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2"
						/>
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
				<p className="text-gray-600">Try adjusting your filters to see more results.</p>
			</div>
		);
	}

	return (
		<motion.div
			className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
			variants={containerVariants}
			initial="hidden"
			animate="show"
			layout>
			<AnimatePresence>
				{products.map((product) => (
					<motion.div key={product.id} variants={itemVariants} layout initial="hidden" animate="show" exit="exit">
						<ProductCard product={product} onAdd={onAdd} />
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
};

export default ProductGrid;
