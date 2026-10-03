const starLayer = document.getElementById("stars");
const loader = document.getElementById("loader");
const soundBtn = document.getElementById("soundBtn");

// Create a dense but lightweight star field.
for(let i=0;i<150;i++){
  const s=document.createElement("span");
  s.className="star"+(Math.random()>.92?" big":"");
  s.style.left=Math.random()*100+"%";
  s.style.top=Math.random()*100+"%";
  s.style.setProperty("--d",(1.5+Math.random()*4)+"s");
  s.style.setProperty("--move",(10+Math.random()*35)+"s");
  s.style.animationDelay=(Math.random()*5)+"s";
  starLayer.appendChild(s);
}

// Occasional shooting stars.
function shootingStar(){
  const s=document.createElement("span");
  s.className="shooting";
  s.style.left=(60+Math.random()*35)+"%";
  s.style.top=(5+Math.random()*45)+"%";
  document.body.appendChild(s);
  setTimeout(()=>s.remove(),1600);
}
setInterval(()=>{ if(Math.random()>.25) shootingStar(); }, 5200);

// Scroll reveal
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

// Loader
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),1100));

// Lightweight ambient sound using Web Audio. No external audio file needed.
let audioCtx=null, master=null, soundOn=false;
function startAmbient(){
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  master=audioCtx.createGain(); master.gain.value=.035; master.connect(audioCtx.destination);
  const notes=[261.63,329.63,392.00,523.25];
  notes.forEach((freq,i)=>{
    const osc=audioCtx.createOscillator(), g=audioCtx.createGain();
    osc.type="sine"; osc.frequency.value=freq;
    g.gain.setValueAtTime(0,audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(.13,audioCtx.currentTime+2+i*.7);
    g.gain.linearRampToValueAtTime(0,audioCtx.currentTime+7+i*.7);
    osc.connect(g);g.connect(master);osc.start();osc.stop(audioCtx.currentTime+8+i*.7);
  });
  soundOn=true;soundBtn.textContent="◉";
  setTimeout(()=>{if(soundOn)startAmbientLoop()},9000);
}
function startAmbientLoop(){if(soundOn&&audioCtx){startAmbient();}}
soundBtn.addEventListener("click",()=>{
  if(!soundOn) startAmbient();
  else {master.gain.value=0;soundOn=false;soundBtn.textContent="♪";}
});

// Subtle sunflower petals on the sunflower section.
const petalField=document.querySelector(".petal-field");
for(let i=0;i<24;i++){
  const p=document.createElement("span");
  p.textContent="✦";
  p.style.position="absolute";
  p.style.left=Math.random()*100+"%";
  p.style.top=Math.random()*100+"%";
  p.style.color="rgba(244,201,93,.35)";
  p.style.fontSize=(8+Math.random()*12)+"px";
  p.style.animation=`float ${4+Math.random()*4}s ease-in-out infinite`;
  p.style.animationDelay=Math.random()*3+"s";
  petalField.appendChild(p);
}
