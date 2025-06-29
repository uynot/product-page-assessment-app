import React, { useState, useMemo } from "react";
import FilterPanel from "./FilterPanel";
import ProductGrid from "./ProductGrid";

const products = [
	{ id: 1, name: "iPhone 16 Pro", category: "electronics", inStock: true, price: 999, image: "/placeholder.svg" },
	{ id: 2, name: "Samsung Galaxy S25", category: "electronics", inStock: false, price: 899, image: "/placeholder.svg" },
	{ id: 3, name: "MacBook Air", category: "electronics", inStock: true, price: 1199, image: "/placeholder.svg" },
	{ id: 4, name: "Nike Air Max", category: "clothing", inStock: true, price: 129, image: "/placeholder.svg" },
	{ id: 5, name: "Nike Dunk Low", category: "clothing", inStock: true, price: 159, image: "/placeholder.svg" },
	{ id: 6, name: "Vans Jeans", category: "clothing", inStock: false, price: 89, image: "/placeholder.svg" },
	{ id: 7, name: "Cria da Favela", category: "books", inStock: true, price: 12, image: "/placeholder.svg" },
	{ id: 8, name: "Introduction to Algorithms", category: "books", inStock: true, price: 14, image: "/placeholder.svg" },
	{ id: 9, name: "1984", category: "books", inStock: false, price: 13, image: "/placeholder.svg" },
	{ id: 10, name: "Macbook Pro", category: "electronics", inStock: true, price: 399, image: "/placeholder.svg" },
	{ id: 11, name: "Nike Shirt", category: "clothing", inStock: true, price: 35, image: "/placeholder.svg" },
	{ id: 12, name: "Less is More", category: "books", inStock: true, price: 16, image: "/placeholder.svg" },
];

export interface Product {
	id: number;
	name: string;
	category: string;
	inStock: boolean;
	price: number;
	image: string;
}

const ProductCatalog = () => {
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [showInStockOnly, setShowInStockOnly] = useState(false);

	// Get unique categories
	const categories = useMemo(() => {
		return Array.from(new Set(products.map((product) => product.category)));
	}, []);

	// Filter products based on selected filters
	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
			const matchesStock = !showInStockOnly || product.inStock;
			return matchesCategory && matchesStock;
		});
	}, [selectedCategories, showInStockOnly]);

	const handleCategoryChange = (category: string, checked: boolean) => {
		if (checked) {
			setSelectedCategories((prev) => [...prev, category]);
		} else {
			setSelectedCategories((prev) => prev.filter((c) => c !== category));
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">Product Catalog</h1>
				<p className="text-lg text-gray-600">Assessment for product list and filter</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				<div className="lg:w-1/4">
					<FilterPanel
						categories={categories}
						selectedCategories={selectedCategories}
						showInStockOnly={showInStockOnly}
						onCategoryChange={handleCategoryChange}
						onStockToggle={setShowInStockOnly}
					/>
				</div>

				<div className="lg:w-3/4">
					<div className="mb-6">
						<p className="text-gray-600">
							Showing {filteredProducts.length} of {products.length} products
						</p>
					</div>
					<ProductGrid products={filteredProducts} />
				</div>
			</div>
		</div>
	);
};

export default ProductCatalog;
