import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FilterPanelSkeleton = () => {
	return (
		<Card className="sticky top-4">
			<CardHeader>
				<Skeleton className="h-6 w-20" />
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Category Filter Skeleton */}
				<div>
					<Skeleton className="h-5 w-16 mb-3" />
					<div className="space-y-3">
						{[1, 2, 3].map((i) => (
							<div key={i} className="flex items-center space-x-2">
								<Skeleton className="h-4 w-4 rounded" />
								<Skeleton className="h-4 w-20" />
							</div>
						))}
					</div>
				</div>

				{/* Stock Filter Skeleton */}
				<div>
					<Skeleton className="h-5 w-20 mb-3" />
					<div className="flex items-center space-x-2">
						<Skeleton className="h-6 w-11 rounded-full" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default FilterPanelSkeleton;
