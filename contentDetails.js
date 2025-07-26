console.clear()

let id = location.search.split('?')[1]
console.log(id)

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let productDetailsDiv = document.createElement('div')
    productDetailsDiv.id = 'productDetails'

    // console.log(productDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('Rs ' + ob.price)
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let productPreviewDiv = document.createElement('div')
    productPreviewDiv.id = 'productPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    productPreviewDiv.appendChild(h3ProductPreviewDiv)

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        productPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
buttonDiv.id = 'button'
buttonDiv.style.display = 'flex'
buttonDiv.style.gap = '15px'

// ----- ADD TO CART BUTTON -----
let addToCartBtn = document.createElement('button')
addToCartBtn.textContent = 'Add to Cart'
addToCartBtn.onclick = function () {
    let order = id + " "
    let counter = 1
    if (document.cookie.indexOf(',counter=') >= 0) {
        order = id + " " + document.cookie.split(',')[0].split('=')[1]
        counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1
    }
    document.cookie = "orderId=" + order + ",counter=" + counter
    document.getElementById("badge").innerHTML = counter
    console.log(document.cookie)
}
buttonDiv.appendChild(addToCartBtn)

// ----- BUY NOW BUTTON -----
let buyNowBtn = document.createElement('a')
buyNowBtn.textContent = 'Buy Now'
buyNowBtn.href = `https://wa.me/923350303770?text=Hi%2C%20I%20want%20to%20buy%20${encodeURIComponent(ob.name)}%20for%20Rs%20${ob.price}%20-%20${window.location.href}`
buyNowBtn.target = '_blank'
buyNowBtn.style.textDecoration = 'none'
buyNowBtn.style.background = '#25D366'
buyNowBtn.style.color = 'white'
buyNowBtn.style.padding = '10px 20px'
buyNowBtn.style.borderRadius = '5px'
buyNowBtn.style.display = 'flex'
buyNowBtn.style.alignItems = 'center'
buyNowBtn.style.justifyContent = 'center'
buyNowBtn.style.fontWeight = 'bold'
buyNowBtn.style.fontFamily = 'inherit'

buttonDiv.appendChild(buyNowBtn)



    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(productDetailsDiv)
    productDetailsDiv.appendChild(h1)
    productDetailsDiv.appendChild(h4)
    productDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    productDetailsDiv.appendChild(productPreviewDiv)
    
    
    productDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}



// BACKEND CALLING

let httpRequest = new XMLHttpRequest()
{
    httpRequest.onreadystatechange = function()
    {
        if(this.readyState === 4 && this.status == 200)
        {
            console.log('connected!!');
            let contentDetails = JSON.parse(this.responseText)
            {
                console.log(contentDetails);
                dynamicContentDetails(contentDetails)
            }
        }
        else
        {
            console.log('not connected!');
        }
    }
}

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+id, true)
httpRequest.send()  
