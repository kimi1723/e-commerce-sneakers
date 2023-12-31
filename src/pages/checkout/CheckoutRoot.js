import { Await, Outlet, defer, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import CheckoutRoot from '../../components/checkout/CheckoutRoot';
import Wrapper from '../../components/ui/wrappers/wrapper/Wrapper';
import getUid from '../../utils/getUid';
import getFirebaseData from '../../utils/getFirebaseData';
import LoaderSpinner from '../../components/ui/loader-spinner/LoaderSpinner';

const CheckoutRootPage = () => {
	const { cart } = useLoaderData();

	return (
		<Suspense fallback={<LoaderSpinner title="checkout" />}>
			<Await resolve={cart}>
				{cart => {
					return (
						<Wrapper>
							<CheckoutRoot cartInitial={cart} />
							<Outlet />
						</Wrapper>
					);
				}}
			</Await>
		</Suspense>
	);
};

const checkoutLoader = async () => {
	const uid = await getUid();
	const anonymousUserData = await getFirebaseData(`/users/anonymousTokens/${uid}`);

	if (anonymousUserData && anonymousUserData.isSignedIn && anonymousUserData.isSignedIn.status) {
		const userAccountUid = await getUid('accountUid');
		const cartData = await getFirebaseData(`/users/validated/${userAccountUid}/userCart`);

		return cartData;
	}

	const cartData = await getFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`);

	return cartData;
};

export const loader = () => {
	return defer({
		cart: checkoutLoader(),
	});
};

export default CheckoutRootPage;
