import React, { useContext } from "react";
import classes from "./cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
	const [{ basket, user }, dispatch] = useContext(DataContext);

	const total = basket.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const increment = (item) => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item,
		});
	};

	const decrement = (id) => {
		dispatch({
			type: Type.REMOVE_FROM_BASKET,
			id,
		});
	};

	// console.log(basket);
	return (
		<LayOut>
			<section className={classes.container}>
				<div className={classes.cart__container}>
					<h3>Hello</h3>
					<h3>Your shopping basket </h3>
					<hr />

					{basket?.length === 0 ? (
						<p>Opps! No item in your cart</p>
					) : (
						basket?.map((item, i) => (
							<section className={classes.cart_product} key={i}>
								<ProductCard
									product={item}
									renderDesc={true}
									renderAdd={false}
									flex={true}
								/>
								<div className={classes.btn_container}>
									<button
										className={classes.btn}
										onClick={() => increment(item)}
									>
										<IoIosArrowUp size={20} />
									</button>
									<span>{item.amount}</span>
									<button
										className={classes.btn}
										onClick={() => decrement(item.id)}
									>
										<IoIosArrowDown size={20} />
									</button>
								</div>
							</section>
						))
					)}
				</div>
				{/* <h1>Hello why alway on me</h1> */}

				{basket?.length !== 0 && (
					<div className={classes.subtotal}>
						<div>
							<p>Subtotal ({basket?.length} items)</p>
							<CurrencyFormat amount={total} />
						</div>
						<span>
							<input type="checkbox" />
							<small>This order contains a gift</small>
						</span>
						<Link to="/payments">Continue to checkout</Link>
					</div>
				)}
			</section>
		</LayOut>
	);
}

export default Cart;
