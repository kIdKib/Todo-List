'use strict'


const input = document.getElementById('input')
const add = document.getElementById('add')
const clear = document.getElementById('clear')
const url = document.getElementById('url')
const load = document.getElementById('load')
const list = document.getElementById('list')



//Nouvelle instance pour la clé 'tasks'
const storage = new Arraystorage('tasks')

// ON récupèer le tableau des tache deja existantes ou bien un tableau vide
let tasks = storage.list

// Une fonction qui ajoute les taches au DOM avec un bouton de suppression auq
const taskToDom = (task) =>{
    // Si on a une chaine non-vide
    if ( typeof task === 'string' && task ) {
        const li = document.createElement('li')
        const bouton = document.createElement('button')

        li.textContent = task
        bouton.textContent = 'REMOVE'

        bouton.addEventListener('click', () =>{
            const value = bouton.parentNode.firstChild.textContent
            storage.remove(value)
            list.removeChild(bouton.parentNode)
        })

        li.appendChild(bouton)
        list.insertBefore(li, list.firstChild)
        
        return true
    }
    return false
}

// On ajoute chaque tache a la liste a puces
tasks.forEach(task => taskToDom(task))

//On gère l'ajout de tache avac lebouton ADD et la touche 'Enter'
const newTask = () => {
    /*let textes = input.textNode()
    tasks.push(textes)*/
    if (storage.list.indexOf(input.value) === -1 && taskToDom(input.value)) {
        storage.set(input.value)        
        input.value = ''
    }
    input.focus()
    
}

add.addEventListener('click', newTask)
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        newTask()
    }
})

//On supprime la liste du DOM et du navigateur
clear.addEventListener('click', ()=>{
    storage.clear()
    list.innerHTML = ''
})


// On gere l'importation des taches
load.addEventListener('click', () =>{
    fetch(url.value)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(`${response.statusText} (${response.status})`)
        })
        .then(tasks => {
            if (Array.isArray(tasks)) {
                tasks.forEach(task => {
                    if (storage.list.indexOf(task) === -1 && taskToDom(task)) {
                        storage.set(task)
                    } 
               })
                return
            }
            throw new TypeError(`La rèponse n'est pas un tableau JSON (type: ${typeof tasks})`)
        } )
})





