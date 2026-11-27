const hero = document.getElementById('hero');
const pixelEffects = document.querySelectorAll('.effect--pixel');
const BLOCKS_PER_SIDE = 11;

function readVar(element, name) {
  return parseFloat(element.style.getPropertyValue(name));
}

function drawPixelEffects() {
  if (!hero.naturalWidth) return;

  const lowRes = document.createElement('canvas');
  lowRes.width = lowRes.height = BLOCKS_PER_SIDE;
  const lowResCtx = lowRes.getContext('2d');

  pixelEffects.forEach((effect) => {
    const canvas = effect.querySelector('.effect__canvas');
    const size = effect.clientWidth;
    if (!size) return;

    canvas.width = canvas.height = size;

    const sourceX = (readVar(effect, '--x') / 100) * hero.naturalWidth;
    const sourceY = (readVar(effect, '--y') / 100) * hero.naturalHeight;
    const sourceSize = (readVar(effect, '--size') / 100) * hero.naturalWidth;

    lowResCtx.clearRect(0, 0, BLOCKS_PER_SIDE, BLOCKS_PER_SIDE);
    lowResCtx.drawImage(hero, sourceX, sourceY, sourceSize, sourceSize, 0, 0, BLOCKS_PER_SIDE, BLOCKS_PER_SIDE);

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(lowRes, 0, 0, BLOCKS_PER_SIDE, BLOCKS_PER_SIDE, 0, 0, size, size);
  });
}

hero.addEventListener('error', () => {
  pixelEffects.forEach((effect) => effect.classList.add('effect--hidden'));
});

if (hero.complete) {
  drawPixelEffects();
} else {
  hero.addEventListener('load', drawPixelEffects);
}

window.addEventListener('resize', drawPixelEffects);
