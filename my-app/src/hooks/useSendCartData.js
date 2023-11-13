import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { errorActions } from '../store/error-slice';
import { authenticationActions } from '../store/authentication-slice';
import setFirebaseData from '../utils/setFirebaseData';
import getUid from '../utils/getAnonymousToken';

let initial = 0;

const useSendCartData = async () => {
	const dispatch = useDispatch();
	const data = useSelector(state => state.cart);

	const authenticationState = useSelector(state => state.authentication);
	const { isSignedIn, email, signedOutByLogout, justSignedIn } = authenticationState;

	useEffect(() => {
		const sendData = async () => {
			if (initial < 2) {
				initial++;
				return;
			}

			try {
				const uid = await getUid();

				if (isSignedIn && data) {
					if (justSignedIn) {
						dispatch(
							authenticationActions.changeAuthenticationState({
								...authenticationState,
								justSignedIn: false,
							}),
						);
						return;
					}

					setFirebaseData(`/users/emails/${email}/userCart`, data);
				} else {
					if (signedOutByLogout) {
						dispatch(
							authenticationActions.changeAuthenticationState({
								...authenticationState,
								signedOutByLogout: false,
							}),
						);
						return;
					}

					setFirebaseData(`/users/anonymousTokens/${uid}/anonymousCart`, data);
				}
			} catch (error) {
				dispatch(
					errorActions.setError({
						isError: true,
						message: {
							content: 'Unable to send cart data',
							error: error.code || error.message,
						},
					}),
				);
			}
		};

		sendData();
	}, [data, dispatch, isSignedIn]);
};

export default useSendCartData;
