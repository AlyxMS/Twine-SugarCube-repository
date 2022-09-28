State.variables.uidSerial = 0; //UID Serial Init;

//Item Class, based on GwenTastic's class guide :3
window.Item = class Item {
    constructor(config = null) {
        this.name = "Generic Item";
        this.description = "Undefined Description.";
        this.type = "generic";
        this.stackable = true;
        this.amount = 1;
        this.value = 0;
        this.tags = [];
        if (config != null) { Object.keys(config).forEach(function (key) { this[key] = clone(config[key]); }, this); }
        this.uid = this.uid ?? State.variables.uidSerial++;
    }
    clone() { return new this.constructor(this); }
    toJSON() {
        let ownData = {};
        Object.keys(this).forEach(function (key) { ownData[key] = clone(this[key]); }, this);
        return JSON.reviveWrapper(`new ${this.constructor.name}($ReviveData$)`, ownData);
    }
}

setup.sortInventory = function (targetInventory = State.variables.inventory) {
    targetInventory.sort((a, b) => a.uid - b.uid);
}

setup.addItem = function (item, amount = 1, targetInventory = State.variables.inventory) {
    let index = targetInventory.findIndex(element => element.uid === item.uid);
    if (item.stackable) {
        if (index === -1) {
            //If item not found in inventory
            item = clone(item);
            item.amount = amount;
            targetInventory.push(item);
        } else {
            targetInventory[index].amount += amount;
        }
    } else {
        for (let i = 0; i < amount; i++) { targetInventory.push(clone(item)); }
    }
}

setup.removeItem = function (item, amount = 1, targetInventory = State.variables.inventory) {
    let index = targetInventory.findIndex(element => element.uid === item.uid);
    if (index === -1) return;
    if (item.stackable && targetInventory[index].amount > amount) targetInventory[index].amount -= amount;
    else targetInventory.splice(index, 1);
}

setup.countItem = function (item, targetInventory = State.variables.inventory) {
    let index = targetInventory.findIndex(element => element.uid === item.uid);
    if (index === -1) return 0;
    if (item.stackable) {
        return targetInventory[index].amount;
    } else {
        let amount = 0;
        for (let element of targetInventory) { if (element.uid === item.uid) amount += element.amount; }
        return amount;
    }
}