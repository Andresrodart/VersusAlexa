class Aprender {
	constructor(nivel, tema, informacion) {
	  	this.nivel = nivel;
	  	this.tema = tema;
		this.informacion = informacion;
		this.estado = 'inicial';
		this.temasDados = [];
	}
	maquinaDeEstados(){
		var response;
		if (estado = 'inicial')
			response =  inicial()
	}
	inicial(){
		return `<speak> 
					Vamos a empezar <break time="3s"/>.
					<emphasis level="strong">really like</emphasis>  
				</speak>`
	}
}