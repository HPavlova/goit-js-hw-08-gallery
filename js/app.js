const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  closeModal: document.querySelector('[data-action="close-lightbox"]'),
  backdrop: document.querySelector('.lightbox__overlay'),
};

// ===== Create Markup ===== //
const galleryMarkup = createGalleryItems(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return ` <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`;
    })
    .join('');
}

// console.log(createGalleryItems(galleryItems));

// =====Delegate===== //

refs.gallery.addEventListener('click', onOpenModal);

// =====Open Modal===== //

function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  window.addEventListener('keydown', onImageChange);
  window.addEventListener('keydown', onEscKeyPress);

  refs.modal.classList.add('is-open');
  refs.modalImage.src = event.target.dataset.source;
  refs.modalImage.alt = event.target.alt;
}

// =====Close Modal===== //

refs.closeModal.addEventListener('click', onCloseModal);
function onCloseModal() {
  window.removeEventListener('keydown', onImageChange);
  window.removeEventListener('keydown', onEscKeyPress);

  refs.modal.classList.remove('is-open');
  refs.modalImage.src = '';
  refs.modalImage.alt = '';
}

// =====Close Modal - Overlay===== //

refs.backdrop.addEventListener('click', onBackdropClick);
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    console.log('Клик на Backdrop!');
    onCloseModal();
  }
}

// =====Close Modal - ESC=====

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

// =====Scroll=====

function onImageChange(event) {
  // if (event.code !== 'ArrowRight' || event.code !== 'ArrowLeft') {
  //   return;
  // }

  const right = 'ArrowRight';
  const left = 'ArrowLeft';

  const images = galleryItems.map(({ original }) => original);
  let currentImgIndex = images.indexOf(refs.modalImage.src);

  switch (event.code) {
    case left:
      currentImgIndex -= 1;
      break;
    case right:
      currentImgIndex += 1;
      break;
  }

  if (currentImgIndex > galleryItems.length - 1) {
    currentImgIndex = 0;
  }

  if (currentImgIndex < 0) {
    currentImgIndex = galleryItems.length - 1;
  }

  refs.modalImage.src = galleryItems[currentImgIndex].original;
}
