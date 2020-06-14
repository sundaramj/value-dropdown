const time = 1000;

// set Image link on select file 
var imgsrc = '';
document.getElementById('item-file').addEventListener('change', event => {
    imgsrc = URL.createObjectURL(event.target.files[0]);                                 
})

// Success message timeout
let successTimeOut = (time) => {
    setTimeout(() => {
        document.getElementsByTagName('h1')[0].remove();
    },time)
};

// display dropdown on button click
var displayDropDown = (event,callback, successcallback, resetFormData) => {            
    if(document.getElementById('item-dropdown')){
        var createSelect = document.getElementById('item-dropdown');
    }else{                
        var createSelect = document.createElement('select');
        createSelect.id = 'item-dropdown';
        let createOption = document.createElement('option')
        createOption.setAttribute('value','');
        let createTextNode = document.createTextNode('Select Item');
        createOption.appendChild(createTextNode);
        createSelect.appendChild(createOption);
        callback(createSelect);                
    }

    let createOption = document.createElement('option')
    createOption.setAttribute('value',imgsrc);
    
    let createTextNode = document.createTextNode(document.getElementById('item-name').value);
    createOption.appendChild(createTextNode);            
    createSelect.appendChild(createOption);
    document.body.appendChild(createSelect);
    successcallback('Successfully added',successTimeOut);
    resetFormData();
    event.preventDefault();
}

// display image on change of dropdown option
let displayImage = (event) => {
    var imageTag = document.getElementById('image-tag');
    var createDiv = document.getElementById('image-design');
    if(event.target.value){                                
        if(imageTag == undefined){
            var createDiv = document.createElement('div');
            createDiv.className = 'image-design';
            createDiv.id = 'image-design';
            var imageTag = document.createElement('img');
            imageTag.id = 'image-tag';
            imageTag.height = 200;
            imageTag.width = 200;
        }
        imageTag.src = event.target.value; 
        imageTag.hidden = false;                
        createDiv.append(imageTag);
        document.getElementById('item-dropdown').after(createDiv);                
    }else{
        imageTag.hidden = true;
    }
}


let form =document.getElementById('myform'); // get form in variable
// on add data
form.addEventListener('submit', function(event){
    displayDropDown(event,function(itemDrop){// callback 1 
        itemDrop.addEventListener('change', displayImage);
    },function(msg,callback){// callback 2
        let successtag = document.createElement('h1')                
        successtag.innerText = msg;
        document.body.append(successtag);
        callback(3000);
    },() => {// callback 3
        document.forms[0].reset();
    })          
});