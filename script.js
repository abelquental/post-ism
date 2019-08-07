// vh hack
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// STRINGS
// Window Width
const ww =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;
// General DOM Strings
const ensaio_wrapper = document.getElementById('ensaio');
const list_wrapper = document.getElementById('list-wrapper');
const project_wrapper = document.getElementById('project-wrapper');
const proj_btn = document.getElementById('proj-btn');
const expo_btn = document.getElementById('expo-btn');
const sobre_btn = document.getElementById('sobre-btn');
const pt_btn = document.getElementById('pt');
const eng_btn = document.getElementById('eng');
const sobre_wrapper = document.getElementById('sobre-wrapper');
const expo_wrapper = document.getElementById('expo-wrapper');
const expo_gallery = document.getElementById('expo-gallery');
// Project Wrapper Strings
const land_title = document.getElementById('land-title');
const project_title = document.getElementById('project-title');
const project_subtitle = document.getElementById('project-subtitle');
const project_author = document.getElementById('project-author');
const project_keywords = document.getElementById('project-keywords');
const cover_img = document.getElementById('cover-img');
const cover_text = document.getElementById('cover-text');
const project_gallery = document.getElementById('project-gallery');
const back = document.getElementById('x');
const cover_right = document.getElementById('cover-right');
const project_content = document.getElementById('project-content');

// Event Listeners
let mOver = false;
list_wrapper.addEventListener('mouseover', () => (mOver = true));
list_wrapper.addEventListener('mouseleave', () => (mOver = false));
back.addEventListener('click', closeProj);
document.onkeydown = closeProj;
proj_btn.addEventListener('click', openList);
expo_btn.addEventListener('click', openExpo);
sobre_btn.addEventListener('click', openSobre);
eng_btn.addEventListener('click', changeLang);
pt_btn.addEventListener('click', changeLang);

// Handle language
let lang = 'pt';

// Get data - Main Controller
getData();
async function getData() {
  const response = await fetch('data/data.json');
  const data = await response.json();
  showList(data);
  showList(data);
  showList(data);
  showList(data);
  ensaio(data);
  list_wrapper.addEventListener('scroll', function() {
    if (
      list_wrapper.scrollTop + list_wrapper.clientHeight >=
      list_wrapper.scrollHeight
    ) {
      loadMore(data);
    }
  });
  list_wrapper.addEventListener('click', () => showProject(data));
}

// Show initial list
function showList(data) {
  data.forEach((item, i) => {
    list_wrapper.insertAdjacentHTML(
      'beforeend',
      `<div class="list-item move-${i + 1}">
            <div class="post">POST-</div>
            <div class="listed-project" id="proj-${i}">${item.landTitulo}</div>
            <div class="ism">ISM</div>
        </div>`
    );
  });
  setInterval(() => {
    if (!mOver) {
      ww > 600 ? (list_wrapper.scrollTop += 0) : (list_wrapper.scrollTop += 0);
    }
  }, 30);
}

// Infinite scroll
let counter = 0;
let mCounter = 1;

function loadMore(data) {
  counter < 14 ? counter++ : (counter = 0);
  mCounter < 14 ? mCounter++ : (mCounter = 0);
  list_wrapper.insertAdjacentHTML(
    'beforeend',
    `<div class="list-item move-${mCounter}">
            <div class="post">POST-</div>
            <div class="listed-project" id="proj-${counter}">${
      data[counter].landTitulo
    }</div>
            <div class="ism">ISM</div>
        </div>`
  );
  const fc = list_wrapper.firstChild;
  list_wrapper.removeChild(fc);
}

