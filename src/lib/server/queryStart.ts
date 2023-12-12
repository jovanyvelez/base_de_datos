import prisma from './prisma';

export async function crearCategoriaRaiz(categoria: string) {
	const newCategory = await prisma.categorias.create({
		data: {
			name: categoria
		}
	});

	const { id } = newCategory;

	await prisma.categoriasclosure.create({
		data: {
			root: id,
			padre: id,
			hijo: id,
			depth: 0
		}
	});

	return newCategory;
}

export async function productosPorCategoria(categoriaConsulta:string) {
	const productos = await prisma.$queryRaw`
	SELECT productos.id, productos.name, price.name as price_type, price.price, image.name as image_type, image.secure_url
	FROM productos
	JOIN price ON productos.id = price.product_id
	JOIN image on productos.id = image.product_id
	WHERE productos."categoria_id" IN (
		SELECT categorias.id
		FROM categoriasclosure
		JOIN categorias ON categoriasclosure.hijo = categorias.id
		WHERE (categoriasclosure.root = ${categoriaConsulta} or 
				categoriasclosure.padre = ${categoriaConsulta} or 
				categoriasclosure.hijo = ${categoriaConsulta})
	)
	ORDER BY random()
	LIMIT 4
`;

	console.log(productos)
	prisma.$disconnect();
	return productos;
}



export async function categoriasPrincipales() {
	const productos = await prisma.$queryRaw`
	SELECT categorias.name as categoria, categorias.id , productos.id as product_id, productos.name, price.name as price_type, price.price, image.name as image_type, image.secure_url
	FROM productos
	JOIN price ON productos.id = price.product_id
	JOIN image on productos.id = image.product_id
	JOIN categorias on productos."categoria_id" = categorias.id
	WHERE productos."categoria_id" IN (
		SELECT categorias.id
		FROM categoriasclosure
		JOIN categorias ON categoriasclosure.hijo = categorias.id
		WHERE (categoriasclosure.root = categoriasclosure.padre and 
				categoriasclosure.padre = categoriasclosure.hijo )
	)
	ORDER BY random()
	LIMIT 4
`;

	prisma.$disconnect();
	return productos;
}