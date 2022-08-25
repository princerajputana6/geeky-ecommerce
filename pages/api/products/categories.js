import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['Shirts', 'Pants', 'Books', 'Furniture', 'Smartphones'];
  res.send(categories);
});

export default handler;
