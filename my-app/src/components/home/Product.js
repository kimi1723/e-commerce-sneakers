import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cacheImages from '../../utils/cacheImages';

import classes from './Product.module.css';

const Product = ({ product: { name, imagesUrls, imagesAlts, annotation, price, discount, description } }) => {
	const [imgData, setImgData] = useState({
		src: imagesUrls[0],
		alt: imagesAlts.image1,
	});

	useEffect(() => {
		cacheImages(imagesUrls);
	});

	const totalPrice = (price * ((100 - discount) / 100)).toFixed(2);

	const nextImageHandler = () => {
		setImgData({
			src: imagesUrls[1],
			alt: imagesAlts.image2,
		});
	};

	const previousImageHandler = () => {
		setImgData({
			src: imagesUrls[0],
			alt: imagesAlts.image1,
		});
	};

	return (
		<li className={classes.li}>
			<Link
				className={classes.link}
				to="/products/product-1"
				onMouseOver={nextImageHandler}
				onFocus={nextImageHandler}
				onBlur={previousImageHandler}
				onMouseLeave={previousImageHandler}>
				<img src={imgData.src} alt={imgData.alt} className={classes.img} />

				<section className={classes.details}>
					<p className={classes.annotation}>{annotation}</p>
					<p className={classes.name}>{name}</p>
					<p className={classes.price}>
						<span className={classes['discounted-price']}>
							${totalPrice}
							{Number.isInteger(totalPrice) && '.00'}
						</span>
						<span className={classes['original-price']}>${price}</span>
						<span className={classes['discount-percent']}>-{discount}%</span>
					</p>
					<p className={classes.description}>{description}</p>
				</section>
			</Link>
		</li>
	);
};

export default Product;
