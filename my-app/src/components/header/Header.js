import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import DesktopNavigation from '../navigation/desktop/DesktopNavigation';
import MobileNavigation from '../navigation/mobile/MobileNavigation';
import Cart from './cart/Cart';
import Profile from './profile/Profile';
import Logo from '../ui/Logo';

import classes from './Header.module.css';
import cartIcon from '../../assets/images/icon-cart.svg';
import avatarImg from '../../assets/images/image-avatar.png';
import CartItemsCounted from './cart/CartItemsQuantity';

let hideCartTimeout;

const Header = () => {
	const isMobile = useSelector(state => state.deviceType.isMobile);
	const [mobileNavIsActive, setMobileNavIsActive] = useState(false);
	const [isCartVisible, setIsCartVisible] = useState(false);
	const [isProfileVisible, setIsProfileVisible] = useState(false);

	const showMobileNavigationHandler = () => {
		setMobileNavIsActive(prev => !prev);
	};

	const hideMobileNavHandler = () => {
		setMobileNavIsActive(false);
	};

	const showCartHandler = () => {
		setIsCartVisible(true);
		clearTimeout(hideCartTimeout);
	};

	const hideCartHandler = () => {
		hideCartTimeout = setTimeout(() => {
			setIsCartVisible(false);
		}, 100);
	};

	const showProfileHandler = () => {
		document.querySelectorAll('button').forEach(btn => (btn.tabIndex = -1));
		document.querySelectorAll('a').forEach(btn => (btn.tabIndex = -1));
		setIsProfileVisible(true);
	};

	const hideProfileHandler = () => {
		setIsProfileVisible(false);
	};

	const navBtnClasses = mobileNavIsActive ? `${classes['nav-btn']} ${classes['btn-active']}` : `${classes['nav-btn']}`;

	return (
		<>
			<div className={classes.placeholder}></div>
			<header className={classes.header}>
				{isMobile && (
					<div className={classes['mobile-nav-container']}>
						<button
							type="button"
							className={navBtnClasses}
							aria-label="navigation menu"
							onClick={showMobileNavigationHandler}>
							<span className={classes['btn-content']}></span>
						</button>
						<MobileNavigation mobileNavIsActive={mobileNavIsActive} hideNav={hideMobileNavHandler} />
					</div>
				)}

				<Logo additionalClasses={classes.logo} />

				{!isMobile && <DesktopNavigation />}

				<div
					className={classes['cart-container']}
					onMouseOver={showCartHandler}
					onMouseLeave={hideCartHandler}
					onFocus={showCartHandler}
					onBlur={hideCartHandler}>
					<button type="button">
						<div className={classes['cart-img-container']}>
							<img src={cartIcon} alt="cart" />
							{<CartItemsCounted />}
						</div>
					</button>
					<AnimatePresence>{isCartVisible && <Cart hideCart={hideCartHandler} />}</AnimatePresence>
				</div>
				<button type="button" className={classes['avatar-btn']} aria-label="profile" onClick={showProfileHandler}>
					<img src={avatarImg} alt="" className={classes['avatar-img']} />
				</button>
				<AnimatePresence>{isProfileVisible && <Profile hideProfile={hideProfileHandler} />}</AnimatePresence>
			</header>
		</>
	);
};

export default Header;