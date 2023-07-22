function searchFunction(event) {
    let key = event.key;
    let searchParam = document.querySelector('input[name="search"]').value;
    if(searchParam == null){
        searchParam = "tru kait";
    }
    console.log('searchParam ', searchParam);
    const options = {
        method: 'GET',
        url: 'https://www.eporner.com/api/v2/video/search/',
        params: {
            query: searchParam,
            per_page: '10',
            format: 'json',
        },
    };
    
    try {
        const callApi = async function(){
            const response = await axios.request(options);
            // console.log(response.data);
    
            let divContent = document.querySelector('#divContent .row');
            let body = document.querySelector('body');
    
            let videosDetails = response.data.videos;
            console.log('data ',videosDetails);
            for (let i = 0; i < videosDetails.length; i++) {
                const videosTitle               = videosDetails[i].title;
                const videosEmbed               = videosDetails[i].embed;
                const videosKeywords            = videosDetails[i].keywords;
                const videosLengthMinutes       = videosDetails[i].length_min;
                const videosDefaultThumb        = videosDetails[i].default_thumb.src;
                const videosViews        = videosDetails[i].views;
    
                let html = "";
                html +=`<div class="col-lg-4 col-md-6 col-sm-12 mb-3">`;
                    html +=`<div class="card mx-1" style="max-height: 450px;">`;
                        // html +=`<img src="${videosDefaultThumb}" height="240" class="img-fluid rounded-start" alt="...">`;
                        html += `<iframe height="240" frameborder="0" scrolling="no" allowfullscreen loading="eager" src="${videosEmbed}"></iframe>`;
                    html +=`<div class="card-body">`;
                        html +=`<h5 class="card-title text-truncate fw-bold">${videosTitle}</h5>`;
                        html +=`<p class="card-text text-truncate">${videosKeywords}</p>`;
                    html +=`</div>`;
                        html +=`<div class="card-footer bg-dark">`;
                            html +=`<div class="d-flex justify-content-between">`;
                                html +=`<p class="card-text"><small class="text-secondary">Video Length: <span class="text-danger">${videosLengthMinutes}</span></small></p>`;
                                html +=`<p class="card-text"><small class="text-secondary">Views: <span class="text-warning">${videosViews}</span></small></p>`;
                            html +=`</div>`;
                        html +=`</div>`;
                    html +=`</div>`;
                html +=`</div>`;
                divContent.insertAdjacentHTML('afterbegin',html);
            }
        }
        callApi();
        document.querySelector('#divContent').classList.remove('d-none');
        document.querySelector('#search').classList.add('d-none');
    } catch (error) {
        console.error(error);
    }
    
    let frame = document.querySelector("iframe");
    header = frame.contentDocument.querySelector("header");
    header.remove();
    footer = frame.contentDocument.querySelector("footer");
    footer.remove();
}