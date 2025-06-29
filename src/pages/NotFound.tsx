import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
	const location = useLocation();

	useEffect(() => {
		console.error("404 Error: User attempted to access non-existent route:", location.pathname);
	}, [location.pathname]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">Oops!</h1>
				<p className="text-xl text-gray-600 mb-4">
					For demonstration purposes so we can only see the NotFound page instead of the actual product details page.
				</p>
				<a href="/" className="text-blue-500 hover:text-blue-700 underline">
					Return to Previous Page
				</a>
			</div>
		</div>
	);
};

export default NotFound;
