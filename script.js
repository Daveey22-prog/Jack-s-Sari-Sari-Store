const PRODUCTS=[
{id:10001,name:"Piattos (small)",cat:"Snacks",price:20,stock:1000,emoji:"🥔"},
{id:10002,name:"Chippy",cat:"Snacks",price:15,stock:1000,emoji:"🍟"},
{id:10003,name:"Skyflakes",cat:"Snacks",price:10,stock:1000,emoji:"🍘"},
{id:10004,name:"Boy Bawang",cat:"Snacks",price:12,stock:1000,emoji:"🥜"},
{id:10005,name:"Coke (mismo 250ml)",cat:"Drinks",price:15,stock:1000,emoji:"🥤"},
{id:10006,name:"Nescafe 3-in-1 (sachet)",cat:"Drinks",price:10,stock:1000,emoji:"☕"},
{id:10007,name:"Bottled water (500ml)",cat:"Drinks",price:15,stock:1000,emoji:"💧"},
{id:10008,name:"C2 (250ml)",cat:"Drinks",price:20,stock:1000,emoji:"🧃"},
{id:10009,name:"Detergent powder (sachet)",cat:"Household Items",price:8,stock:1000,emoji:"🧺"},
{id:10010,name:"Fabric softener (sachet)",cat:"Household Items",price:7,stock:1000,emoji:"🧴"},
{id:10011,name:"Dishwashing liquid (sachet)",cat:"Household Items",price:6,stock:1000,emoji:"🧼"},
{id:10012,name:"Candle (small)",cat:"Household Items",price:10,stock:1000,emoji:"🕯️"},
{id:10013,name:"Corned beef (small can)",cat:"Canned Goods",price:35,stock:1000,emoji:"🥫"},
{id:10014,name:"Sardines",cat:"Canned Goods",price:18,stock:1000,emoji:"🐟"},
{id:10015,name:"Century Tuna (small)",cat:"Canned Goods",price:25,stock:1000,emoji:"🥫"},
{id:10016,name:"Shampoo (sachet)",cat:"Personal Care",price:7,stock:1000,emoji:"🧴"},
{id:10017,name:"Soap (bar)",cat:"Personal Care",price:20,stock:1000,emoji:"🧼"},
{id:10018,name:"Toothpaste (small)",cat:"Personal Care",price:25,stock:1000,emoji:"🪥"},
{id:10019,name:"Lucky Me Pancit Canton",cat:"Snacks",price:15,stock:1000,emoji:"🍜"},
{id:10020,name:"Nova",cat:"Snacks",price:15,stock:1000,emoji:"🥔"},
{id:10021,name:"Chocnut",cat:"Snacks",price:5,stock:1000,emoji:"🍫"},
{id:10022,name:"Sprite (mismo 250ml)",cat:"Drinks",price:15,stock:1000,emoji:"🥤"},
{id:10023,name:"Royal (mismo 250ml)",cat:"Drinks",price:15,stock:1000,emoji:"🥤"},
{id:10024,name:"Milo (sachet)",cat:"Drinks",price:10,stock:1000,emoji:"🥛"},
{id:10025,name:"Alcohol (small bottle)",cat:"Household Items",price:25,stock:1000,emoji:"🧴"},
{id:10026,name:"Mosquito coil",cat:"Household Items",price:10,stock:1000,emoji:"🌀"},
{id:10027,name:"Matches",cat:"Household Items",price:5,stock:1000,emoji:"🔥"},
{id:10028,name:"Laundry soap bar",cat:"Household Items",price:15,stock:1000,emoji:"🧼"},
{id:10029,name:"Argentina corned beef",cat:"Canned Goods",price:30,stock:1000,emoji:"🥫"},
{id:10030,name:"Toothbrush",cat:"Personal Care",price:15,stock:1000,emoji:"🪥"},
{id:10031,name:"Sugar (1 kilo pack)",cat:"Grocery Staples",price:65,stock:1000,emoji:"🍚"},
{id:10032,name:"Rice (1 kilo pack)",cat:"Grocery Staples",price:55,stock:1000,emoji:"🍚"},
{id:10033,name:"Cooking oil (small pouch)",cat:"Grocery Staples",price:12,stock:1000,emoji:"🫗"},
{id:10034,name:"Soy sauce (sachet)",cat:"Grocery Staples",price:3,stock:1000,emoji:"🧂"},
{id:10035,name:"Vinegar (sachet)",cat:"Grocery Staples",price:3,stock:1000,emoji:"🧴"},
{id:10036,name:"Egg (piece)",cat:"Grocery Staples",price:8,stock:1000,emoji:"🥚"}
];

