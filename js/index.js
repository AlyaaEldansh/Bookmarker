var siteNameInput = document.getElementById("siteName") ;
var siteUrlInput = document.getElementById("siteUrl") ;
var btnSubmit = document.getElementById("btn-submit");
var btnUpdate = document.getElementById("btn-update");
var siteCorrect = document.getElementById('sitecorrect');
var siteWrong = document.getElementById('sitewrong');
var urlCorrect = document.getElementById('urlcorrect');
var urlWrong = document.getElementById('urlwrong');
var siteContainer ;
var siteIndex =0 ;

if(localStorage.getItem('sites'==null))
{
    siteContainer= [];
}
else
{
    siteContainer = JSON.parse(localStorage.getItem('sites'));
    displaySites(siteContainer);
}


function submitSite()
{
    if((siteNameValidator()&&siteUrlValidator())==true)
    {
        var site =
    {
        id:siteNameInput.value,
        url:siteUrlInput.value
    }
    siteContainer.push(site);
    clearForm();
    displaySites(siteContainer);
    localStorage.setItem('sites',JSON.stringify(siteContainer));
    console.log(siteContainer);
    }
    else
    {
        alert(`Site Name or Url is not valid, Please follow the rules below :
        Site name must contain at least 3 characters
        Site URL must be a valid one`)
    }
}
function clearForm()
{
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

function displaySites()
{
    var cartona=``;
    var x ;
    for(i=0;i<siteContainer.length;i++)
    {
        x=i+1;
        cartona+=`<tr>
            <td class="w-25 py-2">${x}</td>
            <td class="w-25 py-2">${siteContainer[i].id}</td>
            <td onclick="visitSite(${i})" class="w-25 py-2"><button class="px-3 py-2 border-0 rounded-2 button-color "><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td onclick="deleteSite(${i})" class="w-25 py-2"><button class="px-3 py-2 border-0 rounded-2 buttonColor "><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            <td onclick="updateForm(${i})" class="w-25 py-2"><button class="px-3 py-2 border-0 rounded-2 btn-Update "></i>Update</button></td>
            </tr>`
    }

    document.getElementById('tableData').innerHTML = cartona ;
}
function deleteSite(index)
{
    siteContainer.splice(index,1);
    localStorage.setItem('sites',JSON.stringify(siteContainer));
    displaySites(siteContainer);
    console.log(siteContainer);
}

function visitSite(index)
{
    window.open(siteContainer[index].url,"_blank");
}

function updateForm(index)
{
    siteIndex = index;
    siteNameInput.value = siteContainer[index].id;
    siteUrlInput.value = siteContainer[index].url;
    btnSubmit.classList.replace('d-block','d-none');
    btnUpdate.classList.replace('d-none','d-block');
}

function updateSite()
{
    var site =
    {
        id:siteNameInput.value,
        url:siteUrlInput.value
    }
    siteContainer.splice(siteIndex,1,site);
    localStorage.setItem('sites',JSON.stringify(siteContainer));
    displaySites(siteContainer);
    clearForm()
    btnSubmit.classList.replace('d-none','d-block');
    btnUpdate.classList.replace('d-block','d-none');
}

function siteNameValidator()
{
    var regex = /^[a-z][a-z]{2,15}$/;
    return regex.test(siteNameInput.value);
}

function siteUrlValidator()
{
    var regex = /^(https)\:\/\/(www)\.[a-z]{2,15}\.(com)$/;
    return regex.test(siteUrlInput.value);
}
function siteValid(wordKey)
{
    var regex = /^[a-z][a-z]{2,15}$/;
    if(!regex.test(siteNameInput.value))
    {
        siteWrong.classList.replace('d-none','d-block');
        siteCorrect.classList.add('d-none')
    }
    else
    {
        siteCorrect.classList.replace('d-none','d-block');
        siteWrong.classList.add('d-none')
    }
}

function urlValid(urlKey)
{
    var regex = /^(https)\:\/\/(www)\.[a-z]{2,15}\.(com)$/;
    if(!regex.test(siteUrlInput.value))
    {
        urlWrong.classList.replace('d-none','d-block');
        urlCorrect.classList.add('d-none')
    }
    else
    {
        urlCorrect.classList.replace('d-none','d-block');
        urlWrong.classList.add('d-none')
    }
}
