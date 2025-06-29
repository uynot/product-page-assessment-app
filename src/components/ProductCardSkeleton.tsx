import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
	return (
		<Card className="overflow-hidden bg-white/70 backdrop-blur-sm border border-white/20">
			<CardContent className="p-0">
				<div className="relative">
					<Skeleton className="aspect-[4/3] w-full" />

					{/* Category Badge Skeleton */}
					<div className="absolute top-4 left-4">
						<Skeleton className="h-6 w-20 rounded-full" />
					</div>

					{/* Stock Status Skeleton */}
					<div className="absolute top-4 right-4">
						<Skeleton className="h-6 w-16 rounded-full" />
					</div>
				</div>

				<div className="p-6 bg-gradient-to-b from-white/50 to-white/30 backdrop-blur-sm">
					<div className="space-y-4">
						<div>
							<Skeleton className="h-6 w-3/4 mb-2" />
							<Skeleton className="h-4 w-1/2" />
						</div>

						<div className="flex items-center justify-between">
							<div className="flex flex-col space-y-2">
								<Skeleton className="h-8 w-20" />
								<Skeleton className="h-4 w-24" />
							</div>

							<Skeleton className="h-12 w-32 rounded-xl" />
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProductCardSkeleton;
