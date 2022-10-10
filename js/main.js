import {datubasea} from './datubasea.js'


let indizea = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let btnBilatu = document.getElementById('bilatu')
let kontLabel = document.getElementById('libKop')

function eremuakBete(){

    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename
    kontLabel.textContent = datubasea.length

}


function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })
    btnBilatu.addEventListener('click', (event) => {
        bilatu()
    })




}


function bilatu(){
    fetch( 'https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn.value +  '&format=json&jscmd=details' )
        .then( r => r.json() )
        .then (r => {
            console.log(r)
            let path = "ISBN:" + isbn.value
            let titulua = r[path].details.title
            let egilea = r[path].details.authors[0].name
            let data = r[path].details.created.value
            const options = { year: 'numeric', month: 'short', day: 'numeric' }
            let parsed_date = new Date(data).toLocaleDateString('en', options)
            let filename = r[path].thumbnail_url.slice(-13).replace('S', 'M')
            if(datubasea.filter(i => i.isbn == isbn.value).length >= 1){
                console.log("Jadanik existitzen da")
            }
            else{
                datubasea.push({isbn: isbn.value, egilea: egilea, data: parsed_date, izenburua: titulua, filename: filename})
                console.log("Ez zen existitzen")
            }
            console.log(datubasea)
            indizea = datubasea.length - 1
            eremuakBete()
        })
    
}



window.onload = kargatu;