// PROJECT
// Show
function showProject(data) {
  const split_id = event.target.id.split('-');
  const item = data[Number(split_id[1])];
  project_content.scrollTop = 0;
  cover_right.scrollTop = 0;

  // Inner content lang-variable
  if (lang === 'pt') {
    project_subtitle.innerText = item.subTitulo;
    cover_text.insertAdjacentHTML('afterbegin', item.Texto);
    // Keywords
    let dividedKeys = item.keyWords.split(',');
    let structuredKeys = ' ';
    dividedKeys.forEach(item => (structuredKeys += `${item}<br>`));
    project_keywords.insertAdjacentHTML('beforeend', structuredKeys);
  } else {
    project_subtitle.innerText = item.subTituloEng;
    cover_text.insertAdjacentHTML('afterbegin', item.TextoEng);
    // Keywords
    let dividedKeys = item.keyWordsEng.split(',');
    let structuredKeys = ' ';
    dividedKeys.forEach(el => (structuredKeys += `${el}<br>`));
    project_keywords.insertAdjacentHTML('beforeend', structuredKeys);
  }

  // Inner content none-lang-variable

  land_title.insertAdjacentHTML(
    'beforeend',
    `<div class="post">POST-</div>
        <div class="listed-project">${item.landTitulo}</div>
        <div class="ism">ISM</div>`
  );
  project_title.innerText = item.Titulo;
  project_author.innerHTML = item.Alunos;
  cover_img.insertAdjacentHTML('afterbegin', `<img src="${item.textureImg}">`);

  // gallery
  let gal = ' ';
  let bruteGale = item.gal.split(',');
  bruteGale.forEach(el => (gal += `<img src="${el}">`));
  project_gallery.insertAdjacentHTML('afterbegin', gal);

  //web
  if (item.web) {
    cover_text.insertAdjacentHTML(
      'afterbegin',
      `<p><a class="web-anchor" href="${
        item.web
      }"> visitar website </a></p> <br><br></br>`
    );
  }

  // attach open class to container
  project_wrapper.classList.add('wrapper-open');
}
// Close
function closeProj() {
  project_wrapper.classList.remove('wrapper-open');
  // Reset project-wrapper content
  project_title.innerHTML = ' ';
  project_subtitle.innerHTML = ' ';
  project_keywords.innerHTML = ' ';
  cover_text.innerHTML = ' ';
  project_gallery.innerHTML = ' ';
  project_author.innerHTML = ' ';
  land_title.innerHTML = ' ';
  cover_img.innerHTML = ' ';
}

