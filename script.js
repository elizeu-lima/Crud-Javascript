const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sPlaca = document.querySelector('#m-placa')
const sBloco = document.querySelector('#m-bloco')
const sApto = document.querySelector('#m-apto')
const sData = document.querySelector('#m-data')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sPlaca.value = itens[index].placa
    sBloco.value = itens[index].bloco
    sApto.value = itens[index].apto
    sData.value = itens[index].data
     
    id = index
  } else {
    sNome.value = ''
    sPlaca.value = ''
    sBloco.value = ''
    sApto.value  = ''
    sData.value  = ''

  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.placa}</td>
    <td> ${item.bloco}</td>
    <td> ${item.apto}</td>
    <td> ${item.data}</td>


    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sPlaca.value == '' || sBloco.value == '' || sApto.value == '' || sData.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].placa = sPlaca.value
    itens[id].bloco = sBloco.value
    itens[id].apto = sApto.value
    itens[id].data = sData.value

  } else {
    itens.push({'nome': sNome.value, 'placa': sPlaca.value, 'bloco': sBloco.value, 'apto': sApto.value, 'data': sData.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()