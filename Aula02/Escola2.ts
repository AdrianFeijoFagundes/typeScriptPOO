import * as readLineSync from 'readline-sync'

class Professor {
    nome: string
    idade: number
    ano_xp : number

    constructor(nome: string, idade: number, ano_xp: number) {
        this.nome = nome
        this.idade = idade 
        this.ano_xp = ano_xp
    }

    getProfessor(): string {
        return `
        Nome do professor: ${this.nome}
        Idade: ${this.idade}
        Anos de experiência: ${this.ano_xp}
        `
    }

    setProfessor(): void{
        let nomeUp = readLineSync.question('Qual o nome do professor? ')
        let idadeUp = readLineSync.questionInt('Qual a idade de professor? ')
        let ano_xp = readLineSync.questionInt('Quantos anos de experiencia ele tem? ')

        this.nome = nomeUp
        this.idade = idadeUp
        this.ano_xp = ano_xp
    }

}
class Escola {
    prof : Professor
    nomeEscola: string
    endEscola: string
    numEscola: number

    constructor(nomeEscola: string, prof: Professor, endEscola: string, numEscola: number) {
        this.nomeEscola = nomeEscola
        this.prof = prof
        this.endEscola = endEscola
        this.numEscola = numEscola
    }
    getEscola(): string {
        return `
            o nome da escola é: ${this.nomeEscola}
            endereço: ${this.endEscola}
            número: ${this.numEscola}
            Professor: ${this.prof.nome}
        `
    }

    setEscola(): void {
        const nomeEscolaUp = readLineSync.question('Qual o nome da escola? ')
        const endEscolaUp = readLineSync.question('Qual o endereco da escola? ')
        const numEscolaUp = readLineSync.questionInt('Qual o numero da escola? ')
    
        this.nomeEscola = nomeEscolaUp
        this.endEscola = endEscolaUp
        this.numEscola = numEscolaUp
    }

}
const databaseProfessores : Array<Professor> = []
const databaseEscolas : Array<Escola> = []

function selecionarProfessor(professores : Array<Professor> ) : number {
    console.log('Escolha um professor pelo código')
    for (let i = 0; i < professores.length; i++) {
        console.log(`Código ${i + 1} | ${professores[i].nome} | ${professores[i].idade} | ${professores[i].ano_xp}`)
    }
    return readLineSync.questionInt('Qual professor voce escolhe (digite o código dele) ?') - 1
}

let value : boolean = true
while (value) {
    console.log(`
            == MENU ==
        1. Criar Professor
        2. Criar Escola
        3. Modificar Professor
        4. Modificar Escola
        5. Visualizar Professor
        6. Visualizar Escola
        7. Sair

    `)
    const res: number = readLineSync.questionInt('Qual opcao voce escolhe? ')
    switch (res) {
        case 1:
            let nome = readLineSync.question('Qual o nome do professor? ')
            let idade = readLineSync.questionInt('Qual a idade de professor? ')
            let ano_xp = readLineSync.questionInt('Quantos anos de experiencia ele tem? ')

            const novoProfessor = new Professor(nome, idade, ano_xp)
            databaseProfessores.push(novoProfessor)
            break
        case 2:
            const nomeEscola = readLineSync.question('Qual o nome da escola? ')
            const endEscola = readLineSync.question('Qual o endereco da escola? ')
            const numEscola = readLineSync.questionInt('Qual o numero da escola? ')

            const indexEscolhido = selecionarProfessor(databaseProfessores)
            const professor = databaseProfessores[indexEscolhido]

            const novaEscola = new Escola(nomeEscola, professor, endEscola, numEscola)
            databaseEscolas.push(novaEscola)
            break
        case 3:
            console.log(databaseProfessores[0].setProfessor())
            break
            case 4:
            console.log(databaseEscolas[0].setEscola())
            break
        case 5:
            console.log(databaseProfessores[0].getProfessor())
            break
        case 6:
            console.log(databaseEscolas[0].getEscola())
            break
        case 7:
            console.log('Encerrando programa')
            value = false           
            break    
    }
    if (value === true) {
        const novoValor : string = readLineSync.question('Deseja continuar? S/N')
        if (novoValor === 'S' || novoValor === 's' || novoValor === '') {
        } else {
            value = false
        }
    }  
}
