import React from "react";
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
}

const FilterPanel = ({ categories, selectedCategories, showInStockOnly, onCategoryChange, onStockToggle }: FilterPanelProps) => {
	const capitalizeCategory = (category: string) => {
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	return (
		<Card className="sticky top-4">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Filter className="h-5 w-5" />
					Filters
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Category Filter */}
				<div>
					<h3 className="font-semibold text-gray-900 mb-3">Category</h3>
					<div className="space-y-3">
						{categories.map((category) => (
							<div key={category} className="flex items-center space-x-2">
								<Checkbox
									id={category}
									checked={selectedCategories.includes(category)}
									onCheckedChange={(checked) => onCategoryChange(category, checked as boolean)}
								/>
								<Label
									htmlFor={category}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
									{capitalizeCategory(category)}
								</Label>
							</div>
						))}
					</div>
				</div>

				{/* Stock Filter */}
				<div>
					<h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
					<div className="flex items-center space-x-2">
						<Switch id="in-stock" checked={showInStockOnly} onCheckedChange={onStockToggle} />
						<Label
							htmlFor="in-stock"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
							In stock only
						</Label>
					</div>
				</div>

				{/* Active Filters Summary */}
				{(selectedCategories.length > 0 || showInStockOnly) && (
					<div className="pt-4 border-t">
						<h4 className="font-medium text-gray-900 mb-2">Active Filters:</h4>
						<div className="space-y-1 text-sm text-gray-600">
							{selectedCategories.map((category) => (
								<div key={category}>• {capitalizeCategory(category)}</div>
							))}
							{showInStockOnly && <div>• In stock only</div>}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default FilterPanel;
