import { Product } from "@prisma/client";
import { prisma } from "../infrastructure/db";

export const all = async (): Promise<Product[]> => {
  const products = await prisma.product.findMany();
  return products;
};

export const find = async (id: string): Promise<Product | null> => {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(id) },
  });

  return product;
};

export const findMany = async (ids: string[]): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: { id: { in: ids.map((id) => parseInt(id)) } },
  });

  return products;
};

export const pagination = async (skip: number, take: number): Promise<Product[]> => {
  console.log(skip, take)
  const products = await prisma.product.findMany({
    skip: skip,
    take: take,
  });

  return products;
};

export const update = async (id: string, updateData: any): Promise<any> => {
  const result = await prisma.product.update({
    where: { id: parseInt(id) },
    data: updateData
  });

  return result;
};

export const create = async (
  title: string,
  description: string,
  price: number,
  imageUrl: string = "https://i.imgur.com/EyoQOjC.jpg",
): Promise<Product> => {
  const newProduct = await prisma.product.create({
    data: {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    },
  });

  return newProduct;
};
