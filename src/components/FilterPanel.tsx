import React, { useMemo } from "react";
import products from "@/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface FilterPanelProps {
	categories: string[];
	selectedCategories: string[];
	showInStockOnly: boolean;
	onCategoryChange: (category: string, checked: boolean) => void;
	onStockToggle: (checked: boolean) => void;
	showNotAddedOnly: boolean;
	onNotAddedToggle: (checked: boolean) => void;
	addedProductIds: number[];
	isMobile?: boolean;
}

const FilterPanel = ({
	categories,
	selectedCategories,
	showInStockOnly,
	onCategoryChange,
	onStockToggle,
	showNotAddedOnly,
	onNotAddedToggle,
	addedProductIds,
	isMobile = false,
}: FilterPanelProps) => {
	const capitalizeCategory = (category: string) => category.charAt(0).toUpperCase() + category.slice(1);

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
			const matchStock = !showInStockOnly || product.inStock;
			const matchNotAdded = !showNotAddedOnly || !addedProductIds.includes(product.id);
			return matchCategory && matchStock && matchNotAdded;
		});
	}, [selectedCategories, showInStockOnly, showNotAddedOnly, addedProductIds]);

	// mobile view
	if (isMobile) {
		return (
			<Card className="w-full max-h-[80vh] overflow-y-auto rounded-t-xl border-t-2 border-t-muted text-base">
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2 text-lg">
						<Filter className="w-5 h-5" />
						Filters
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-6 px-5 pb-6">
					{/* Active Filters on Top */}
					{(selectedCategories.length > 0 || showInStockOnly || showNotAddedOnly) && (
						<div className="bg-muted/40 rounded-md p-4 border text-[15px]">
							<h4 className="font-medium mb-2 text-[16px]">Active Filters:</h4>
							<ul className="space-y-1 text-muted-foreground">
								{selectedCategories.map((c) => (
									<li key={c}>• {capitalizeCategory(c)}</li>
								))}
								{showInStockOnly && <li>• In stock only</li>}
								{showNotAddedOnly && <li>• Not added only</li>}
							</ul>
						</div>
					)}

					{/* Category */}
					<div>
						<h3 className="font-semibold text-[17px] mb-3">Category</h3>
						<div className="space-y-3">
							{categories.map((category) => (
								<div key={category} className="flex items-center space-x-3">
									<Checkbox
										id={category}
										checked={selectedCategories.includes(category)}
										onCheckedChange={(checked) => onCategoryChange(category, checked as boolean)}
									/>
									<Label htmlFor={category} className="text-base font-medium cursor-pointer">
										{capitalizeCategory(category)}
									</Label>
								</div>
							))}
						</div>
					</div>

					{/* Availability */}
					<div>
						<h3 className="font-semibold text-[17px] mb-3">Availability</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-3">
								<Switch id="in-stock" checked={showInStockOnly} onCheckedChange={onStockToggle} />
								<Label htmlFor="in-stock" className="text-base cursor-pointer">
									In stock only
								</Label>
							</div>
							<div className="flex items-center space-x-3">
								<Switch id="not-added" checked={showNotAddedOnly} onCheckedChange={onNotAddedToggle} />
								<Label htmlFor="not-added" className="text-base cursor-pointer">
									Not added only
								</Label>
							</div>
						</div>
					</div>

					{/* Result Count */}
					<div className="pt-4 text-[15px] text-muted-foreground">
						Showing {filteredProducts.length} of {products.length} products
					</div>
				</CardContent>
			</Card>
		);
	}

	// Desktop View
	return (
		<div className="hidden md:block">
			<Card className="sticky top-4 text-base">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<Filter className="h-5 w-5" />
						Filters
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Category */}
					<div>
						<h3 className="font-semibold mb-3">Category</h3>
						<div className="space-y-3">
							{categories.map((category) => (
								<div key={category} className="flex items-center space-x-2">
									<Checkbox
										id={category}
										checked={selectedCategories.includes(category)}
										onCheckedChange={(checked) => onCategoryChange(category, checked as boolean)}
									/>
									<Label htmlFor={category} className="cursor-pointer">
										{capitalizeCategory(category)}
									</Label>
								</div>
							))}
						</div>
					</div>

					{/* Availability */}
					<div>
						<h3 className="font-semibold mb-3">Availability</h3>
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<Switch id="in-stock" checked={showInStockOnly} onCheckedChange={onStockToggle} />
								<Label htmlFor="in-stock" className="cursor-pointer">
									In stock only
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Switch id="not-added" checked={showNotAddedOnly} onCheckedChange={onNotAddedToggle} />
								<Label htmlFor="not-added" className="cursor-pointer">
									Not added only
								</Label>
							</div>
						</div>
					</div>

					{/* Result count */}
					<div className="pt-2 border-t border-muted/40">
						<span className="text-sm text-muted-foreground">
							Showing {filteredProducts.length} of {products.length} products
						</span>
					</div>

					{/* Active Filters */}
					{(selectedCategories.length > 0 || showInStockOnly || showNotAddedOnly) && (
						<div className="pt-4 border-t">
							<h4 className="font-medium text-gray-900 mb-2">Active Filters:</h4>
							<ul className="text-sm text-gray-600 space-y-1">
								{selectedCategories.map((c) => (
									<li key={c}>• {capitalizeCategory(c)}</li>
								))}
								{showInStockOnly && <li>• In stock only</li>}
								{showNotAddedOnly && <li>• Not added only</li>}
							</ul>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default FilterPanel;
