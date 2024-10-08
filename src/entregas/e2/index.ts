import * as readLineSync from 'readline-sync';
import { Product } from './classes/Product';
import { Sell } from './classes/Sell';



const item1 = new Product(1, 'Realme 7', 'Realme', 700, 1500, 70);
const item2 = new Product(2, 'Controle de PS5', 'Sony', 100, 200, 200,);
const item3 = new Product(3, 'Fones de ouvido', 'Genérico', 15, 30, 300,);

const allProducts: Array<Product> = [];
allProducts.push(item1); 
allProducts.push(item2); 
allProducts.push(item3); 
const totalSells: Array<Sell> = [];

function printProducts(): void {
    for (let i = 0; i < allProducts.length; i++) {
        console.log(allProducts[i].getProduct())
    }
}
function printSells(): void {
    for (let i = 0; i < totalSells.length; i++) {
        console.log(totalSells[i].getSell())
    }

}
function selectedProduct(arr: Array<Product>) {
    const option = readLineSync.questionInt() - 1
    return arr[option]
}


function main() : void {
    let menu : string = '';

    while (menu != 'N' && menu != 'n') {
        console.log(" ========= Menu =========\n 1. Cadastrar novo Produto\n 2. Ver produtos\n 3. Realizar Venda\n 4. Ver vendas\n 5. Sair do programa\n ========================\n")

        console.log(" Escolha uma opção")
        let option = readLineSync.questionInt(); 
        console.clear()
        switch (option) {
            case 1:
                const idProduct = allProducts.length + 1 
                console.log("Qual o nome do produto?")
                const productName = readLineSync.question()
              
                console.log("Qual a marca do produto?")
                const brand = readLineSync.question()

                console.log("Qual o preço de custo do produto?")
                const initialPrice = readLineSync.questionInt()
            
                console.log("Qual o preço final do produto?")
                const finalPrice = readLineSync.questionInt()
                
                console.log("Qual a quantidade em estoque?")
                const stockAmount = readLineSync.questionInt()
                console.clear()

                const newProduct = new Product(idProduct, productName, brand, initialPrice, finalPrice, stockAmount)
                allProducts.push(newProduct)
                break
            case 2:
                printProducts()
                break
            case 3:
                const idSells = totalSells.length + 1 
                const date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo'})
                let discountValue: number = 0
                let discountPercentage: number = 0

                const client = readLineSync.question('Qual o nome do cliente? ')
                console.clear()

                printProducts()
                let product = selectedProduct(allProducts)

                console.clear()

                const amout = readLineSync.questionInt('Qual a quantidade? ' )
                console.clear()

                let sell = new Sell(idSells, client, product, amout, date);

                console.log("Vai ser aplicado desconto nessa venda?\n 1. Sim\n 2. Não")
                option = readLineSync.questionInt()
                console.clear()

                if(option === 1) {
                    console.log("O desconto é em:\n 1. Valor fixo\n 2. Porcentagem\n 3. Porcentagem + Valor fixo")
                    option = readLineSync.questionInt()
                    console.clear()
                    switch (option) {    
                        case 1:
                            console.log("Qual o valor do desconto?")
                            discountValue = readLineSync.questionInt()
                            console.clear()
                            break
                        case 2:
                            console.log("Qual a porcentagem do desconto?")
                            discountPercentage = readLineSync.questionInt()
                            console.clear()
                            break
                        case 3:
                            console.log("Qual a porcentagem do desconto?")
                            discountPercentage = readLineSync.questionInt()
                            console.clear()
                            console.log("Qual o valor do desconto?")
                            discountValue = readLineSync.questionInt()
                            console.clear()
                            break
                    }
                }
         
                if (option === 1) {
                    sell.setDiscountValues(discountValue, discountPercentage)
                }
               
                console.log("Total sem descontos: R$" + sell.calcTotal())
                console.log("Descontos: R$" + sell.calcDiscont())
                console.log("Preço final: R$" + sell.calcFinalPrice())                

                console.log("\n Qual o método de pagamento? \n 1.PIX\n 2.Crédito\n 3.Débito\n 4.Dinheiro\n")
                option = readLineSync.questionInt() - 1;
                
                const paymentMethodsList: Array<string> = ['PIX','Crédito','Débito','Dinheiro']

                const paymentMethod = paymentMethodsList[option]
                console.clear()

                sell.setPayment(paymentMethod)

                totalSells.push(sell);
                break
            case 4:
                printSells()
                break
            case 5:
                break

        }
        console.log("Deseja continuar usando o programa? (S/N)")
        menu = readLineSync.question();
        console.clear()

        option = 0;
    }
}

main()