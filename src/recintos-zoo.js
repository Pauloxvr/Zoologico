class RecintosZoo {
    constructor() {
      
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: { 'MACACO': 3 } },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: { 'GAZELA': 1 } },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: { 'LEAO': 1 } }
      ];
  
      
      this.animais = {
        'LEAO': { tamanho: 3, biomas: ['savana'] },
        'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
        'CROCODILO': { tamanho: 3, biomas: ['rio'] },
        'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
        'GAZELA': { tamanho: 2, biomas: ['savana'] },
        'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      
      if (!this.animais[tipoAnimal]) {
        return { erro: 'Animal inválido' };
      }
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const animalInfo = this.animais[tipoAnimal];
      let recintosViaveis = [];
  
      this.recintos.forEach(recinto => {
        
        if (!recinto.bioma.includes(animalInfo.biomas.join('') || 
            (animalInfo.biomas.length === 1 && recinto.bioma.includes(animalInfo.biomas[0])))) {
          return;
        }
  
        
        const tamanhoNecessario = quantidade * animalInfo.tamanho;
        const espaçoOcupado = Object.keys(recinto.animais).reduce((acc, especie) => {
          return acc + (recinto.animais[especie] * this.animais[especie].tamanho);
        }, 0);
  
        
        let espaçoExtra = 0;
        if (Object.keys(recinto.animais).length > 0) {
          espaçoExtra = 1; 
        }
  
        const espaçoLivre = recinto.tamanhoTotal - espaçoOcupado - tamanhoNecessario - espaçoExtra;
  
        
        if (animalInfo.biomas.includes('savana') && animalInfo.biomas.includes('rio')) {
          
          if (tipoAnimal === 'HIPOPOTAMO') {
            if (!recinto.bioma.includes('savana') || !recinto.bioma.includes('rio')) {
              return;
            }
          }
        }
  
        if (tipoAnimal === 'MACACO' && quantidade > 1 && Object.keys(recinto.animais).length === 0) {
          return; 
        }
  
        if (espaçoLivre >= 0) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${recinto.tamanhoTotal})`);
        }
      });
  
     
      if (recintosViaveis.length === 0) {
        return { erro: 'Não há recinto viável' };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  