window.WI40ALL = async function(key){
 const R='https://raw.githubusercontent.com/benicioabelenda2306-alt/worldin40-uploads/main/';
 const sl=ms=>new Promise(r=>setTimeout(r,ms));
 const q=await (await fetch(R+'queue.json?'+Date.now(),{cache:'no-store'})).json(); const it=q.find(x=>x.key===key);
 const parts=[]; for(let i=0;i<it.parts;i++){parts.push(await (await fetch(R+key+'.part'+String(i).padStart(2,'0'))).blob());}
 const f=new File(parts,it.file,{type:'video/mp4'});
 let inp; for(let i=0;i<20 && !inp;i++){inp=document.querySelector('ytcp-uploads-file-picker input[type=file]'); if(!inp) await sl(500);}
 const dt=new DataTransfer(); dt.items.add(f); inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
 let D; for(let i=0;i<40;i++){D=document.querySelector('ytcp-uploads-dialog'); if(D && D.querySelectorAll('#textbox').length>=2) break; await sl(500);}
 await sl(1500);
 const tb=[...D.querySelectorAll('#textbox')];
 async function put(el,txt){ el.focus(); const s=window.getSelection(); const r=document.createRange(); r.selectNodeContents(el); s.removeAllRanges(); s.addRange(r); document.execCommand('insertText',false,txt); await sl(400); }
 await put(tb[0],it.title); await put(tb[1],it.desc);
 D.querySelector('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"]').click();
 D.querySelector('#toggle-button').click(); await sl(1500);
 D.querySelector('tp-yt-paper-radio-button[name="VIDEO_HAS_ALTERED_CONTENT_NO"]')?.click();
 const tagIn=D.querySelector('#tags-container input'); tagIn.focus(); tagIn.value=it.tags+','; tagIn.dispatchEvent(new Event('input',{bubbles:true})); tagIn.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true})); await sl(800);
 const chips=[...new Set([...D.querySelectorAll('ytcp-chip')].map(c=>c.innerText))].length;
 const trig=[...D.querySelectorAll('ytcp-dropdown-trigger')].find(e=>/Idioma del video/.test(e.innerText)); trig.click(); await sl(1200);
 [...document.querySelectorAll('tp-yt-paper-item')].find(e=>/^\s*Inglés \(Estados Unidos\)\s*$/.test(e.innerText))?.click(); await sl(800);
 const lang=[...D.querySelectorAll('ytcp-dropdown-trigger')].map(e=>e.innerText.replace(/\s+/g,' ')).find(t=>/Idioma del video/.test(t));
 for(let i=0;i<3;i++){D.querySelector('#next-button').click(); await sl(1800);}
 const prog=D.querySelector('#second-container-expand-button') || [...D.querySelectorAll('*')].find(e=>e.childElementCount===0 && e.textContent.trim()==='Programar');
 prog.click(); await sl(1200);
 D.querySelector('#datepicker-trigger').click(); await sl(1000);
 const dinp=[...document.querySelectorAll('tp-yt-iron-dropdown input, ytcp-date-picker input')].find(e=>e.offsetParent && /\d{4}/.test(e.value));
 dinp.focus(); dinp.select(); document.execCommand('insertText',false,it.date); dinp.dispatchEvent(new Event('input',{bubbles:true})); dinp.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true})); await sl(1000);
 D.querySelector('#time-of-day-trigger').click(); await sl(900);
 const [hh,mm]=it.time.split(':').map(Number); const lbl=((hh%12)||12)+':'+String(mm).padStart(2,'0')+(hh<12?' a':' p');
 const item=[...document.querySelectorAll('tp-yt-paper-item')].filter(e=>e.offsetParent).find(e=>e.innerText.replace(/\s+/g,' ').trim().startsWith(lbl));
 item.scrollIntoView(); item.click(); await sl(800);
 const dtp=D.querySelector('ytcp-datetime-picker'); const tval=[...dtp.querySelectorAll('input')].map(i=>i.value).join(' | ');
 const tz=dtp.innerText.replace(/\s+/g,' ');
 if(!/Hora local|GMT-0300/.test(tz)) return {error:'tz', tz, tval};
 if(!new RegExp('^'+it.date.split(' ')[0]).test(tz.trim())) return {error:'date', tz, tval};
 D.querySelector('#done-button').click(); await sl(4000);
 return {ok:/Se programó el video/.test(document.body.innerText), key, title:tb[0].innerText, chips, lang, tz, tval};
};
'loaded';
