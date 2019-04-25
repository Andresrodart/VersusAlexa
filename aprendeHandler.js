class Aprender {
	constructor(nivel, tema, informacion) {
	  	this.nivel = nivel;
	  	this.tema = tema;
		this.informacion = informacion;
		this.estado = 'inicial';
		this.temasDados = [];
	}
	maquinaDeEstados(){
		if (this.estado === 'inicial')
			return this.inicial();
	}
	inicial(){
		let TemaADar = Math.floor(Math.random() * this.informacion[this.tema].length);
		this.temasDados.push(TemaADar);
		return `<speak> 
					Vamos a empezar <break time="2s"/>.
					Te contaré sobre <emphasis level="moderate">${this.informacion[this.tema][TemaADar].titulo}</emphasis>
					${this.informacion[this.tema][TemaADar].catedra} 
				</speak>`
	}
}

module.exports = Aprender;