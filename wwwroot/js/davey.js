const uri = 'api/TodoItems';
let todos = [];
davesThingsDeleted = "";
var strNow = "";
function daviesAlert() {
    alert("Rock It!");
}
function daviesAlert2(alertText) {
    alert(alertText);
}
function getItems() {
    fetch(uri)
        .then(response => response.json())
        //.then(data => _displayItems(data))
        .then(goodForNothingData => davesDisplayItems(goodForNothingData))
        .catch(error => console.error('Unable to get items.', error));
}
function addItem() {
    const addNameTextbox = document.getElementById('add-name');

    //alert("from AddItem"); //added by DavieB
    var nowy = new Date(document.getElementById('add-dueDate').value);  //added 2021-02-24 1:59
    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
        , dueDate: nowy
        //, dueDate: nowy.toDateString() //added 2021-02-24 3:56
        //, dueDate: document.getElementById('add-dueDate').value   //added 2021-02-24 3:01, commented 3:47
        //, dueDate: document.getElementById('add-dueDate').value.toDateString()    //added 2021-02-24 3:48
        /*, dueDate: nowy     added 2021-02-24 1:59 but don't need since there's 
         * a box for it in the Add form, so commented 3:01 */
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            document.getElementById('add-dueDate').value = strNow;  //added 2021-02-24 5:51
        })
        .catch(error => console.error('Unable to add item.', error));
}
function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}
function davesDeleteItem(id, isComplete, namey, dueDate) {
    var didIt = '<font color="';
    if (!isComplete) didIt += 'red">NOT ';
    else didIt += 'green">'
    davesThingsDeleted += "<li><b>" + namey + "</b> - <i>"
        + dueDate.substring(0, dueDate.indexOf("T")) + "</i> - " +
        didIt +  "Complete</font></li>";   //2013-02-13 added
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}
function davesDeleteMissingItem(id) {
    fetch(`${uri}/113`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
} 
function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}
function davesDisplayEditForm2(idy, namey, isComplete, dueDate) {
    document.getElementById('edit-name').value = namey;
    document.getElementById('edit-id').value = idy;
    document.getElementById('edit-isComplete').checked = isComplete;
    //document.getElementById('edit-dueDate').value = dueDate; //2021-02-24 3:13 added
    //added 2021-02-24 4:22:
    document.getElementById('edit-dueDate').value = dueDate.substring(0,dueDate.indexOf("T")); 
    document.getElementById('editForm').style.display = 'block';
}
function davesDisplayEditForm(item) {
    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}
function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
        , dueDate: document.getElementById('edit-dueDate').value    //added 2021-02-24 3:34
    };
    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));
    closeInput();
    return false;
}
function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}
function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}
function defaultDueDate() {
    var nowy = new Date();
    strNow = nowy.toISOString().substring(0, nowy.toISOString().indexOf("T"))
    document.getElementById('add-dueDate').value = strNow;
        //nowy.toUTCString();
        //nowy.toString(); // nowy.toDateString();
}
function davesDisplayItems(stankinData) {
    //alert("in davesDisplayItems");    //displays, so it goes into this function
    //davesDiv.innerHTML = '';
    if (stankinData.length == 1)
        concaty = "There is 1 stankin item<ul>";
    else
        concaty = "There are " + stankinData.length + " stanking items <ul>"; // data.itemCount doesn't work
    //const button = document.createElement('button');
    //data.     I can't find any property/method that resets to the beginning
    stankinData.forEach(stankinItem => {
        if (stankinItem.isComplete)
            concaty += "<li><font color='green'> Wow, you finally <b>" + stankinItem.name +
                "</b>, which was due on " + stankinItem.dueDate.substring(0, stankinItem.dueDate.indexOf("T")) +
                "<br/>, after years of nagging.  It's a miracle!</font>";
        else
            concaty += "<li><font color='red'>Your lazy ass needs to get off the couch and <b>" +
                stankinItem.name + "</b><br/> by " + stankinItem.dueDate.substring(0,
                    stankinItem.dueDate.indexOf("T")) + ", you mangy scoundrel!</font>";
        //alert(item.name);     works
        //concaty += "<li>" +  + " - " + isDone;
        /*let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `davesDisplayEditForm(${stankinItem})`); */
        //concaty += '<input type="button" value="edit" onclick="displayEditForm(' + stankinItem.id + ');"';    
        concaty += '&nbsp;<input type="button" value="edit" onclick="davesDisplayEditForm2(' + stankinItem.id +
            ", '" + stankinItem.name.replace(/'/g, "\\'") + "', " + stankinItem.isComplete +
            ", '" + stankinItem.dueDate + '\');"/>'; //2021-02-24 3:42 added 
            //", '" + stankinItem.dueDate.toDateString() + '\');"/>'; //2021-02-24 3:42 added .toDateString()
            //", " +  stankinItem.dueDate + ');"/>'; //2021-02-24 3:13 added dueDate        doesn't work
        concaty += '&nbsp;<input type="button" value="delete" onclick="davesDeleteItem(' +
            stankinItem.id + ", " + stankinItem.isComplete + ', \'' + stankinItem.name.replace(/'/g, "\\'")
            + "', '" + stankinItem.dueDate + '\'); "/>';
        /*concaty += '&nbsp;<input type="button" value="deleteError" onclick="davesDeleteMissingItem(' +
            stankinItem.id + ');"/>';   I was hoping it would handle the error well but it doesn't. */
        concaty += "</li>";
    });
    davesDiv.innerHTML = concaty + "</ul> Things deleted: <ul>" + davesThingsDeleted + "</ul>";
}
function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';
    _displayCount(data.length);
    const button = document.createElement('button');
    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
        let tr = tBody.insertRow();
        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);
        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);
        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);
        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });
    todos = data;
}