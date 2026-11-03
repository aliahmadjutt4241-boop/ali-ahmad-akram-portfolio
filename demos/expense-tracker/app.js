(()=>{
'use strict';
const KEY='ali-spendly-transactions-v1';
const $=id=>document.getElementById(id);
const colors=['#9a78d3','#f6ab87','#78beb2','#e5ba63','#dc819e','#89a9dc','#9ac17a','#c0b2ca'];
const formatter=new Intl.NumberFormat('en-PK',{maximumFractionDigits:0});
const money=n=>'Rs '+formatter.format(n);
const today=new Date();
const isoDaysAgo=n=>{const d=new Date(today);d.setDate(d.getDate()-n);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const seed=()=>[
 {id:1,type:'income',amount:48000,description:'Freelance project',category:'Freelance',date:isoDaysAgo(2)},
 {id:2,type:'expense',amount:4200,description:'Groceries',category:'Food',date:isoDaysAgo(3)},
 {id:3,type:'expense',amount:1800,description:'Bus fares',category:'Transport',date:isoDaysAgo(6)},
 {id:4,type:'expense',amount:3200,description:'Online course',category:'Education',date:isoDaysAgo(8)},
 {id:5,type:'expense',amount:2240,description:'Coffee & snacks',category:'Food',date:isoDaysAgo(1)},
 ];
function load(){try{const a=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(a))return a.filter(t=>t&&typeof t.description==='string'&&['income','expense'].includes(t.type)&&Number.isFinite(t.amount))}catch(e){}return seed()}
let items=load();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){notify('Storage unavailable: changes may not persist')}};
const notify=message=>{const el=$('toast');el.textContent=message;el.classList.add('active');clearTimeout(notify.timeout);notify.timeout=setTimeout(()=>el.classList.remove('active'),2600)};
$('date').value=isoDaysAgo(0);
const currentMonth=isoDaysAgo(0).slice(0,7);
function periodItems(){return items.filter(x=>$('monthFilter').value==='all'||x.date.slice(0,7)===currentMonth)}
function listItems(){return periodItems().filter(x=>$('typeFilter').value==='all'||x.type===$('typeFilter').value).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id)}
function paintStats(){const p=periodItems();const income=p.filter(x=>x.type==='income').reduce((s,x)=>s+x.amount,0);const expenses=p.filter(x=>x.type==='expense').reduce((s,x)=>s+x.amount,0);const allBalance=items.reduce((s,x)=>s+(x.type==='income'?x.amount:-x.amount),0);$('balanceValue').textContent=money(allBalance);$('incomeValue').textContent=money(income);$('expenseValue').textContent=money(expenses);paintDonut(p.filter(x=>x.type==='expense'),expenses)}
function paintDonut(expenses,total){$('donutTotal').textContent=money(total);const grouped={};expenses.forEach(x=>grouped[x.category]=(grouped[x.category]||0)+x.amount);const cats=Object.entries(grouped).sort((a,b)=>b[1]-a[1]);let cursor=0;const wedges=cats.map(([name,value],i)=>{const start=cursor;cursor+=value/total*100;return `${colors[i%colors.length]} ${start}% ${cursor}%`});$('donut').style.background=total?`conic-gradient(${wedges.join(',')})`:'#eee8f4';$('donut').setAttribute('aria-label',total?cats.map(([name,value])=>`${name}: ${money(value)}`).join(', '):'No expenses to display');const legend=$('legend');legend.replaceChildren();if(!total){const e=document.createElement('div');e.className='muted';e.textContent='Nothing spent in this period.';legend.append(e);return;}cats.slice(0,7).forEach(([name,value],i)=>{const r=document.createElement('div');r.className='legend-row';const dot=document.createElement('i');dot.style.background=colors[i%colors.length];const text=document.createElement('span');text.textContent=name;const number=document.createElement('strong');number.textContent=Math.round(value/total*100)+'%';r.append(dot,text,number);legend.append(r)})}
function td(value,css=''){const t=document.createElement('td');t.textContent=value;if(css)t.className=css;return t}
function paintRows(){const data=listItems();const body=$('transactionsBody');body.replaceChildren();$('emptyMessage').hidden=!!data.length;$('transactionCount').textContent=data.length;data.forEach(x=>{const tr=document.createElement('tr');const name=td(x.description,'transaction-name');const date=td(new Date(x.date+'T12:00:00').toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'}));const cat=document.createElement('td');const pill=document.createElement('span');pill.className='item-category';pill.textContent=x.category;cat.append(pill);const amount=td((x.type==='income'?'+ ':'− ')+money(x.amount),x.type==='income'?'amount-income':'amount-expense');const actions=document.createElement('td');const wrap=document.createElement('div');wrap.className='row-actions';for(const [label,act,cls] of [['Edit','edit',''],['Delete','delete','delete']]){const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.id=x.id;button.dataset.action=act;button.className='row-button '+cls;wrap.append(button)}actions.append(wrap);tr.append(name,date,cat,amount,actions);body.append(tr)})}
function render(){paintStats();paintRows()}
$('transactionForm').addEventListener('submit',e=>{e.preventDefault();const amount=Number($('amount').value);const description=$('description').value.trim();const date=$('date').value;const kind=$('kind').value;if(!Number.isFinite(amount)||amount<=0||amount>1e9||!description||!/^\d{4}-\d{2}-\d{2}$/.test(date)){notify('Enter a valid amount, description and date');return}const id=Number($('editId').value);const record={id:id||Date.now()+Math.round(Math.random()*999),type:kind,amount,description,category:$('category').value,date};if(id){items=items.map(x=>x.id===id?record:x)}else items.unshift(record);save();resetForm();render();notify(id?'Transaction updated':'Transaction added')});
function resetForm(){$('transactionForm').reset();$('date').value=isoDaysAgo(0);$('editId').value='';$('submitTransaction').textContent='+ Add transaction';$('cancelEdit').hidden=true}
$('transactionsBody').addEventListener('click',e=>{const btn=e.target.closest('button[data-action]');if(!btn)return;const id=Number(btn.dataset.id);const x=items.find(x=>x.id===id);if(!x)return;if(btn.dataset.action==='edit'){$('editId').value=x.id;$('kind').value=x.type;$('amount').value=x.amount;$('description').value=x.description;$('category').value=x.category;$('date').value=x.date;$('submitTransaction').textContent='Save changes';$('cancelEdit').hidden=false;$('transactionForm').scrollIntoView({behavior:'smooth',block:'center'});$('description').focus();}else{if(!confirm('Delete this transaction?'))return;items=items.filter(x=>x.id!==id);save();render();notify('Transaction deleted')}});
$('cancelEdit').addEventListener('click',resetForm);
$('monthFilter').addEventListener('change',render);$('typeFilter').addEventListener('change',render);
$('resetDemo').addEventListener('click',()=>{if(!confirm('Replace your saved transactions with the sample data?'))return;items=seed();save();resetForm();$('monthFilter').value='all';$('typeFilter').value='all';render();notify('Sample data restored')});
render();
})();
