import classes from './Product.module.css';
import { img1, img2, img3, img4, img1Thumbnail, img2Thumbnail, img3Thumbnail, img4Thumbnail } from './p1-images';
import cartImg from '../../assets/images/white-icon-cart.svg';
import minusIcon from '../../assets/images/icon-minus.svg';
import plusIcon from '../../assets/images/icon-plus.svg';
import prevIcon from '../../assets/images/icon-previous.svg';
import nextIcon from '../../assets/images/icon-next.svg';

const Product = ({ imgUrl }) => {
	const isDesktop = false;

	return (
		<main className={classes.main}>
			<section className={classes.gallery}>
				<button className={classes['carousel-icon']}>
					<img src={prevIcon} alt="" />
				</button>
				<img
					src={imgUrl}
					alt="white shoes with brown endings on orange background wall"
					className={classes['main-img']}
				/>
				<button className={classes['carousel-icon']}>
					<img src={nextIcon} alt="" />
				</button>
				{isDesktop && <div className={classes['thumbnails']}></div>}
			</section>

			<section className={classes.info}>
				<h2 className={classes.annotation}>Sneaker Company</h2>
				<h1 className={classes.h1}>Fall Limited Edition Sneakers</h1>
				<p className={classes.description}>
					These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole,
					they'll withstand everything the weather can offer.
				</p>

				<section className={classes.prices}>
					<p className={classes['discounted-price']}>$125.00</p>
					<p className={classes['discount-percent']}>50%</p>
					<p className={classes['original-price']}>$250.00</p>
				</section>

				<section className={classes['btns']}>
					<div className={classes['amount-btns']}>
						<button className={classes['reduce-amount-btn']}>
							<img src={minusIcon} alt="" />
						</button>
						<p className={classes['items-amount']}>0</p>
						<button className={classes['add-amount-btn']}>
							<img src={plusIcon} alt="" />
						</button>
					</div>

					<button className={classes['add-to-cart-btn']}>
						<img src={cartImg} alt="" className={classes['cart-icon']} />
						Add to cart
					</button>
				</section>
			</section>
		</main>
	);
};

export default Product;
