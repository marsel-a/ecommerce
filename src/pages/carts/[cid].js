import { useRouter } from 'next/router';

const CartDetails = () => {
  const router = useRouter();

  const { cid } = router.query;

  return (
    <div className="prose w-full max-w-4xl flex-grow">
      <h1>Cart {cid}</h1>
    </div>
  );
};

export default CartDetails;

