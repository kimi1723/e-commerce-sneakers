import { Suspense } from 'react';
import { useLoaderData, Await, defer } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import getProductsData from '../utils/getProductsData';
import getImages from '../utils/getImages';

import Product from '../components/product/Product';
import Wrapper from '../components/ui/wrappers/Wrapper';
import LoaderSpinner from '../components/ui/LoaderSpinner';

const ProductPage = () => {
	const { productData } = useLoaderData();
	console.log(productData);
	return (
		<Suspense fallback={<LoaderSpinner title="product" />}>
			<Await resolve={productData}>
				{({ productDetails, imagesData }) => {
					return (
						<Wrapper>
							<Product productDetails={productDetails} imagesData={imagesData} />
							<Outlet />
						</Wrapper>
					);
				}}
			</Await>
		</Suspense>
	);
};

export const productLoader = async params => {
	const id = params.id;
	const productData = await getProductsData(`/products/${id}`);
	const imagesUrls = await getImages(id, 'all');

	const { imagesAlts, ...productDetails } = productData;

	const imagesData = {
		urls: imagesUrls,
		alts: imagesAlts,
	};

	return { productDetails, imagesData };
};

export const loader = ({ params, request }) => {
	return defer({
		productData: productLoader(params),
	});
};

export default ProductPage;
