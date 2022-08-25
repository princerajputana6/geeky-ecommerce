import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/Store';
import Image from 'next/image';
import banner1 from '../Assets/1.jpg';
import banner2 from '../Assets/2.jpg';
import banner3 from '../Assets/3.webp';
import Carousel from 'react-bootstrap/Carousel';
export default function Home() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    enqueueSnackbar(`${product.name} added to the cart`, {
      variant: 'success',
    });
    router.push('/cart');
  };

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Carousel fade>
            <Carousel.Item>
              <Image src={banner2} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <Image src={banner1} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
              <Image src={banner3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <Typography sx={{ margin: '50px 0', fontSize: '26px' }}>
            Featured Items
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} key={product.slug}>
                <ProductItem
                  product={product}
                  addToCartHandler={addToCartHandler}
                ></ProductItem>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
}
