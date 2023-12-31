import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import Wrapper from '../components/ui/wrappers/wrapper/Wrapper';
import Header from '../components/header/Header';
import Error from '../components/ui/modals/error/Error';
import Footer from '../components/nav-sections/footer/Footer';

const RootPage = () => {
	const isError = useSelector(state => state.error.isError);
	const isLoading = useSelector(state => state.loading.isLoading);

	return (
		<>
			<Wrapper layoutWrapper={true}>
				<Toaster richColors />
				{isError === true && <Error />}
				{!isLoading && <Header />}
				<Outlet />
			</Wrapper>
			{!isLoading && <Footer />}
		</>
	);
};

export default RootPage;
