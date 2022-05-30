const btnSbm = document.querySelector('.submit');
const imgPlace = document.querySelector('.image');
const buttonForvard = document.querySelector('.btn_forvard');
const buttonBack = document.querySelector('.btn_back');

let i;

btnSbm.addEventListener('click', () => {
  i = 0;
  const inpNum = document.querySelector('.img_inp').value;
  fetch (`https://picsum.photos/v2/list?page=1&limit=${inpNum}`)
    .then((response) => {
    const result = response.json();
    return result;
    })
    .then((data) => {
    let images = [];
    let imgNum = 0;
    data.forEach(item => {
    const imageUrl = `${item.download_url}`;
    images[imgNum] = imageUrl;
    imgNum++;
    });
    const imagesJSON = JSON.stringify(images);
    sessionStorage.setItem('imgs', imagesJSON);
    const imageBlockFirst =  `
    <div class="images">
      <img
        src ="${data[0].download_url}"
        class ="image_direct_first"
        />
      </div>
      `;
    imgPlace.innerHTML = imageBlockFirst;
    })
    .catch(() => {console.log('error') });
  })

buttonForvard.addEventListener('click', () =>{
  const loaded = sessionStorage.getItem('imgs');
    if (loaded) {
      const imagesParsed = JSON.parse(loaded)
      i++;
      if (i >= imagesParsed.length){
        i = 0;
      };  
      const imageBlock =  `
        <div class="images">
          <img
            src ="${imagesParsed[i]}"
            class ="image_direct_forvard"
            />
        </div>
      `;
      imgPlace.innerHTML = imageBlock;
    } else {
      console.log('problem')
    };
})

buttonBack.addEventListener('click', () =>{
  const loaded = sessionStorage.getItem('imgs');
  if (loaded){
    const imagesParsed = JSON.parse(loaded)
    i--;
    if (i < 0){
      i = imagesParsed.length - 1
    }
    const imageBlock =  `
      <div class="images">
        <img
          src ="${imagesParsed[i]}"
          class ="image_direct_back"
          />
      </div>
      `;
    imgPlace.innerHTML = imageBlock;
  } else {
    console.log('problem')
  };
});

