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
	const users = await prisma.$queryRaw`
	SELECT p.name
	FROM productos p
	WHERE p."categoria_id" IN (
		SELECT c.id
		FROM categoriasclosure cc
		JOIN categorias c ON cc.hijo = c.id
		WHERE (cc.root = ${categoriaConsulta} or 
				cc.padre = ${categoriaConsulta} or 
				cc.hijo = ${categoriaConsulta})
	)
`;

	prisma.$disconnect();
	return users;
}

export async function categoriasRaices() {
	const raices = await prisma.$queryRaw`
	SELECT c.name
		FROM categoriasclosure cc
		JOIN categorias c ON cc.hijo = c.id
		WHERE cc.padre = cc.root and cc.hijo = cc.root
`;

	prisma.$disconnect();
	return raices;
}