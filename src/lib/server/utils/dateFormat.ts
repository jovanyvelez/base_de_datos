
export const formatCurrentDate = (date: string) => {

    let fecha =  new Date(date);
    let dd:string;
    let mm:string;

	// Obtener día, mes y año
	const dia = fecha.getDate();
	const mes = fecha.getMonth() + 1; // El mes comienza desde 0 (Enero es 0), por eso se suma 1
	const year = fecha.getFullYear();

	// Asegurarse de que el día y el mes tengan dos dígitos
    dia < 10 ? dd = '0' + dia : dd = dia.toString();
	mes < 10 ? 	mm = '0' + mes : mm = mes.toString();
	
	return `${dd}-${mm}-${year.toString()}`;
};
