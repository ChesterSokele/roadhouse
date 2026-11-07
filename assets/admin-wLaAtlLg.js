import{t as e}from"./preload-helper-BmaJr4lw.js";import{initializeApp as t}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";import{getAuth as n,onAuthStateChanged as r,signInWithEmailAndPassword as i,signOut as a}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";import{addDoc as o,collection as s,deleteDoc as c,doc as l,getFirestore as u,onSnapshot as d,orderBy as f,query as p,serverTimestamp as m,setDoc as h,updateDoc as g}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";import{deleteObject as _,getDownloadURL as v,getStorage as y,ref as b,uploadBytesResumable as x}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";var S=t({apiKey:`AIzaSyDq1jqOsmoHWOovP2zwnc8kcASQEA9iDF4`,authDomain:`carry-together.firebaseapp.com`,projectId:`carry-together`,storageBucket:`carry-together.firebasestorage.app`,messagingSenderId:`590186733121`,appId:`1:590186733121:web:80899a8ff4c7f286fd30c0`,measurementId:`G-8R60R3RW76`}),C=n(S),w=u(S),T=y(S),E=[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`],D=null,O=null,k=null,A=null;document.getElementById(`btn-login`).addEventListener(`click`,async()=>{let e=document.getElementById(`login-email`).value.trim(),t=document.getElementById(`login-password`).value,n=document.getElementById(`login-error`);n.textContent=``;try{await i(C,e,t)}catch{n.textContent=`Invalid email or password.`}}),document.getElementById(`login-password`).addEventListener(`keydown`,e=>{e.key===`Enter`&&document.getElementById(`btn-login`).click()}),document.getElementById(`btn-logout`).addEventListener(`click`,()=>a(C)),r(C,e=>{e?(document.getElementById(`login-screen`).style.display=`none`,document.getElementById(`app`).style.display=`block`,document.getElementById(`admin-email-display`).textContent=e.email,j()):(document.getElementById(`login-screen`).style.display=`flex`,document.getElementById(`app`).style.display=`none`)}),document.querySelectorAll(`.sidebar nav a[data-panel]`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault();let n=e.dataset.panel;document.querySelectorAll(`.sidebar nav a`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),document.querySelectorAll(`.panel`).forEach(e=>e.classList.remove(`active`)),document.getElementById(`panel-`+n).classList.add(`active`)})});function j(){M(),N(),F(),I(),L()}function M(){let e=p(s(w,`events`),f(`date`));d(e,e=>{let t=document.getElementById(`events-grid`);e.empty?t.innerHTML=`<div class="empty-state"><div class="icon">📅</div><p data-t>No events yet. Add your first one!</p></div>`:(t.innerHTML=``,e.forEach(e=>{let n=e.data(),r=document.createElement(`div`);r.className=`item-card`,r.innerHTML=`
        ${V(n.imageURL)?`<img class="card-img" src="${B(V(n.imageURL))}" alt="${B(n.title)}" data-ta="alt">`:`<div class="card-img-placeholder">📅</div>`}
        <div class="card-body">
          <div class="card-title" data-t>${B(n.title)}</div>
          <div class="card-desc" data-t>${B(n.description||``)}</div>
          <div class="card-meta">
            <span class="tag tag-event" data-t>${B(n.date||``)} ${B(n.time||``)}</span>
            <span class="tag ${n.active===!1?`tag-inactive`:`tag-active`}" data-t>${n.active===!1?`Hidden`:`Active`}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="btn-edit"  onclick="openModal('event','${e.id}')" data-t>✏️ Edit</button>
          <button class="btn-toggle" onclick="toggleActive('events','${e.id}',${n.active!==!1})" data-t>${n.active===!1?`Show`:`Hide`}</button>
          <button class="btn-delete" onclick="deleteItem('events','${e.id}',${H(n.imagePath)})" data-t>🗑️ Delete</button>
        </div>`,t.appendChild(r)}))})}function N(){let e=p(s(w,`specials`),f(`createdAt`));d(e,e=>{let t=document.getElementById(`specials-grid`);e.empty?t.innerHTML=`<div class="empty-state"><div class="icon">⭐</div><p data-t>No specials yet.</p></div>`:(t.innerHTML=``,e.forEach(e=>{let n=e.data(),r=document.createElement(`div`);r.className=`item-card`,r.innerHTML=`
        ${V(n.imageURL)?`<img class="card-img" src="${B(V(n.imageURL))}" alt="${B(n.name)}" data-ta="alt">`:`<div class="card-img-placeholder">⭐</div>`}
        <div class="card-body">
          <div class="card-title" data-t>${B(n.name)}</div>
          <div class="card-desc" data-t>${B(n.description||``)}</div>
          <div class="card-meta">
            ${n.badge?`<span class="tag tag-event" data-t>${B(n.badge)}</span>`:``}
            <span class="tag ${n.active===!1?`tag-inactive`:`tag-active`}" data-t>${n.active===!1?`Hidden`:`Active`}</span>
            ${n.price?`<span class="card-price" data-t>${B(n.price)}</span>`:``}
          </div>
        </div>
        <div class="card-actions">
          <button class="btn-edit"  onclick="openModal('special','${e.id}')" data-t>✏️ Edit</button>
          <button class="btn-toggle" onclick="toggleActive('specials','${e.id}',${n.active!==!1})" data-t>${n.active===!1?`Show`:`Hide`}</button>
          <button class="btn-delete" onclick="deleteItem('specials','${e.id}',${H(n.imagePath)})" data-t>🗑️ Delete</button>
        </div>`,t.appendChild(r)}))})}var P={0:{name:`Family Feast`,desc:`A whole flame-grilled chicken with golden fries and warm Portuguese bread.`,price:`N$195`,imageURL:`https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&auto=format&fit=crop`},1:{name:`Chicken Schnitzel`,desc:`Crispy, golden-fried chicken schnitzel served with creamy mash and rich homemade gravy.`,price:`N$85`,imageURL:`https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&auto=format&fit=crop`},2:{name:`Roadhouse Pasta`,desc:`Pasta with ham in our chef's special cream sauce, topped with fresh herbs and parmesan.`,price:`N$85`,imageURL:`https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop`},3:{name:`Cottage Pie`,desc:`Classic cottage pie with savoury mince filling topped with golden mashed potato, served with green beans.`,price:`N$100`,imageURL:`https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop`},4:{name:`Beef Stew`,desc:`Slow-cooked tender beef in a rich, hearty gravy served with rice or mash.`,price:`N$100`,imageURL:`https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=600&auto=format&fit=crop`},5:{name:`Braai Plate`,desc:`The Roadhouse Friday classic: chop, salad, wing and wors.`,price:`N$150`,imageURL:`https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop`},6:{name:`Grand Feast Delight`,desc:`Short ribs, meatballs, crispy chips, flavourful wings, zesty Russian and salad medley.`,price:`N$500`,imageURL:`https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop`}};function F(){let e=document.getElementById(`meals-grid`),t=new Date().getDay();e.innerHTML=``,d(s(w,`mealOfDay`),n=>{let r={};n.forEach(e=>{r[e.id]=e.data()}),e.innerHTML=``;for(let n=0;n<7;n++){let i=r[String(n)]||P[n],a=document.createElement(`div`);a.className=`meal-day-card`+(n===t?` today`:``),a.innerHTML=`
        <div class="day-header">
          <span class="day-name" data-t>${E[n]}${n===t?` ← Today`:``}</span>
        </div>
        ${V(i.imageURL)?`<img class="meal-img" src="${B(V(i.imageURL))}" alt="${B(i.name)}" data-ta="alt">`:`<div class="meal-img-placeholder">🍽️</div>`}
        <div class="meal-body">
          <div class="meal-name" data-t>${B(i.name)}</div>
          <div class="meal-price" data-t>${B(i.price||``)}</div>
          <button class="btn-edit-meal" onclick="openModal('meal','${n}')" data-t>✏️ Edit ${E[n]}</button>
        </div>`,e.appendChild(a)}})}function I(){let e=p(s(w,`reviews`),f(`createdAt`,`desc`));d(e,e=>{let t=document.getElementById(`reviews-tbody`);e.empty?t.innerHTML=`<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--muted)" data-t>No reviews yet.</td></tr>`:(t.innerHTML=``,e.forEach(e=>{let n=e.data(),r=Math.max(1,Math.min(5,parseInt(n.rating)||5)),i=`★`.repeat(r)+`☆`.repeat(5-r),a=n.createdAt?.toDate?.()?.toLocaleDateString(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`})||`N/A`,o=document.createElement(`tr`);o.innerHTML=`
        <td><strong data-t>${B(n.name||`Anonymous`)}</strong></td>
        <td><span class="star-display" data-t>${i}</span></td>
        <td class="review-text-cell" title="${B(n.text||``)}" data-t data-ta="title">
          "${B(n.text||``)}"
        </td>
        <td style="color:var(--muted);font-size:.8rem" data-t>${a}</td>
        <td>
          <span class="tag ${n.approved?`tag-active`:`tag-inactive`}" data-t>${n.approved?`Approved`:`Pending`}</span>
          ${n.pinned?`<span class="tag tag-event" style="margin-left:.3rem" data-t>Pinned</span>`:``}
        </td>
        <td>
          <button class="btn-approve ${n.approved?`approved`:``}"
            onclick="toggleReview('${e.id}','approved',${!!n.approved})" data-t>${n.approved?`✓ Approved`:`Approve`}</button>
          <button class="btn-pin ${n.pinned?`pinned`:``}"
            onclick="toggleReview('${e.id}','pinned',${!!n.pinned})" data-t>${n.pinned?`📌 Pinned`:`Pin`}</button>
          <button class="btn-del-sm" onclick="deleteItem('reviews','${e.id}','')">🗑️</button>
        </td>`,t.appendChild(o)}))})}function L(){let e=p(s(w,`notices`),f(`createdAt`,`desc`));d(e,e=>{let t=document.getElementById(`notices-list`);e.empty?t.innerHTML=`<div class="empty-state"><div class="icon">📢</div><p data-t>No notices yet.</p></div>`:(t.innerHTML=``,e.forEach(e=>{let n=e.data(),r=document.createElement(`div`);r.className=`notice-card`,r.innerHTML=`
        <div class="notice-text" data-t>${B(n.text||``)}</div>
        <div class="notice-actions">
          <button class="btn-toggle" onclick="toggleActive('notices','${e.id}',${n.active!==!1})"
            style="width:auto;padding:.3rem .75rem;font-size:.75rem" data-t>
            ${n.active===!1?`Show`:`Hide`}
          </button>
          <button class="btn-edit" onclick="openModal('notice','${e.id}')"
            style="width:auto;padding:.3rem .75rem;font-size:.75rem" data-t>Edit</button>
          <button class="btn-delete" onclick="deleteItem('notices','${e.id}','')"
            style="width:auto;padding:.3rem .75rem;font-size:.75rem">🗑️</button>
        </div>`,t.appendChild(r)}))})}window.openModal=async function(t,n=null){D=n,O=t,k=null,A=null;let r={};if(n&&t!==`meal`)try{let{getDoc:i}=await e(async()=>{let{getDoc:e}=await import(`https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js`);return{getDoc:e}},[],import.meta.url),a=await i(l(w,R(t),n));a.exists()&&(r=a.data())}catch{}if(t===`meal`&&n!==null)try{let{getDoc:t}=await e(async()=>{let{getDoc:e}=await import(`https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js`);return{getDoc:e}},[],import.meta.url),i=await t(l(w,`mealOfDay`,String(n)));r=i.exists()?i.data():P[parseInt(n)]||{}}catch{r=P[parseInt(n)]||{}}let i={event:`Event`,special:`Special`,meal:`Meal of the Day`,notice:`Notice`};document.getElementById(`modal-title`).textContent=(n?`Edit `:`Add `)+i[t];let a=``;t===`event`?a=`
      <div class="form-group"><label data-t>Event Title *</label>
        <input id="f-title" value="${B(r.title||``)}" placeholder="e.g. Live Music Night" data-ta="placeholder"></div>
      <div class="form-group"><label data-t>Description</label>
        <textarea id="f-desc">${B(r.description||``)}</textarea></div>
      <div class="form-row-2">
        <div class="form-group"><label data-t>Date</label>
          <input type="date" id="f-date" value="${B(r.date||``)}"></div>
        <div class="form-group"><label data-t>Time (e.g. 19:00)</label>
          <input id="f-time" value="${B(r.time||``)}" placeholder="19:00"></div>
      </div>
      <div class="form-group"><label data-t>Tag (e.g. Live Music)</label>
        <input id="f-tag" value="${B(r.tag||``)}" placeholder="Live Music" data-ta="placeholder"></div>
      <div class="form-group"><label data-t>Image</label>
        <input type="file" id="f-image" accept="image/*" onchange="handleImageSelect(event)">
        <div class="upload-hint" data-t>Max 5MB · JPG/PNG/WebP</div>
        <div class="upload-progress" id="upload-progress"><div class="bar" id="upload-bar"></div></div>
        <div class="img-preview-wrap" id="img-preview">
          ${V(r.imageURL)?`<img src="${B(V(r.imageURL))}" alt="preview" data-ta="alt">`:``}
        </div>
      </div>`:t===`special`?a=`
      <div class="form-group"><label data-t>Special Name *</label>
        <input id="f-title" value="${B(r.name||``)}" placeholder="e.g. 2 Cocktails" data-ta="placeholder"></div>
      <div class="form-group"><label data-t>Description</label>
        <textarea id="f-desc">${B(r.description||``)}</textarea></div>
      <div class="form-row-2">
        <div class="form-group"><label data-t>Price (e.g. N$120)</label>
          <input id="f-price" value="${B(r.price||``)}" placeholder="N$120"></div>
        <div class="form-group"><label data-t>Badge (e.g. Mon–Fri)</label>
          <input id="f-badge" value="${B(r.badge||``)}" placeholder="Mon–Fri" data-ta="placeholder"></div>
      </div>
      <div class="form-group"><label data-t>Image</label>
        <input type="file" id="f-image" accept="image/*" onchange="handleImageSelect(event)">
        <div class="upload-hint" data-t>Max 5MB · JPG/PNG/WebP</div>
        <div class="upload-progress" id="upload-progress"><div class="bar" id="upload-bar"></div></div>
        <div class="img-preview-wrap" id="img-preview">
          ${V(r.imageURL)?`<img src="${B(V(r.imageURL))}" alt="preview" data-ta="alt">`:``}
        </div>
      </div>`:t===`meal`?a=`
      <p style="color:var(--muted);font-size:.85rem;margin-bottom:1rem">Editing: <strong style="color:var(--gold)" data-t>${E[parseInt(n)]}</strong></p>
      <div class="form-group"><label data-t>Meal Name *</label>
        <input id="f-title" value="${B(r.name||``)}" placeholder="e.g. Braai Plate" data-ta="placeholder"></div>
      <div class="form-group"><label data-t>Description</label>
        <textarea id="f-desc">${B(r.description||r.desc||``)}</textarea></div>
      <div class="form-group"><label data-t>Price (e.g. N$150)</label>
        <input id="f-price" value="${B(r.price||``)}" placeholder="N$150"></div>
      <div class="form-group"><label data-t>Image</label>
        <input type="file" id="f-image" accept="image/*" onchange="handleImageSelect(event)">
        <div class="upload-hint" data-t>Max 5MB · JPG/PNG/WebP</div>
        <div class="upload-progress" id="upload-progress"><div class="bar" id="upload-bar"></div></div>
        <div class="img-preview-wrap" id="img-preview">
          ${V(r.imageURL)?`<img src="${B(V(r.imageURL))}" alt="preview" data-ta="alt">`:``}
        </div>
      </div>`:t===`notice`&&(a=`
      <div class="form-group"><label data-t>Notice Text *</label>
        <textarea id="f-title" style="min-height:120px">${B(r.text||``)}</textarea></div>
      <div class="form-group"><label data-t>Visible on site</label>
        <div class="toggle-wrap">
          <div class="toggle ${r.active===!1?``:`on`}" id="f-active-toggle"
            onclick="this.classList.toggle('on')"></div>
          <span class="toggle-label" data-t>Show on website</span>
        </div>
      </div>`),document.getElementById(`modal-body`).innerHTML=a,document.getElementById(`modal-overlay`).classList.add(`open`)},window.closeModal=function(){document.getElementById(`modal-overlay`).classList.remove(`open`),D=O=null,k=A=null},window.handleImageSelect=function(e){let t=e.target.files[0];if(!t)return;if(t.size>5242880){U(`Image must be under 5MB`,`error`);return}let n=t.name.replace(/[^a-zA-Z0-9._-]/g,`_`),r=`${O}s/${Date.now()}_${n}`,i=b(T,r),a=x(i,t),o=document.getElementById(`upload-progress`),s=document.getElementById(`upload-bar`),c=document.getElementById(`btn-save`);o.style.display=`block`,c.disabled=!0,a.on(`state_changed`,e=>{let t=e.bytesTransferred/e.totalBytes*100;s.style.width=t+`%`},e=>{U(`Upload failed: `+e.message,`error`),c.disabled=!1},async()=>{let e=await v(i);k=e,A=r,document.getElementById(`img-preview`).innerHTML=`<img src="${e}" alt="preview" data-ta="alt">`,o.style.display=`none`,c.disabled=!1,U(`Image uploaded ✓`,`success`)})},window.saveItem=async function(){let e=O,t=document.getElementById(`btn-save`);t.disabled=!0;try{if(e===`event`){let e={title:z(`f-title`),description:z(`f-desc`),date:z(`f-date`),time:z(`f-time`),tag:z(`f-tag`),active:!0,updatedAt:m()};if(!e.title){U(`Title is required`,`error`),t.disabled=!1;return}k&&(e.imageURL=k,e.imagePath=A),D?await g(l(w,`events`,D),e):(e.createdAt=m(),await o(s(w,`events`),e))}else if(e===`special`){let e={name:z(`f-title`),description:z(`f-desc`),price:z(`f-price`),badge:z(`f-badge`),active:!0,updatedAt:m()};if(!e.name){U(`Name is required`,`error`),t.disabled=!1;return}k&&(e.imageURL=k,e.imagePath=A),D?await g(l(w,`specials`,D),e):(e.createdAt=m(),await o(s(w,`specials`),e))}else if(e===`meal`){let e={name:z(`f-title`),desc:z(`f-desc`),price:z(`f-price`)};if(!e.name){U(`Meal name is required`,`error`),t.disabled=!1;return}k&&(e.imageURL=k,e.imagePath=A),await h(l(w,`mealOfDay`,String(D)),e,{merge:!0})}else if(e===`notice`){let e=document.getElementById(`f-active-toggle`)?.classList.contains(`on`)!==!1,n={text:z(`f-title`),active:e,updatedAt:m()};if(!n.text){U(`Notice text is required`,`error`),t.disabled=!1;return}D?await g(l(w,`notices`,D),n):(n.createdAt=m(),n.active=!0,await o(s(w,`notices`),n))}U(`Saved successfully ✓`,`success`),closeModal()}catch(e){U(`Error: `+e.message,`error`)}t.disabled=!1},window.toggleActive=async function(e,t,n){try{await g(l(w,e,t),{active:!n}),U(n?`Hidden from site`:`Shown on site`)}catch(e){U(`Error: `+e.message,`error`)}},window.toggleReview=async function(e,t,n){try{await g(l(w,`reviews`,e),{[t]:!n})}catch(e){U(`Error: `+e.message,`error`)}},window.deleteItem=async function(e,t,n){if(confirm(`Delete this item? This cannot be undone.`))try{if(await c(l(w,e,t)),n)try{await _(b(T,n))}catch{}U(`Deleted`,`success`)}catch(e){U(`Error: `+e.message,`error`)}};function R(e){return e===`event`?`events`:e===`special`?`specials`:e===`notice`?`notices`:`reviews`}function z(e){let t=document.getElementById(e);return t?t.value.trim():``}function B(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function V(e){return/^https:\/\//i.test(e||``)?e:``}function H(e){return B(JSON.stringify(String(e||``)))}function U(e,t=`success`){let n=document.getElementById(`toast`);n.textContent=(t===`success`?`✅ `:t===`error`?`❌ `:`ℹ️ `)+e,n.className=`toast show `+t,setTimeout(()=>n.classList.remove(`show`),3500)}document.getElementById(`modal-overlay`).addEventListener(`click`,e=>{e.target===document.getElementById(`modal-overlay`)&&closeModal()});