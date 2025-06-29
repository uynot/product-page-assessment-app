import React, { useState, useMemo, useEffect } from "react";
import FilterPanel from "./FilterPanel";
import FilterPanelSkeleton from "./FilterPanelSkeleton";
import ProductGrid from "./ProductGrid";
import products from "@/data/products";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

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
	const [isLoading, setIsLoading] = useState(true);
	const [addedProductIds, setAddedProductIds] = useState<number[]>([]);
	const [showNotAddedOnly, setShowNotAddedOnly] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		return () => clearTimeout(timer);
	}, []);

	const categories = useMemo(() => {
		return Array.from(new Set(products.map((product) => product.category)));
	}, []);

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
			const matchesStock = !showInStockOnly || product.inStock;
			const matchesNotAdded = !showNotAddedOnly || !addedProductIds.includes(product.id);
			return matchesCategory && matchesStock && matchesNotAdded;
		});
	}, [selectedCategories, showInStockOnly, showNotAddedOnly, addedProductIds]);

	const handleCategoryChange = (category: string, checked: boolean) => {
		setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)));
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">Product Catalog</h1>
				<p className="text-lg text-gray-600">Assessment for product list and filter</p>
				<p className="text-xs text-gray-600">Image used under fair use for academic demonstration purposes only</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Desktop Filter Panel */}
				<div className="hidden lg:block lg:w-1/4">
					{isLoading ? (
						<FilterPanelSkeleton />
					) : (
						<FilterPanel
							isMobile={false}
							categories={categories}
							selectedCategories={selectedCategories}
							showInStockOnly={showInStockOnly}
							onCategoryChange={handleCategoryChange}
							onStockToggle={setShowInStockOnly}
							showNotAddedOnly={showNotAddedOnly}
							onNotAddedToggle={setShowNotAddedOnly}
							addedProductIds={addedProductIds}
						/>
					)}
				</div>

				{/* Mobile Filter Drawer */}
				<div className="lg:hidden mb-4">
					<Sheet>
						<SheetTrigger asChild>
							<Button className="w-full flex items-center gap-2" variant="outline">
								<Filter className="w-4 h-4" />
								Filter Products
							</Button>
						</SheetTrigger>
						<SheetContent side="bottom" className="p-0 max-h-[90vh] overflow-y-auto">
							<SheetHeader>
								<SheetTitle className="sr-only">Filter Products</SheetTitle>
							</SheetHeader>

							<div className="p-5">
								<FilterPanel
									isMobile={true}
									categories={categories}
									selectedCategories={selectedCategories}
									showInStockOnly={showInStockOnly}
									showNotAddedOnly={showNotAddedOnly}
									onCategoryChange={handleCategoryChange}
									onStockToggle={setShowInStockOnly}
									onNotAddedToggle={setShowNotAddedOnly}
									addedProductIds={addedProductIds}
								/>
							</div>
						</SheetContent>
					</Sheet>
				</div>

				{/* Product Grid */}
				<div className="lg:w-3/4">
					<ProductGrid products={filteredProducts} isLoading={isLoading} onAdd={(id) => setAddedProductIds((prev) => [...prev, id])} />
				</div>
			</div>
		</div>
	);
};

export default ProductCatalog;
