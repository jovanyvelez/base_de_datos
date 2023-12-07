import prisma from './prisma';

export async function productos() {
	const productos = await prisma.productos.findMany();

	prisma.$disconnect();

	return productos;
}

export async function productos_por_categoria(categoria: string) {
	const productos = await prisma.productos.findMany({
		where: {
			name: categoria
		}
	});
	return productos;
}

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

export async function obtenerRelacionesCategorias(idCategoria: string) {
	const categorias = await prisma.categorias.findMany({
		where: {
			id: idCategoria
		},
		select: {
			id: true,
			name: true,
			root: { select: { hijo: true } },
			padre: { select: { hijo: true } },
			hijo: { select: { hijo: true } }
		}
	});
	console.log(categorias);
	return categorias;
}

export async function prueba(categoriaConsulta:string) {
	console.time('query');
	const users = await prisma.$queryRaw`
	SELECT p.name
	FROM productos p
	WHERE p."categoriaId" IN (
		SELECT c.id
		FROM categoriasclosure cc
		JOIN categorias c ON cc.hijo = c.id
		WHERE (cc.root = ${categoriaConsulta} or 
				cc.padre = ${categoriaConsulta} or 
				cc.hijo = ${categoriaConsulta})
	)
`;

	prisma.$disconnect();
	console.timeEnd('query');
	return users;
}
