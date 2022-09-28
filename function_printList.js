setup.printList = function printList(list) {
    let output = "";
    list.forEach((element, index) => {
        switch (index) {
            case list.length - 1: output += element; break;
            case list.length - 2: output += element + " and "; break;
            default: output += element + ", ";
        }
    })
    return output;
}
