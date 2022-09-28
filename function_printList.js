setup.printList = function printList(list) {
    let output = "";
    while (list.length) {
        switch (list.length) {
            case 1: output += list.shift(); break;
            case 2: output += list.shift() + " and "; break;
            default: output += list.shift() + ", ";
        }
    }
    return output;
}