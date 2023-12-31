import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import LoaderSpinner from './components/ui/loader-spinner/LoaderSpinner';

import { action as checkoutAction } from './pages/checkout/Successful';
import { action as authenticationAction } from './pages/Authentication';
import { action as credentialsAction } from './pages/account/Credentials';
import { action as personalInformationAction } from './pages/account/PersonalInformation';

const RootPageLazy = lazy(() => import('./pages/Root'));
const ErrorPageLazy = lazy(() => import('./pages/Error'));
const HomePageLazy = lazy(() => import('./pages/nav-sections/Home'));
const ProductPageLazy = lazy(() => import('./pages/Product'));
const CollectionsPageLazy = lazy(() => import('./pages/nav-sections/collections/Collections'));
const FallPageLazy = lazy(() => import('./pages/nav-sections/collections/Fall'));
const SpringPageLazy = lazy(() => import('./pages/nav-sections/collections/Spring'));
const MenPageLazy = lazy(() => import('./pages/nav-sections/Men'));
const WomenPageLazy = lazy(() => import('./pages/nav-sections/Women'));
const AboutPageLazy = lazy(() => import('./pages/nav-sections/About'));
const ContactPageLazy = lazy(() => import('./pages/nav-sections/Contact'));
const CheckoutRootPageLazy = lazy(() => import('./pages/checkout/CheckoutRoot'));
const CheckoutDetailsLazy = lazy(() => import('./pages/checkout/Details'));
const CheckoutSuccessfulLazy = lazy(() => import('./pages/checkout/Successful'));
const CheckoutSummaryLazy = lazy(() => import('./pages/checkout/Summary'));
const AuthenticationPageLazy = lazy(() => import('./pages/Authentication'));
const AccountRootPageLazy = lazy(() => import('./pages/account/AccountRoot'));
const MyAccountPageLazy = lazy(() => import('./pages/account/MyAccount'));
const OrdersPageLazy = lazy(() => import('./pages/account/Orders'));
const CredentialsPageLazy = lazy(() => import('./pages/account/Credentials'));
const PersonalInformationPageLazy = lazy(() => import('./pages/account/PersonalInformation'));
const OrderDetailsPageLazy = lazy(() => import('./pages/account/OrderDetails'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<LoaderSpinner />}>
				<RootPageLazy />
			</Suspense>
		),
		errorElement: (
			<Suspense fallback={<LoaderSpinner />}>
				<ErrorPageLazy />
			</Suspense>
		),
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<HomePageLazy />
					</Suspense>
				),
				loader: () => import('./pages/nav-sections/Home').then(module => module.loader()),
			},
			{
				path: '/products/:id',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<ProductPageLazy />
					</Suspense>
				),
				loader: meta => import('./pages/Product').then(module => module.loader(meta)),
			},
			{
				path: '/collections',
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CollectionsPageLazy />
							</Suspense>
						),
					},
					{
						path: 'fall',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<FallPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/nav-sections/collections/Fall').then(module => module.loader()),
					},
					{
						path: 'spring',
						element: (
							<Suspense falllback={<LoaderSpinner />}>
								<SpringPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/nav-sections/collections/Spring').then(module => module.loader()),
					},
				],
			},
			{
				path: '/men',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<MenPageLazy />
					</Suspense>
				),
				loader: () => import('./pages/nav-sections/Men').then(module => module.loader()),
			},
			{
				path: '/women',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<WomenPageLazy />
					</Suspense>
				),
				loader: () => import('./pages/nav-sections/Women').then(module => module.loader()),
			},
			{
				path: '/about',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<AboutPageLazy />
					</Suspense>
				),
			},
			{
				path: '/contact',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<ContactPageLazy />
					</Suspense>
				),
			},
			{
				path: '/checkout',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<CheckoutRootPageLazy />
					</Suspense>
				),
				loader: meta => import('./pages/checkout/CheckoutRoot').then(module => module.loader(meta)),
				children: [
					{
						index: true,
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CheckoutSummaryLazy />
							</Suspense>
						),
					},
					{
						path: 'details',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CheckoutDetailsLazy />
							</Suspense>
						),
						loader: () => import('./pages/checkout/Details').then(module => module.loader()),
					},
				],
			},
			{
				path: 'checkout-successful',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<CheckoutSuccessfulLazy />
					</Suspense>
				),
				action: checkoutAction,
			},
			{
				path: 'account',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<AccountRootPageLazy />
					</Suspense>
				),
				children: [
					{
						path: 'myaccount',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<MyAccountPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/account/MyAccount').then(module => module.loader()),
					},
					{
						path: 'orders',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<OrdersPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/account/Orders').then(module => module.loader()),
					},
					{
						path: '/account/orders/:orderId',
						// id: 'order-details',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<OrderDetailsPageLazy />
							</Suspense>
						),
						loader: meta => import('./pages/account/OrderDetails').then(module => module.loader(meta)),
					},
					{
						path: 'credentials',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<CredentialsPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/account/Credentials').then(module => module.loader()),
						action: credentialsAction,
					},
					{
						path: 'personal-information',
						element: (
							<Suspense fallback={<LoaderSpinner />}>
								<PersonalInformationPageLazy />
							</Suspense>
						),
						loader: () => import('./pages/account/PersonalInformation').then(module => module.loader()),
						action: personalInformationAction,
					},
				],
			},
			{
				path: 'authentication',
				element: (
					<Suspense fallback={<LoaderSpinner />}>
						<AuthenticationPageLazy />
					</Suspense>
				),
				action: authenticationAction,
			},
		],
	},
]);

export default router;
