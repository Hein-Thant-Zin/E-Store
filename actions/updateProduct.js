async function updateProduct(id, data) {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;

  data = {
    ...data,
    category: {
      connect: [data.categoryId],
    },
    size: {
      connect: [data.sizeId],
    },
    color: {
      connect: [data.colorId],
    },
  };

  const res = await fetch(URL, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res;
}

export default updateProduct;
