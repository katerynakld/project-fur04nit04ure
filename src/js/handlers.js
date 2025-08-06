
export function markup(data) { 
    console.log(data);
    
}

export function createGallery(data) { 
  return data.map(({ _id, name }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-img" src="${webformatURL}" alt="${tags}" 
/>
      </a>
      <div class="item-description-wrap">
        <div class="description-item" style="">
          <h3 class="item-title">Likes</h3>
          <p class="item-text">${likes}</p>
        </div>
        <div class="description-item">
          <h3 class="item-title">Views</h3>
          <p class="item-text">${views}</p>
        </div>
        <div class="description-item">
          <h3 class="item-title">Comments</h3>
          <p class="item-text">${comments}</p>
        </div>
        <div class="description-item">
          <h3 class="item-title">Downloads</h3>
          <p class="item-text">${downloads}</p>
        </div>
      </div>
    </li>
  `).join("");
}
