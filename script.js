(()=>{
  'use strict';
  document.documentElement.classList.add('js');
  const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu=document.getElementById('menuToggle');
  const nav=document.getElementById('navItems');
  menu?.addEventListener('click',()=>{
    const open=menu.getAttribute('aria-expanded')!=='true';
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close menu':'Open menu');
    nav?.classList.toggle('open',open);
  });
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open menu');
  }));
  const rows=[...document.querySelectorAll('.type-row')];
  if(motionOK&&rows.length){
    rows.forEach(r=>r.querySelector('.typed-text').textContent='');
    let row=0, pos=0;
    const advance=()=>{
      const current=rows[row];if(!current)return;
      rows.forEach((r,i)=>r.classList.toggle('typing',i===row));
      const el=current.querySelector('.typed-text');
      const word=el.dataset.type||'';
      if(pos<word.length){el.textContent+=word[pos++];setTimeout(advance,word[pos-1]===' '?135:90);}
      else if(row<rows.length-1){row++;pos=0;setTimeout(advance,230);}
      else {rows.forEach(r=>r.classList.remove('typing'));current.classList.add('typed-done');}
    };
    setTimeout(advance,400);
  }else {rows.forEach(r=>r.classList.add('typed-done'));}
  const revealEls=[...document.querySelectorAll('.reveal')];
  if(!motionOK||!('IntersectionObserver' in window))revealEls.forEach(el=>el.classList.add('visible'));
  else {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px -35px 0px'});
    revealEls.forEach(el=>observer.observe(el));
  }
  const progress=document.getElementById('readingProgress');
  let queued=false;
  const updateProgress=()=>{
    if(progress){const d=document.documentElement.scrollHeight-window.innerHeight;progress.style.transform=`scaleX(${d>0?Math.max(0,Math.min(1,window.scrollY/d)):0})`;}
    queued=false;
  };
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(updateProgress);}},{passive:true});
  addEventListener('resize',updateProgress,{passive:true});updateProgress();
  const yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();
})();