const savedInventory=JSON.parse(localStorage.getItem("jacksInventory1000")||"[]");
PRODUCTS.forEach(product=>{
 const saved=savedInventory.find(item=>item.id===product.id);
 if(saved)product.stock=saved.stock;
});

let cart=[], category="All", payment="Cash";
let sales=JSON.parse(localStorage.getItem("jacksSales")||"[]");
const money=n=>"₱"+Number(n).toLocaleString("en-PH",{minimumFractionDigits:2,maximumFractionDigits:2});
const orderId=()=> "JSS-"+Date.now().toString().slice(-7);

document.getElementById("today").textContent=new Date().toLocaleString("en-PH",{dateStyle:"full",timeStyle:"short"});
document.getElementById("orderNo").textContent=orderId();

function renderCategories(){
 const cats=["All",...new Set(PRODUCTS.map(p=>p.cat))];
 document.getElementById("categories").innerHTML=cats.map(c=>`<button class="cat ${c===category?"active":""}" onclick="setCategory('${c}')">${c}</button>`).join("");
}
function setCategory(c){category=c;renderCategories();renderProducts()}
function renderProducts(){
 const q=document.getElementById("search").value.toLowerCase();
 const list=PRODUCTS.filter(p=>(category==="All"||p.cat===category)&&p.name.toLowerCase().includes(q));
 document.getElementById("productGrid").innerHTML=list.map(p=>`
 <div class="product" onclick="addToCart(${p.id})">
   <div class="emoji">${p.emoji}</div><h3>${p.name}</h3>
   <div class="price">${money(p.price)}</div><div class="stock">${p.stock} in stock</div>
 </div>`).join("");
}
function addToCart(id){
 const p=PRODUCTS.find(x=>x.id===id), item=cart.find(x=>x.id===id);
 if(item){if(item.qty<p.stock)item.qty++;else alert("Not enough stock.");}
 else cart.push({...p,qty:1});
 renderCart();
}
function changeQty(id,d){
 const i=cart.find(x=>x.id===id); if(!i)return;
 i.qty+=d;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);
 renderCart();
}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<div class="empty">🛒<br>Your order is empty<br><small>Select products to start a sale.</small></div>'}
 else box.innerHTML=cart.map(i=>`<div class="cart-item">
 <div><h4>${i.name}</h4><small>${money(i.price)} each</small><div class="qty">
 <button onclick="changeQty(${i.id},-1)">−</button><span>${i.qty}</span><button onclick="changeQty(${i.id},1)">+</button></div></div>
 <strong>${money(i.price*i.qty)}</strong></div>`).join("");
 const sub=cart.reduce((a,i)=>a+i.price*i.qty,0);
 document.getElementById("subtotal").textContent=money(sub);
 document.getElementById("discount").textContent=money(0);
 document.getElementById("total").textContent=money(sub);
 updateChange();
}
function updateChange(){
 const total=cart.reduce((a,i)=>a+i.price*i.qty,0), paid=Number(document.getElementById("amountPaid").value||0);
 document.getElementById("change").textContent=money(Math.max(0,paid-total));
}
function clearCart(){cart=[];document.getElementById("amountPaid").value="";renderCart();document.getElementById("orderNo").textContent=orderId()}
function completeSale(){
 const total=cart.reduce((a,i)=>a+i.price*i.qty,0), paid=Number(document.getElementById("amountPaid").value||0);
 if(!cart.length)return alert("Please add at least one product.");
 if(payment==="Cash"&&paid<total)return alert("Amount received is less than the total.");
 cart.forEach(item=>{
  const product=PRODUCTS.find(p=>p.id===item.id);
  if(product)product.stock-=item.qty;
 });
 localStorage.setItem("jacksInventory1000",JSON.stringify(PRODUCTS.map(product=>({id:product.id,stock:product.stock}))));
 const sale={id:document.getElementById("orderNo").textContent,date:new Date().toISOString(),items:cart.map(x=>({id:x.id,name:x.name,qty:x.qty,price:x.price})),total,paid:payment==="Cash"?paid:total,payment,change:payment==="Cash"?paid-total:0};
 sales.unshift(sale);localStorage.setItem("jacksSales",JSON.stringify(sales));
 showReceipt(sale);clearCart();renderProducts();renderInventory();renderSales();
}
function showReceipt(s){
 document.getElementById("receipt").innerHTML=`<h2>JACK'S SARI-SARI STORE</h2><div class="center">Everyday Goods, Close to Home</div>
 <div class="center">Sari-Sari Store</div><hr>
 <div>Receipt No.: ${s.id}</div><div>Date: ${new Date(s.date).toLocaleString("en-PH")}</div><div>Cashier: Admin</div><hr>
 <div class="receipt-items">${s.items.map(i=>`<div><span class="itemname">${i.name} x${i.qty}</span><span>${money(i.price*i.qty)}</span></div>`).join("")}</div><hr>
 <div class="receipt-row receipt-total"><span>TOTAL</span><span>${money(s.total)}</span></div>
 <div class="receipt-row"><span>Payment</span><span>${s.payment}</span></div>
 <div class="receipt-row"><span>Received</span><span>${money(s.paid)}</span></div>
 <div class="receipt-row"><span>Change</span><span>${money(s.change)}</span></div><hr>
 <div class="receipt-footer">Thank you for dining with us!<br>Please come again.</div>`;
 document.getElementById("receiptModal").classList.remove("hidden");
}
function viewSaleReceipt(id){
 const sale=sales.find(item=>item.id===id);
 if(sale)showReceipt(sale);
}
function renderProductTable(){
 document.getElementById("productTable").innerHTML=`<table class="data-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead><tbody>${PRODUCTS.map(p=>`<tr><td>${p.emoji} ${p.name}</td><td>${p.cat}</td><td>${money(p.price)}</td><td>${p.stock}</td></tr>`).join("")}</tbody></table>`;
}
function renderInventory(){
 const low=PRODUCTS.filter(p=>p.stock<=20).length, units=PRODUCTS.reduce((a,p)=>a+p.stock,0), val=PRODUCTS.reduce((a,p)=>a+p.stock*p.price,0);
 document.getElementById("statProducts").textContent=PRODUCTS.length;document.getElementById("statLow").textContent=low;document.getElementById("statUnits").textContent=units;document.getElementById("statValue").textContent=money(val);
 document.getElementById("inventoryTable").innerHTML=`<table class="data-table"><thead><tr><th>Product</th><th>Category</th><th>Stock</th><th>Status</th><th>Stock Value</th></tr></thead><tbody>${PRODUCTS.map(p=>`<tr><td>${p.emoji} ${p.name}</td><td>${p.cat}</td><td>${p.stock}</td><td><span class="badge ${p.stock<=20?"low":"ok"}">${p.stock<=20?"Low Stock":"In Stock"}</span></td><td>${money(p.stock*p.price)}</td></tr>`).join("")}</tbody></table>`;
}
function renderSales(){
 const el=document.getElementById("salesTable");
 if(!sales.length){el.innerHTML='<div class="empty">No completed sales yet.</div>';return}
 el.innerHTML=`<table class="data-table"><thead><tr><th>Receipt No.</th><th>Date</th><th>Items</th><th>Payment</th><th>Total</th><th>Receipt</th></tr></thead><tbody>${sales.map(s=>`<tr><td>${s.id}</td><td>${new Date(s.date).toLocaleString("en-PH")}</td><td>${s.items.reduce((a,i)=>a+i.qty,0)}</td><td>${s.payment}</td><td><strong>${money(s.total)}</strong></td><td><button class="receipt-btn" onclick="viewSaleReceipt('${s.id}')">View Receipt</button></td></tr>`).join("")}</tbody></table>`;
}
document.getElementById("search").addEventListener("input",renderProducts);
document.getElementById("amountPaid").addEventListener("input",updateChange);
document.getElementById("clearCart").addEventListener("click",clearCart);
document.getElementById("checkout").addEventListener("click",completeSale);
document.querySelectorAll(".pay").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".pay").forEach(x=>x.classList.remove("active"));b.classList.add("active");payment=b.dataset.pay;updateChange()}));
document.getElementById("closeReceipt").onclick=()=>document.getElementById("receiptModal").classList.add("hidden");
document.getElementById("printReceipt").onclick=()=>window.print();

document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));btn.classList.add("active");
 document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));
 const v=btn.dataset.view;document.getElementById(v+"View").classList.add("active");
 document.getElementById("pageTitle").textContent={pos:"Point of Sale",products:"Products",inventory:"Inventory",sales:"Sales History"}[v];
 if(v==="inventory")renderInventory();if(v==="products")renderProductTable();if(v==="sales")renderSales();
}));
renderCategories();renderProducts();renderCart();renderProductTable();renderInventory();renderSales();
