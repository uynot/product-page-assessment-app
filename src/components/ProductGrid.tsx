import React from "react";
import ProductCard from "./ProductCard";

interface Product {
	id: number;
	name: string;
	category: string;
	inStock: boolean;
	price: number;
	image: string;
}

interface ProductGridProps {
	products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
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
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductGrid;
