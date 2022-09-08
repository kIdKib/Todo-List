'use strict'


//Stockage local de nos taches
class Arraystorage {
    //constructor to intialise the object and the name of the key and is contain i.e is value
    constructor(name) {
        this.name = name
        this.list =this.get()
    }

    //a method to recupurate an array of values or by default, create it
    get() {
        if (!localStorage.getItem(this.name)) {
            localStorage.setItem(this.name , '[]')
        }
        return JSON.parse(localStorage.getItem(this.name))
    }

    //a method for adding a value in the array
    set(value) {
        this.list.push(value)
        localStorage.setItem(this.name, JSON.stringify(this.list) )
    }

    // method to delete a value from the array
    remove(value) {
        const index = this.list.indexOf(value)
        this.list.splice(index,1)
        localStorage.setItem(this.name, JSON.stringify(this.list))
    }

    //method for empytying the array 
    clear() {
        localStorage.removeItem(this.name)
    }

}


