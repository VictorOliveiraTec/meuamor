const moments = [
  { eyebrow: 'O começo de tudo', date: 'Um dia que ficou para sempre', title: 'Quando nossas histórias se encontraram', text: 'Eu lembro ainda, daquele dia, achei que você não ia chegar, mas você chegou e mudou tudo. Começou a falar, ainda bem kkk, tava bem nervoso do seu lado, você é 10!', note: 'Troque este texto pela memória que só vocês dois conhecem.', location: 'Nosso primeiro capítulo', image: 'assets/primeira-foto.webp', accent: 'rose' },
  { eyebrow: 'Primeiras descobertas', date: 'Os dias foram ganhando cor', title: 'Cada conversa virou vontade de ficar', text: 'As pequenas mensagens, as risadas sem motivo e a vontade de contar tudo um para o outro foram construindo, devagarinho, o nosso lugar seguro.', note: 'Pode ser uma foto de uma conversa, passeio ou momento simples.', location: 'Onde a saudade começou', image: '', accent: 'peach' },
  { eyebrow: 'Nosso jeito', date: 'A vida ficou mais bonita a dois', title: 'Os detalhes que viraram memórias', text: 'Não foram só os grandes momentos. Foram também os abraços demorados, as brincadeiras internas e todas as vezes em que estar junto bastou.', note: 'Uma foto espontânea combina muito com este momento.', location: 'Nosso cantinho favorito', image: '', accent: 'lilac' },
  { eyebrow: 'Até aqui', date: 'E ainda parece só o começo', title: 'Tudo o que vivemos trouxe a gente até aqui', text: 'Olhar para trás é perceber que cada passo valeu a pena. Obrigado por dividir seus dias comigo e por fazer do amor uma coisa tão leve e bonita.', note: 'Use aqui uma foto que represente vocês hoje.', location: 'A nossa história continua', image: '', accent: 'gold' }
];

const $ = (id) => document.getElementById(id);
let active = 0;

function renderPhoto(moment, index) {
  const photo = $('moment-photo');
  photo.className = `photo-placeholder ${moment.accent}`;
  if (moment.image) {
    photo.innerHTML = `<img class="memory-photo" src="${moment.image}" alt="Foto do casal — ${moment.title}"><span class="photo-stamp">memória querida</span>`;
  } else {
    photo.innerHTML = `<div class="photo-orbit orbit-one"></div><div class="photo-orbit orbit-two"></div><div class="photo-content"><span class="photo-number">0${index + 1}</span><span style="font-size:31px">＋</span><span class="photo-label">Sua foto aqui</span><span class="photo-hint">Substitua no arquivo de conteúdo</span></div><span class="photo-stamp">memória querida</span>`;
  }
}

function renderDots() {
  $('timeline-dots').innerHTML = moments.map((moment, index) => `<button class="timeline-dot ${index === active ? 'active' : ''}" data-index="${index}" aria-label="Ir para ${moment.eyebrow}"><span class="dot-point"></span><span class="dot-label">${moment.eyebrow}</span></button>`).join('');
  document.querySelectorAll('.timeline-dot').forEach((dot) => dot.addEventListener('click', () => goTo(Number(dot.dataset.index))));
}

function render() {
  const moment = moments[active];
  $('moment-date').textContent = moment.date;
  $('moment-number').textContent = String(active + 1).padStart(2, '0');
  $('moment-eyebrow').textContent = moment.eyebrow;
  $('moment-title').textContent = moment.title;
  $('moment-text').textContent = moment.text;
  $('moment-note').textContent = moment.note;
  $('moment-location').textContent = moment.location;
  $('moment-count').innerHTML = `${String(active + 1).padStart(2, '0')} <i>/</i> ${String(moments.length).padStart(2, '0')}`;
  $('timeline-progress').style.width = `${((active + 1) / moments.length) * 100}%`;
  $('previous').disabled = active === 0;
  $('next').disabled = active === moments.length - 1;
  renderPhoto(moment, active);
  renderDots();
}

function goTo(index) {
  active = Math.max(0, Math.min(index, moments.length - 1));
  render();
  $('momentos').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

$('previous').addEventListener('click', () => goTo(active - 1));
$('next').addEventListener('click', () => goTo(active + 1));
$('back-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', () => $('back-top').classList.toggle('visible', window.scrollY > 600));
render();
