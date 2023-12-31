import getDecimals from '../../../utils/getDecimals';
import classes from './ProductDetails.module.css';

const ProductDetails = ({ productDetails }) => {
	const { annotation, description, price, name, discount } = productDetails;

	const isDiscount = Boolean(discount);

	const totalPrice = price * ((100 - discount) / 100);

	return (
		<>
			<h2 className={classes.annotation}>{annotation}</h2>
			<h1 className={classes.h1}>{name}</h1>
			<p className={classes.description}>{description}</p>

			<section className={classes.prices}>
				<p className={classes['discounted-price']}>${getDecimals(totalPrice)}</p>
				{isDiscount && (
					<>
						<p className={classes['discount-percent']}>{discount}%</p>
						<p className={classes['original-price']}>${price}</p>
					</>
				)}
			</section>
		</>
	);
};

export default ProductDetails;
