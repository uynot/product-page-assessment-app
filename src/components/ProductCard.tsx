import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "./ProductCatalog";
import { Check, ShoppingCart } from "lucide-react";
import AddToCartDialog from "@/components/ui/AddToCartDialog";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
	product: Product;
	onAdd: (productId: number) => void;
}

const ProductCard = ({ product, onAdd }: ProductCardProps) => {
	const [showDialog, setShowDialog] = React.useState(false);
	const [isAdded, setIsAdded] = React.useState(false);

	const capitalizeCategory = (category: string) => {
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	const handleAddToCart = () => {
		if (product.inStock && !isAdded) {
			setShowDialog(true);
			setIsAdded(true);
			onAdd(product.id);
		}
	};

	const navigate = useNavigate();

	// for demonstration purposes so we can only see the NotFound page instead of the actual product details
	const handleImageClick = () => {
		console.log("clicked image"); // debug
		navigate("/NotFound");
	};

	return (
		<>
			<AddToCartDialog show={showDialog} onDone={() => setShowDialog(false)} />

			<Card className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20 hover:bg-white/80 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
				<CardContent className="p-0">
					<div className="relative overflow-hidden">
						<div
							onClick={handleImageClick}
							className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative cursor-pointer">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
								draggable={false}
								onContextMenu={(e) => e.preventDefault()}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</div>

						{/* Category Badge */}
						<div className="absolute top-3 left-3 sm:top-4 sm:left-4">
							<Badge
								variant="secondary"
								className="pointer-events-none select-none bg-white/90 backdrop-blur-md text-gray-700 border border-white/30 shadow-lg font-medium px-2 py-1 text-xs sm:px-3 sm:text-xs">
								{capitalizeCategory(product.category)}
							</Badge>
						</div>

						{/* Stock Status */}
						<div className="absolute top-3 right-3 sm:top-4 sm:right-4">
							{product.inStock ? (
								<Badge
									variant="default"
									className="pointer-events-none select-none bg-emerald-500/90 backdrop-blur-md text-white border border-emerald-400/30 shadow-lg flex items-center gap-1 px-2 py-1 text-xs sm:gap-1.5 sm:px-3 sm:text-xs">
									<Check className="h-3 w-3" />
									<span className="hidden sm:inline">In Stock</span>
									<span className="sm:hidden">In</span>
								</Badge>
							) : (
								<Badge
									variant="destructive"
									className="pointer-events-none select-none bg-red-500/90 backdrop-blur-md text-white border border-red-400/30 shadow-lg px-2 py-1 text-xs sm:px-3 sm:text-xs">
									<span className="hidden sm:inline">Out of Stock</span>
									<span className="sm:hidden">Out</span>
								</Badge>
							)}
						</div>
					</div>

					<div className="p-4 sm:p-6 bg-gradient-to-b from-white/50 to-white/30 backdrop-blur-sm">
						<div className="space-y-3 sm:space-y-4">
							<div>
								<h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
									{product.name}
								</h3>
							</div>

							<div className="flex items-center justify-between gap-3">
								<div className="flex flex-col justify-center min-w-0 flex-1">
									<span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none">
										${product.price}
									</span>
									<span className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5 sm:mt-1 truncate">
										{product.inStock ? "Available now" : "Notify when available"}
									</span>
								</div>

								<button
									onClick={handleAddToCart}
									className={`px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-colors duration-500 flex items-center gap-1.5 sm:gap-2 min-w-fit ${
										!product.inStock
											? "bg-gray-200/80 backdrop-blur-sm text-gray-500 cursor-not-allowed border border-gray-300/50"
											: isAdded
											? "bg-blue-100 text-blue-600 cursor-default"
											: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
									}`}
									disabled={!product.inStock || isAdded}>
									<ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
									<span className="whitespace-nowrap">{!product.inStock ? "Unavailable" : isAdded ? "Added" : "Add to Cart"}</span>
								</button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default ProductCard;