function openList() {
  // btns
  expo_btn.classList.remove('sec-open');
  proj_btn.classList.add('sec-open');
  sobre_btn.classList.remove('sec-open');
  //UI
  list_wrapper.classList.remove('list-closed');
  sobre_wrapper.classList.remove('wrapper-open');
  expo_wrapper.classList.remove('wrapper-open');
}
function openExpo() {
  // btns
  expo_btn.classList.add('sec-open');
  proj_btn.classList.remove('sec-open');
  sobre_btn.classList.remove('sec-open');
  //UI
  list_wrapper.classList.add('list-closed');
  sobre_wrapper.classList.remove('wrapper-open');
  expo_wrapper.classList.add('wrapper-open');

  for (let i = 1; i <= 16; i++) {
    expo_gallery.insertAdjacentHTML(
      'beforeend',
      `<img src="img/expo${i}.jpg">`
    );
  }
}
function openSobre() {
  // btns
  expo_btn.classList.remove('sec-open');
  proj_btn.classList.remove('sec-open');
  sobre_btn.classList.add('sec-open');
  // UI
  list_wrapper.classList.add('list-closed');
  sobre_wrapper.classList.add('wrapper-open');
  expo_wrapper.classList.remove('wrapper-open');

  sobre_wrapper.innerHTML = ' ';
  let contentPt = `<div id="sobre-content">                
      <h2><span class="post">POST-</span><span class="ism">ISM</span></h2><br>
      <h3>
          <span class="c4">Exposição / Projetos</span><br>
          Mestrado em Design de Comunicação<br>
          Belas-Artes, ULisboa, 2018/19 <br><br>
          
          <span class="c4">Inauguração</span><br>
          27 de Junho das 18:00h às 21:00h
      </h3><br><br>


      <div id="sobre-txt">
          <p class="c2"><span class="c4">Post &ndash; ism</span><span class="c0">&nbsp;apresenta projetos desenvolvidos na disciplina de Projeto II do Mestrado em Design de Comunica&ccedil;&atilde;o (Belas-Artes, ULisboa) que abordam as formas de comunica&ccedil;&atilde;o, produ&ccedil;&atilde;o e dissemina&ccedil;&atilde;o de conhecimento atuais, evidenciando os </span><span class="c0 c1">ismos</span><span class="c0 c5">&nbsp;que emergem (a)p&oacute;s o impacto massivo dos sistemas digitais e da internet na cultura contempor&acirc;nea.</span></p><br><p class="c2 c3"><span class="c5 c0"></span></p><p class="c2"><span class="c0">Os projetos refletem o momento atual caracterizado pelo questionamento das ideologias e premissas que regem o conhecimento estabelecido, abordando os modos de a&ccedil;&atilde;o e comunica&ccedil;&atilde;o que o desestabilizam na era p&oacute;s-internet. Interrogam os pressupostos inerentes &agrave; inclus&atilde;o e exclus&atilde;o social, sob os </span><span class="c0 c1">ismos</span><span class="c0">&nbsp;do g&eacute;nero e da ra&ccedil;a, que condicionam a diversidade e representatividade cultural na academia e nos dom&iacute;nios da tecnologia e do design. Evidenciam a volatilidade do conhecimento sob o impacto da internet e consequentes paradigmas de incerteza, p&oacute;s-verdade, desinforma&ccedil;&atilde;o e manipula&ccedil;&atilde;o. Comentam ainda a soberania dos metadados e da ag&ecirc;ncia algor&iacute;tmica e o seu impacto na socializa&ccedil;&atilde;o, ao mesmo tempo que tiram partido da conflu&ecirc;ncia entre </span><span class="c0 c1">media</span><span class="c5 c0">&nbsp;para refletir sobre a forma como estas tecnologias moldam a nossa percep&ccedil;&atilde;o e experi&ecirc;ncia da realidade.</span></p><br>

          <p>
                  <span class="c4">Exposição</span><br>
                  28 de Junho – 07 de Julho 2019<br>
                  10:00h – 21:00h<br><br>

                  Fabrica Features Lisboa<br>
                  Rua Garrett, 83, 4.º Piso<br><br>


                  <span class="c4">Organização</span><br>
                  Mestrado em Design de Comunicação<br>
                  Belas-Artes, ULisboa <br>
                  Com o apoio de Fabrica Features Lisboa<br>
          </p>
          <br>
          
          <p>
              <span class="c4">Coordenação</span><br>
              (Projecto I e II): Luísa Ribas, Sofia Gonçalves<br>
              (Laboratório II): Pedro Ângelo<br><br>

              <span class="c4">Website</span><br>
              Abel Quental + Aldo Medina<br><br>

              <span class="c4">Design de Comunicação</span><br>
              Abel Quental<br>
              Aldo Medina<br>
              Caio Guedes<br><br>

              <span class="c4">Layout da exposição</span><br>
              Katherine Lahude<br>
              Raul Rey Lopez<br><br>

              <span class="c4">Edição e revisão de conteúdos</span><br>
              Ana Henriques<br>
              Teresa Morais<br><br>
              
              <span class="c4">Produção</span><br>
              Ana Batista<br>
              Fabio de Almeida<br>
              Maria Vidal<br><br>
              
              <span class="c4">Montagem</span><br>
              Ariana Parrilha<br>
              Maria Fraga<br>
              Tânia Becerra<br>
              Valentina Gayoso<br><br>
              
              <span class="c4">Documentação</span><br>
              Ana Serra<br>
              Mariana Ribeiro<br>
              Nádia Ferrer<br>
              Rita Barroso<br><br>
              
              <span class="c4">Agradecimentos</span><br>
              Pedro Almeida<br>
              Suzana Parreira<br>
              Sr. Amadeu<br>
              Tomás Gouveia<br>
              Isabel Nunes<br>
              —
          </p>  
      </div>                
    </div>`;
  let contentEng = `<div id="sobre-content">                
      <h2><span class="post">POST-</span><span class="ism">ISM</span></h2><br>          
          <h3>
              <span class="c4">Exhibition / Projects</span><br>
              Master in Communication Design <br>
              Belas-Artes, ULisboa, 2018/19<br><br>
          
              <span class="c4">Opening</span><br>
              27 June from 18:00h to 21:00h

          </h3><br><br>

          <p class="c2 c3"><span class="c5 c0"></span></p><p class="c2 c3"><span class="c5 c0"></span></p><p class="c2"><span class="c4">Post &ndash; ism </span><span class="c0">presents projects developed in Project II of the Master&#39;s Degree in Communication Design (Fine Arts, ULisboa) that address current forms of communication, production and dissemination of knowledge, highlighting the </span><span class="c0 c1">isms</span><span class="c5 c0">&nbsp;that emerge (post)after the massive impact of digital systems and the internet in contemporary culture.</span></p><br><p class="c2 c3"><span class="c5 c0"></span></p><p class="c2 c8" id="h.gjdgxs"><span class="c0">The projects reflect the present moment characterized by the questioning of the ideologies and premises that govern established knowledge, while addressing the modes of action and communication that destabilize it in the post-internet era. They interrogate the assumptions inherent to social inclusion and exclusion, under the </span><span class="c0 c1">isms</span><span class="c0">&nbsp;of gender and race, which condition cultural diversity and representativeness in academia and in the fields of technology and design. They highlight the volatility of knowledge under the impact of the Internet and the consequent paradigms of uncertainty, post-truth, misinformation and manipulation. They also comment on the sovereignty of metadata and algorithmic agency and its impact on socialization, while taking advantage of the confluence between media to reflect on how these technologies shape our perception and experience of reality.</span></p><br><br>
          <p>
                  <span class="c4">Exhibition</span><br>
                  28 June – 7 July 2019<br>
                  10:00h – 21:00h<br><br>

                  Fabrica Features Lisboa<br>
                  Rua Garrett, 83, 4th Floor<br><br>


                  <span class="c4">Organization</span><br>
                  Master in Communication Design<br>
                  Belas-Artes, ULisboa <br>
                  Supported by Fabrica Features Lisboa<br>
          </p><br><br>----<br><br>
          <p>
              <span class="c4">Coordination</span><br>
              (Project I e II): Luísa Ribas, Sofia Gonçalves<br>
              (Laboratory II): Pedro Ângelo<br><br>

              <span class="c4">Website</span><br>
              Abel Quental + Aldo Medina<br><br>

              <span class="c4">Communication Design </span><br>
              Abel Quental<br>
              Aldo Medina<br>
              Caio Guedes<br><br>

              <span class="c4">Exhibition layout</span><br>
              Katherine Lahude<br>
              Raul Rey Lopez<br><br>

              <span class="c4">Editing and proofreading</span><br>
              Ana Henriques<br>
              Teresa Morais<br><br>
              
              <span class="c4">Production</span><br>
              Ana Batista<br>
              Fabio de Almeida<br>
              Maria Vidal<br><br>
              
              <span class="c4">Exhibition setup</span><br>
              Ariana Parrilha<br>
              Maria Fraga<br>
              Tânia Becerra<br>
              Valentina Gayoso<br><br>
              
              <span class="c4">Documentation</span><br>
              Ana Serra<br>
              Mariana Ribeiro<br>
              Nádia Ferrer<br>
              Rita Barroso<br><br>

              <span class="c4">Special Thanks</span><br>
              Pedro Almeida<br>
              Suzana Parreira<br>
              Sr. Amadeu<br>
              Tomás Gouveia<br>
              Isabel Nunes<br>

              
              —
          </p>

          
      </div>                
    </div>`;

  if (lang === 'pt') {
    sobre_wrapper.innerHTML = contentPt;
  } else {
    sobre_wrapper.innerHTML = contentEng;
  }
}

// LANG
function changeLang() {
  if (event.target.id == 'eng') {
    lang = 'eng';
    pt_btn.classList.remove('sec-open');
    eng_btn.classList.add('sec-open');
  } else {
    lang = 'pt';
    pt_btn.classList.add('sec-open');
    eng_btn.classList.remove('sec-open');
  }

  changeBtns();
  if (sobre_wrapper.classList.value == 'wrapper-open') {
    openSobre();
  }
}

function changeBtns() {
  if (lang === 'pt') {
    proj_btn.innerHTML = 'PROJETOS';
    sobre_btn.innerHTML = 'SOBRE';
    expo_btn.innerHTML = 'EXPOSIÇÃO';
  } else {
    proj_btn.innerHTML = 'PROJECTS';
    sobre_btn.innerHTML = 'ABOUT';
    expo_btn.innerHTML = 'EXPOSITION';
  }
}
