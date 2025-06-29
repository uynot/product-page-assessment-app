import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "./ProductCatalog";
import { Check } from "lucide-react";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const capitalizeCategory = (category: string) => {
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	return (
		<Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
			<CardContent className="p-0">
				<div className="relative overflow-hidden rounded-t-lg">
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
					/>
					<div className="absolute top-3 left-3">
						<Badge variant="secondary" className="bg-white/90 text-gray-700 hover:bg-white">
							{capitalizeCategory(product.category)}
						</Badge>
					</div>
					{product.inStock && (
						<div className="absolute top-3 right-3">
							<Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
								<Check className="h-3 w-3" />
								In Stock
							</Badge>
						</div>
					)}
				</div>

				<div className="p-4">
					<h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
					<div className="flex items-center justify-between">
						<span className="text-2xl font-bold text-blue-600">${product.price}</span>
						<button
							className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
								product.inStock ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-500 cursor-not-allowed"
							}`}
							disabled={!product.inStock}>
							{product.inStock ? "Add to Cart" : "Unavailable"}
						</button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
