const defaults = [
  { from:'Sarria', to:'Portomarín', km:'22 km', title:'Empieza por lo que tienes', reflection:'No hace falta tener todo resuelto para dar el primer paso. La ruta comienza aquí, con lo que eres hoy: tus ganas, tus dudas y tu mochila. Caminar también es aprender a confiar en el paso siguiente.', question:'¿Qué puedes dejar atrás para caminar con más ligereza?' },
  { from:'Portomarín', to:'Palas de Rei', km:'25 km', title:'La fuerza de lo pequeño', reflection:'El camino se hace de pasos repetidos, de agua compartida y de saludos sencillos. A veces lo que sostiene una jornada no es un gran descubrimiento, sino la bondad pequeña que aparece justo a tiempo.', question:'¿Qué gesto sencillo de otra persona agradeces hoy?' },
  { from:'Palas de Rei', to:'Arzúa', km:'29 km', title:'Caminar acompañado', reflection:'Cada peregrino carga su propia historia, pero nadie recorre la senda del todo solo. Jesús se acercaba a quienes encontraba en el camino y caminaba a su lado antes de explicar nada. La compañía también puede ser una forma de esperanza.', question:'¿A quién podrías escuchar con más atención?' },
  { from:'Arzúa', to:'O Pedrouzo', km:'19 km', title:'Hacer sitio al silencio', reflection:'Cuando el paisaje se aquieta, a veces también se ordena lo que llevamos dentro. No necesitas llenar cada tramo con palabras. Deja que el silencio te alcance y nombra, sin prisa, aquello que te importa.', question:'¿Qué voz interior llevas tiempo sin escuchar?' },
  { from:'O Pedrouzo', to:'Santiago', km:'20 km', title:'Llegar y seguir en camino', reflection:'La catedral marca un final, pero el peregrino que llega ya no es exactamente quien salió. Agradece lo recibido, también lo difícil. La meta no cierra el camino: te devuelve a la vida con una mirada nueva.', question:'¿Qué te gustaría llevar contigo al volver a casa?' }
];
const savedStages = JSON.parse(localStorage.getItem('buenCaminoStages') || '{}');
const stages = defaults.map((stage,index)=>({...stage,...(savedStages[index]||{})}));
const list = document.querySelector('#stage-list');
const reflectionPanel = document.querySelector('#reflection');
let selectedStage=0;
function showStage(index){
  selectedStage=index;
  document.querySelectorAll('.stage-button').forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',i===index?'true':'false')});
  const s=stages[index];
  reflectionPanel.innerHTML=`<p class="reflection-label">ETAPA ${String(index+1).padStart(2,'0')} · ${s.km.toUpperCase()}</p><label class="stage-edit-label">Título<input id="stage-title" value=""></label><label class="stage-edit-label">Reflexión<textarea id="stage-reflection" rows="5"></textarea></label><label class="stage-edit-label">Pregunta para el camino<input id="stage-question"></label><button class="button button-dark stage-save" id="stage-save">Guardar reflexión <span>✓</span></button><span class="save-status" id="stage-save-status" aria-live="polite"></span>`;
  reflectionPanel.querySelector('#stage-title').value=s.title;
  reflectionPanel.querySelector('#stage-reflection').value=s.reflection;
  reflectionPanel.querySelector('#stage-question').value=s.question;
  reflectionPanel.querySelector('#stage-save').addEventListener('click',()=>{stages[index].title=reflectionPanel.querySelector('#stage-title').value;stages[index].reflection=reflectionPanel.querySelector('#stage-reflection').value;stages[index].question=reflectionPanel.querySelector('#stage-question').value;const values=JSON.parse(localStorage.getItem('buenCaminoStages')||'{}');values[index]={title:stages[index].title,reflection:stages[index].reflection,question:stages[index].question};localStorage.setItem('buenCaminoStages',JSON.stringify(values));reflectionPanel.querySelector('#stage-save-status').textContent='Guardado en este navegador.';});
}
stages.forEach((stage,index)=>{const button=document.createElement('button');button.className='stage-button';button.innerHTML=`<span class="stage-num">${String(index+1).padStart(2,'0')}</span><span><span class="stage-city">${stage.from} → ${stage.to}</span><span class="stage-km">${stage.km}</span></span><span class="stage-arrow">↗</span>`;button.addEventListener('click',()=>showStage(index));list.append(button)});
showStage(0);
const dateInput=document.querySelector('#reading-date');
const localDate=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);dateInput.value=localDate;
const dayForm=document.querySelector('#day-form');
const dayFields=['reference','gospelText','first','psalm','reflection'];
function dayData(date){return JSON.parse(localStorage.getItem('buenCaminoDays')||'{}')[date]||{}}
function updateReading(){const date=dateInput.value||localDate;const data=dayData(date);document.querySelector('#reading-day').textContent=new Intl.DateTimeFormat('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(`${date}T12:00:00`));document.querySelector('#reading-reference').textContent=data.reference||'Añade la lectura de este día abajo';document.querySelector('.reading-caption').textContent=data.gospelText||'Escribe el texto del Evangelio o tus notas en el editor.';document.querySelector('.reading-links span:last-child').textContent=data.psalm?`Salmo: ${data.psalm}`:'';document.querySelector('.reading-links span:nth-last-child(2)').textContent=data.first?'·':'';document.querySelector('.reading-links span:nth-last-child(3)').textContent=data.first?`Primera lectura: ${data.first}`:'';const link=document.querySelector('#reading-link');link.href=`https://www.ewtn.com/es/lecturas/${date}`;dayFields.forEach(field=>dayForm.elements[field].value=data[field]||'');document.querySelector('#day-save-status').textContent='';}
dateInput.addEventListener('change',updateReading);
dayForm.addEventListener('submit',event=>{event.preventDefault();const all=JSON.parse(localStorage.getItem('buenCaminoDays')||'{}');all[dateInput.value]={};dayFields.forEach(field=>all[dateInput.value][field]=dayForm.elements[field].value.trim());localStorage.setItem('buenCaminoDays',JSON.stringify(all));updateReading();document.querySelector('#day-save-status').textContent='Guardado en este navegador.';});
updateReading();
