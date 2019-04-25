class Aprender {
	constructor(nivel, tema, informacion) {
	  	this.nivel = nivel;
	  	this.tema = tema;
		this.informacion = informacion;
		this.estado = 'inicial';
		this.temasDados = [];
		this.informacionLen = this.informacion[this.tema].length;
	}
	maquinaDeEstados(){
		if (this.estado === 'inicial')
			return this.inicial();
		else if (this.estado === 'continuar')
			return this.continuar();
	}
	inicial(){
		let TemaADar = Math.floor(Math.random() * this.informacionLen);
		let myResponse = `<speak> 
					Vamos a empezar <break time="1s"/>.
					Te contaré sobre <emphasis level="reduced">${this.informacion[this.tema][TemaADar].titulo}</emphasis> <break time="1s"/>.
					${this.informacion[this.tema][TemaADar].catedra}. <break time="1s"/> 
					Quieres saber un poco más de información di continuar o no continuar
				</speak>`;
		let tempSubTema = this.informacion[this.tema][TemaADar];
		let lastSubTema = this.informacion[this.tema][this.informacionLen - 1];
		this.informacion[this.tema][TemaADar] = lastSubTema;
		this.informacion[this.tema][this.informacionLen - 1] = tempSubTema;
		this.informacionLen--;
		
		return myResponse;
	}
	continuar(){
		if (this.informacion <= 0)
			return `<speak> 
						Ya te he enseñado todo lo que se
					</speak>`
			let TemaADar = Math.floor(Math.random() * this.informacionLen);
			let myResponse = `<speak> 
						Siguiente tema padawan <break time="1s"/>.
						Hablaré sobre <emphasis level="reduced">${this.informacion[this.tema][TemaADar].titulo}</emphasis> <break time="1s"/>.
						${this.informacion[this.tema][TemaADar].catedra}. <break time="1s"/> 
						Quieres saber un poco más de información di continuar o no continuar
					</speak>`;
			let tempSubTema = this.informacion[this.tema][TemaADar];
			let lastSubTema = this.informacion[this.tema][this.informacionLen - 1];
			this.informacion[this.tema][TemaADar] = lastSubTema;
			this.informacion[this.tema][this.informacionLen - 1] = tempSubTema;
			this.informacionLen--;
			
			return myResponse;
	}
}

module.exports = Aprender;