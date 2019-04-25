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
		if (this.estado === 'inicial')
			return this.inicial();
	}
	inicial(){
		return `<speak> 
					Vamos a empezar <break time="3s"/>.
					<emphasis level="strong">${this.informacion[this.tema].catedra}</emphasis>  
				</speak>`
	}
}

module.exports = Aprender;