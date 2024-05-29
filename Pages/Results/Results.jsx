import React, { useEffect, useState } from "react";
import  classes from "./results.module.css";

import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Results() {
	const [results, setResults] = useState([]);
	const { categoryName } = useParams();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`${productUrl}/products/category/${categoryName}`)
			.then((res) => {
				setResults(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, [categoryName]);

	return (
		<LayOut>
			<section>
				<h1 style={{ padding: "30px" }}>Results</h1>
				<p style={{ padding: "30px" }}>Category/{categoryName}</p>
				<hr />

				{isLoading ? (
					<Loader />
				) : (
					<div className={classes.product_container}>
						{results.length > 0 ? (
							results.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									renderDesc={false}
									renderAdd={true}
								/>
							))
						) : (
							<p>No products found</p>
						)}
					</div>
				)}
			</section>
		</LayOut>
	);
}

export default Results;
