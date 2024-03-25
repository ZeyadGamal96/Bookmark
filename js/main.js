var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var webList = [];

if (localStorage.getItem('bookmarks')) {
    webList = JSON.parse(localStorage.getItem('bookmarks'))
    display()
}

function submit() {
    if (validationName() && validationURL() ) {
        var web = {
            name: siteName.value,
            link: siteURL.value,
        };
    
        webList.push(web);
        clear();
        display();
        localStorage.setItem('bookmarks' , JSON.stringify(webList))
        document.querySelector('.alert').classList.add('d-none')
    }else{
        document.querySelector('.alert').classList.remove('d-none')
    }
}

function clear() {
    siteName.value = '';
    siteURL.value = '';
}

function display() {
    var cartona = '';
    for (var i = 0; i < webList.length; i++) {
        cartona += `<tr>
                   <td>${i + 1}</td>
                   <td>${webList[i].name}</td>
                   <td><a href="${'https://' + webList[i].link}" target="_blank" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
                   <td><button type="button" onclick="remove(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                   </tr>`;
    }

    document.getElementById('webTable').innerHTML = cartona;
}

function remove(index) {
    webList.splice(index , 1);
    localStorage.setItem('bookmarks' , JSON.stringify(webList))
    display();
    
}

function validationName() {
    var text = siteName.value
    var regexName = /^[a-zA-Z]{3,}$/
    if (regexName.test(text)) {
        siteName.classList.add('is-valid')
        siteName.classList.remove('is-invalid')
        document.querySelector('.wrong-name').classList.add('d-none')
        document.querySelector('.alert').classList.add('d-none')
        return true;
    }else{
        siteName.classList.add('is-invalid')
        siteName.classList.remove('is-valid')
        document.querySelector('.wrong-name').classList.remove('d-none')
        document.querySelector('.alert').classList.remove('d-none')
        return false;
    }


}

function validationURL() {
    var link = siteURL.value
    var regexURL = /^(www\..+|.+\.com)$/
    if (regexURL.test(link)) {
        siteURL.classList.add('is-valid')
        siteURL.classList.remove('is-invalid')
        document.querySelector('.wrong-url').classList.add('d-none')
        document.querySelector('.alert').classList.add('d-none')
        return true;
    }else{
        siteURL.classList.add('is-invalid')
        siteURL.classList.remove('is-valid')
        document.querySelector('.wrong-url').classList.remove('d-none')
        document.querySelector('.alert').classList.remove('d-none')
        return false;
    }
}
