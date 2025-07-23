//button status
const buttonStatus = document.querySelectorAll('[button-status]');
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status');
            console.log(status);
        
            if(status){
                url.searchParams.set('status', status);
            }else{
                url.searchParams.delete('status');
            }
            window.location.href = url;
        })
    })
}

//FROM search
const formSearch = document.querySelector('#form-search');
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = e.target.elements.search.value;
        if(keyword){
            url.searchParams.set('keyword', keyword);
        }else{
            url.searchParams.delete('keyword');
        }
        window.location.href = url;
    })
}
//END FROM search

//Pagination
const buttonPagination = document.querySelectorAll('[button-pagination]');
if (buttonPagination.length > 0) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('button-pagination');
            url.searchParams.set('page', page);
            window.location.href = url;
        })
    })
}

//End Pagination

//checkbox multi
const checkboxMulti = document.querySelector('[checkbox-multi]');
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector('input[name="checkAll"]')
    const inputsId = checkboxMulti.querySelectorAll('input[name="id"]')
    inputCheckAll.addEventListener('click', () => {
        if(inputCheckAll.checked){
            inputsId.forEach(input => {
                input.checked = true;
            })
        }else{
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })
    inputsId.forEach(input => {
        input.addEventListener('click', () => {
            const countChecked = document.querySelectorAll('input[name="id"]:checked').length;
            if(countChecked === inputsId.length){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        })
    })
}
//end checkbox multi

//Form Change Multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti){
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector('[checkbox-multi]');
        const inputsChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked');
        const type = e.target.elements.type.value;
        if(type == "delete-all"){
            const isConfirm = confirm("Are you sure you want to delete all items?");
            if (!isConfirm) {
                return;
            }
        }
        if(inputsChecked.length > 0){
            let ids = [];
            const inputsId = formChangeMulti.querySelector('input[name="ids"]');
            inputsChecked.forEach(input => {
                if(type == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']")
                    ids.push(input.value+"-"+position.value);
                }else{
                    ids.push(input.value);
                }
            })
            inputsId.value=ids.join(", ");
            formChangeMulti.submit();
        }else{
            alert("Vui lòng chọn sản phẩm")
        }
    })
}
//End Form Change Multi

//Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
    const time = parseInt(showAlert.getAttribute('data-time'))
    const closeAlert = showAlert.querySelector('[close-alert]');
    
    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time);

    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    })
}
//End Show alert

//Upload image
const uploadImage = document.querySelector('[upload-image]');
if(uploadImage){
    const inputFile = uploadImage.querySelector('[upload-image-input]');
    const previewImage = uploadImage.querySelector('[upload-image-preview]');
    
    inputFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (event) => {
                previewImage.src = event.target.result;
            }
            reader.readAsDataURL(file);
        }else{
            previewImage.src = "";
        }
    })
}
//End Upload image