import { NextResponse } from "next/server";

const getProductDetails = async (productId: string) => {
  const response = await fetch(
    `https://6670df540900b5f8724bd1b7.mockapi.io/products/${productId}`
  );
  const data = await response.json();
  return data;
};

export async function POST() {
  try {
    const response = await fetch(
      "https://6670df540900b5f8724bd1b7.mockapi.io/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    const groupedByProductId = data.reduce((acc: any, item: any) => {
      const productId = item.productId;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      acc[productId].push(item);
      return acc;
    }, {});

    const groupedArray = await Promise.all(
      Object.keys(groupedByProductId).map(async (productId) => {
        const productDetails = await getProductDetails(productId);
        return {
          productId,
          productName: productDetails.name,
          users: groupedByProductId[productId],
          totalCount: groupedByProductId[productId].length,
        };
      })
    );

    return NextResponse.json(groupedArray);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
