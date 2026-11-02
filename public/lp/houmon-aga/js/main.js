// bubbles
document.querySelectorAll('.bubbles').forEach(b=>{
  const n=+b.dataset.n||8;
  for(let i=0;i<n;i++){const e=document.createElement('i');const s=4+Math.random()*14;
    e.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${9+Math.random()*12}s;animation-delay:${-Math.random()*16}s`;b.appendChild(e);}
});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv,.img').forEach(el=>io.observe(el));
// sticky bar after hero
const bar=document.getElementById('bar');
addEventListener('scroll',()=>bar.classList.toggle('on',scrollY>520),{passive:true});
// fixed menu toggle
const menuBtn=document.getElementById('menuBtn');
const siteMenu=document.getElementById('siteMenu');
if(menuBtn&&siteMenu){
  function setMenu(open){
    menuBtn.setAttribute('aria-expanded',open);
    siteMenu.classList.toggle('open',open);
    siteMenu.setAttribute('aria-hidden',!open);
    document.body.classList.toggle('menu-open',open);
  }
  menuBtn.addEventListener('click',()=>setMenu(menuBtn.getAttribute('aria-expanded')!=='true'));
  siteMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
}
// video mute toggle
document.querySelectorAll('.mute-btn[data-video]').forEach(btn=>{
  const v=document.getElementById(btn.dataset.video);
  if(!v)return;
  btn.addEventListener('click',()=>{
    v.muted=!v.muted;
    const on=!v.muted;
    btn.setAttribute('aria-pressed',on);
    btn.setAttribute('aria-label',on?'音声をオフにする':'音声をオンにする');
  });
});
// lazy-load video: only fetch/play once scrolled into view, stop after N plays, resume via replay button
document.querySelectorAll('.lazy-video').forEach(v=>{
  const max=+v.dataset.maxPlays||2;
  const wrap=v.closest('.video-wrap');
  const replayBtn=wrap&&wrap.querySelector('.replay-btn');
  let plays=0,started=false;
  function showReplay(show){if(replayBtn)replayBtn.classList.toggle('show',show)}
  v.addEventListener('ended',()=>{
    plays++;
    if(plays<max){v.currentTime=0;v.play().catch(()=>{});}
    else{showReplay(true);}
  });
  if(replayBtn){
    replayBtn.addEventListener('click',()=>{
      showReplay(false);
      plays=0;
      v.currentTime=0;
      v.play().catch(()=>{});
    });
  }
  const vio=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting&&!started){
        started=true;
        v.load();
        v.play().catch(()=>{});
        vio.unobserve(v);
      }
    });
  },{threshold:.25});
  vio.observe(v);
});
