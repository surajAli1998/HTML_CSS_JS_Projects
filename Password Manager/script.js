//this is the logic to update the html body of table with datas
updateTable();
function updateTable() {
    let tBody = document.querySelector("tbody");
    let data = localStorage.getItem("passwords");
    if (data == null) {
        tBody.innerHTML = "No data to show";
    }
    else {
        let str = "";
        let arr = JSON.parse(data);
        // for(let i=0; i<arr.length; i++){
        //     const item = arr[i];
        //     str += `<tr>
        //     <td>${item.website}</td>
        //     <td>${item.userid}</td>
        //     <td>${item.password}</td>
        //     <td>${"delete"}</td>
        //     </tr>`
        // }

        //logic to render the table body with datas and also in each row rendering a delete button to delete that particular row data
        function iterate(item, index) {
            str += `<tr>
            <td>${item.website}</td>
            <td>${item.userid}</td>
            <td>${hidePassword(item.password)}</td>
            <td><button class="submit-button" id=${item.website} onclick="deleteItem(${index})">Delete</button></td>
            </tr>`
        }
        arr.forEach(iterate);
        tBody.innerHTML = str;
    }
}

//logic to delete a particular entry upon clikcing on the delete button
function deleteItem(index){
    let confirmation = confirm("Are you sure to delete??");
    if(confirmation){
        document.getElementById("deleted").style.display = "inline";
        setTimeout(()=>{document.getElementById("deleted").style.display = "none";},1000);
        let arr = JSON.parse(localStorage.getItem("passwords"));
        arr.splice(index,1);
        localStorage.setItem("passwords", JSON.stringify(arr));
        updateTable();
    }
}

//logic to mask the password so that it will not be visible to anyone
function hidePassword(pass){
    let str1 = "";
    for(let i=0; i<pass.length; i++){
        str1 += "*";
    }
    return str1;
}

document.getElementById("submitButton").addEventListener("click", (e) => {

    //this will not refresh the page if we click on submit button
    e.preventDefault();
    console.log("submitted");
    console.log(website.value, userid.value, password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);

    //firsttime when user gives data, that time data in localstorage is empty thats why we will fetch the data make it a json and store in local storage
    if (passwords == null) {
        let arr = [];
        arr.push({ website: website.value, userid: userid.value, password: password.value });
        localStorage.setItem("passwords", JSON.stringify(arr));
        updateTable();
    }

    //next time when user gives data then we will update the existing json data and push it back into the localstorage
    else {
        let arr = JSON.parse(localStorage.getItem("passwords"));
        arr.push({ website: website.value, userid: userid.value, password: password.value });
        localStorage.setItem("passwords", JSON.stringify(arr));
        updateTable();
    }
});