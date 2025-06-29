import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "./ProductCatalog";
import { Check, ShoppingCart } from "lucide-react";

interface ProductCardProps {
	product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const capitalizeCategory = (category: string) => {
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	return (
		<Card className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 hover:bg-white/80 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2">
			<CardContent className="p-0">
				<div className="relative overflow-hidden">
					<div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
						<img
							src={product.image}
							alt={product.name}
							className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</div>

					{/* Category Badge */}
					<div className="absolute top-4 left-4">
						<Badge
							variant="secondary"
							className="bg-white/90 backdrop-blur-md text-gray-700 border border-white/30 shadow-lg font-medium px-3 py-1">
							{capitalizeCategory(product.category)}
						</Badge>
					</div>

					{/* Stock Status */}
					<div className="absolute top-4 right-4">
						{product.inStock ? (
							<Badge
								variant="default"
								className="bg-emerald-500/90 backdrop-blur-md hover:bg-emerald-600/90 text-white border border-emerald-400/30 shadow-lg flex items-center gap-1.5 px-3 py-1">
								<Check className="h-3 w-3" />
								In Stock
							</Badge>
						) : (
							<Badge
								variant="destructive"
								className="bg-red-500/90 backdrop-blur-md text-white border border-red-400/30 shadow-lg px-3 py-1">
								Out of Stock
							</Badge>
						)}
					</div>
				</div>

				<div className="p-6 bg-gradient-to-b from-white/50 to-white/30 backdrop-blur-sm">
					<div className="space-y-4">
						<div>
							<h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
								{product.name}
							</h3>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex flex-col justify-center">
								<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none">
									${product.price}
								</span>
								<span className="text-sm text-gray-500 font-medium mt-1">
									{product.inStock ? "Available now" : "Notify when available"}
								</span>
							</div>

							<button
								className={`group/btn relative overflow-hidden px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
									product.inStock
										? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 active:scale-95"
										: "bg-gray-200/80 backdrop-blur-sm text-gray-500 cursor-not-allowed border border-gray-300/50"
								}`}
								disabled={!product.inStock}>
								<div className="flex items-center gap-2">
									<ShoppingCart className="h-4 w-4" />
									<span className="text-sm">{product.inStock ? "Add to Cart" : "Unavailable"}</span>
								</div>
								{product.inStock && (
									<div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
								)}
							</button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
