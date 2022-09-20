let Title = document.getElementById("Title")
let price = document.getElementById("price")
let discount = document.getElementById("discount")
let conter = document.getElementById("conter")
let catgory = document.getElementById("catgory")
let sbumit = document.getElementById("sbumit")
let total = document.getElementById("total")
let NumberOfThisType = document.getElementById("NumberOfThisType")
let NumberOfpacket = document.getElementById("NumberOfpacket")
let mood = "creat"
let temp;
let SerachMood = "title"

// get total 
function GetTotla() {
    if (price.value != "") {
        let resulat = +price.value - +discount.value
        total.innerHTML = resulat
        total.style.backgroundColor = "#1b7c1cd6"
    }
    else {
        total.innerHTML = ""
        total.style.backgroundColor = "#28bdbdd6"
    }
}
//  creat product
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
}
else {
    datapro = [];
}
sbumit.onclick = function () {
    let newpro = {
        title: Title.value.toLowerCase(),
        Price: price.value,
        Discount: discount.value,
        Total: total.innerHTML,
        NumberOfThisType: NumberOfThisType.value,
        NumberOfpacket: NumberOfpacket.value,
        Conter: conter.value,
        Catgory: catgory.value.toLowerCase(),
    }
    if (Title.value != '' && price.value != '' && catgory.value != '') {
        if (mood === 'creat') {
            if (newpro.Conter > 1) {
                for (let i = 0; i < newpro.Conter; i++) {
                    datapro.push(newpro)
                }
            } else {
                datapro.push(newpro)
            }
        } else {
            datapro[temp] = newpro;
            mood = 'creat'
            sbumit.innerHTML = 'creat'
            // conter.style.display = "block"
        }
        clear()
    }
    localStorage.setItem('product', JSON.stringify(datapro))

    showeData()

}

// clear input 
function clear() {
    Title.value = '';
    price.value = '';
    discount.value = '';
    total.innerHTML = '';
    NumberOfThisType.value = ''
    NumberOfpacket.value = ''
    catgory.value = '';
    conter.value = '';
}
//  read
function showeData() {
    GetTotla();
    let table = ''
    for (let i = 0; i < datapro.length; i++) {
        table += `                    
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].Price}</td>
        <td>${datapro[i].Discount}</td>
        <td>${datapro[i].Total}</td>
        <td>${datapro[i].NumberOfThisType}</td>
        <td>${datapro[i].NumberOfpacket}</td>
        <td>${datapro[i].Catgory}</td>
        <td><button onclick= UpData(${i}) id="Update">UpDate</button></td>
        <td><button onclick="deleteData(${i})" id="Delate">Delate</button></td>
        <td><button onclick="clear_1(${i})" id="Buying">Buying</button></td>
        <td><button onclick="clear_1PA(${i})" id="BuyingPA">BuyingPA</button></td>
    </tr>`

    }
    document.getElementById("tbody").innerHTML = table
    let clearData = document.getElementById("deleteAll")
    if (datapro.length > 0) {
        clearData.innerHTML = `
        <button onclick="deletaAll()" >Delate All : ${datapro.length}</button>
        `
    }
    else {
        clearData.innerHTML = ``

    }
}

showeData()
//  delete
function deleteData(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro)
    showeData()
}
//  deleta All  
function deletaAll() {
    localStorage.clear();
    datapro.splice(0)
    showeData();
}
// UpData 
function UpData(i) {
    Title.value = datapro[i].title
    price.value = datapro[i].Price
    discount.value = datapro[i].Discount
    conter.style.display = "none"
    catgory.value = datapro[i].Catgory
    sbumit.innerHTML = "Updata"
    NumberOfThisType.value = datapro[i].NumberOfThisType
    NumberOfpacket.value = datapro[i].NumberOfpacket
    mood = "UpData"
    temp = i
    GetTotla()
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
// serach 
function SerachMoods(id) {

    let serach = document.getElementById('serach')
    serach.style.display = "block"
    if (id == "sereachTitle") {
        SerachMood = "title"
        serach.placeholder = 'search by Title'
    } else {
        SerachMood = "Catgory"
        serach.placeholder = 'search by Catgory'
    }
    serach.value = ''
    showeData();
}

function serachData(value) {
    let table = ""
    for (let i = 0; i < datapro.length; i++) {
        if (SerachMood === "title") {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].Price}</td>
                <td>${datapro[i].Discount}</td>
                <td>${datapro[i].Total}</td>
                <td>${datapro[i].NumberOfThisType}</td>
                <td>${datapro[i].NumberOfpacket}</td>
                <td>${datapro[i].Catgory}</td>
                <td><button onclick= UpData(${i}) id="Update">UpDate</button></td>
                <td><button onclick="deleteData(${i})" id="Delate">Delate</button></td>
                <td><button onclick="clear_1(${i})" id="Buying">Buying</button></td>
                <td><button onclick="clear_1PA(${i})" id="BuyingPA">BuyingPA</button></td>
            </tr>`

            }


        }

        else {
            if (datapro[i].Catgory.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].Price}</td>
                <td>${datapro[i].Discount}</td>
                <td>${datapro[i].Total}</td>
                <td>${datapro[i].NumberOfThisType}</td>
                <td>${datapro[i].NumberOfpacket}</td>
                <td>${datapro[i].Catgory}</td>
                <td><button onclick= UpData(${i}) id="Update">UpDate</button></td>
                <td><button onclick="deleteData(${i})" id="Delate">Delate</button></td>
                <td><button onclick="clear_1(${i})" id="Buying">Buying</button></td>
                <td><button onclick="clear_1PA(${i})" id="BuyingPA">BuyingPA</button></td>
            </tr>`
            }


        }
    }
    document.getElementById("tbody").innerHTML = table
}
function clear_1(i) {
    if (datapro[i].NumberOfThisType > 0) {
        datapro[i].NumberOfThisType = datapro[i].NumberOfThisType - 1
        localStorage.product = JSON.stringify(datapro)
        showeData();
    }
    else if (datapro[i].NumberOfThisType == 0) {
        clear_1PA(i)
    }
}
function clear_1PA(i) {
    if (datapro[i].NumberOfpacket > 0) {
        datapro[i].NumberOfpacket = datapro[i].NumberOfpacket - 1
        localStorage.product = JSON.stringify(datapro)
        showeData();
    }
}